open Utils

module Types = struct
    (** A Variable Name wrapped in a constructor to avoid confusion with plain strings *)
    module VariableName = struct

        type t = VariableName of string
        let compare (VariableName left) (VariableName right) = compare left right

        let make name = VariableName name

        (** Make a new variable from an existing by appending a number. *)
        let make_numbered (VariableName variable) num = VariableName (Printf.sprintf "%s__Renamed%d" variable num)

        let to_string (VariableName name) =
            Printf.sprintf "?%s" name

    end

    module RelationName = struct

        type t = RelationName of string
        let make name = RelationName name
        let compare (RelationName left) (RelationName right) = compare left right        
        let equals (RelationName left) (RelationName right) = left = right        
        let to_string (RelationName name) = name

    end

    module Term = struct

        type t = 
            | Variable of VariableName.t
            | Relation of relation_info
        and relation_info = 
            { relation_name : RelationName.t
            ; related_terms : t list    
            }

        let make_relation name related_terms = 
            Relation { relation_name = RelationName.make name; related_terms  }

        let make_variable name = 
            Variable (VariableName.make name)

        let rec to_string = function
        | Variable variable -> 
            VariableName.to_string variable
        | Relation { relation_name = (RelationName.RelationName name); related_terms } ->
            match related_terms with
            | [] -> 
                name
            | _ ->
                Printf.sprintf "%s(%s)" name (related_terms |> List.map to_string |> String.concat ", ")

        (** If a relation which relates terms returns the arity. *)
        let rec relation_arities = function
        | Variable _ -> []
        | Relation { relation_name; related_terms } -> 
            (relation_name, List.length related_terms)
            :: (
                related_terms
                |> Utils.ListEx.concat_map relation_arities
            )

    end

    module ComplexTerm = struct
        type t =
            | Term of Term.t
            | EqualityAssertion of Term.t * Term.t
            | InequalityAssert of Term.t * Term.t

        let to_string = function
        | Term term ->
            Term.to_string term
        | EqualityAssertion (left, right) ->
            Printf.sprintf "<%s = %s>" (Term.to_string left) (Term.to_string right)
        | InequalityAssert (left, right) ->
            Printf.sprintf "<%s /= %s>" (Term.to_string left) (Term.to_string right)

        (** returns a list of tuples of relation names and the arity. *)
        let relation_arities = function
            | Term term -> Term.relation_arities term                
            | EqualityAssertion (left, right) ->
                List.concat [Term.relation_arities left; Term.relation_arities right]
            | InequalityAssert (left, right) ->
                List.concat [Term.relation_arities left; Term.relation_arities right]

    end

    module Query = struct
        type t = ComplexTerm.t list
        
        let empty: t = []
        
        let to_string (terms: t) =  
            terms
            |> List.map ComplexTerm.to_string
            |> String.concat "\n\tand "
            
    end

    module Frame = struct

        module FrameMap = Map.Make(VariableName)
        
        type t = Term.t FrameMap.t

        let empty = FrameMap.empty

        let extend (key, value) map : t= 
            FrameMap.add key value map

        let to_all_bindings frame =
            FrameMap.bindings frame
            |> List.map (fun (variable, term) ->
                Printf.sprintf "%s := %s" (VariableName.to_string variable) (Term.to_string term)
            )

        (** Recursively search  *)
        let rec lookup key (map: t) : Term.t option =
            match FrameMap.find_opt key map with
            | None -> 
                None
            | Some term ->
                match term with
                | Term.Variable var -> (
                    match lookup var map with
                    | None -> 
                        Some term
                    | Some term' ->
                        Some term'
                )
                | _ ->
                    Some term

        let instantiate (frame: t) =
            let rec resolve_variable_name variable_name =
                match lookup variable_name frame with
                | None -> 
                    Term.Variable (VariableName.VariableName "?")
                | Some bound_to_variable -> 
                    resolve_term bound_to_variable                 
            and resolve_term = function
            | Term.Variable var ->
                resolve_variable_name var
            | Term.Relation { relation_name; related_terms } ->
                Term.Relation {
                    relation_name; 
                    related_terms = related_terms |> List.map resolve_term
                }
            in
            resolve_term

        let variable_bindings_in_query (query: ComplexTerm.t list) (frame: t): (VariableName.t * Term.t) list =
            let rec resolve_variable_name variable_name =
                match lookup variable_name frame with
                | None -> 
                    Term.Variable (VariableName.VariableName "?")
                | Some bound_to_variable -> 
                    resolve_term bound_to_variable                 
            and resolve_term = function
            | Term.Variable var ->
                resolve_variable_name var
            | Term.Relation { relation_name; related_terms } ->
                Term.Relation {
                    relation_name; 
                    related_terms = related_terms |> List.map resolve_term
                }
            and visit_complex map = function
            | ComplexTerm.Term term ->
                visit_term map term
            | ComplexTerm.EqualityAssertion (left, right) ->
                visit_term (visit_term map left) right
            | ComplexTerm.InequalityAssert (left, right) ->
                visit_term (visit_term map left) right
            and visit_term map = function
            | Term.Variable var ->            
                extend (var, resolve_variable_name var) map
            | Term.Relation { related_terms } ->
                related_terms
                |> List.fold_left visit_term map
            in
            (
                query
                |> List.fold_left visit_complex empty
                |> FrameMap.bindings 
            )

        (** Return a list of the unique bindings *)
        let to_strings (query: ComplexTerm.t list) (frame: t): string list =
            match (variable_bindings_in_query query frame) with
            | [] -> []
            | bindings ->                
                bindings 
                |> List.map (fun (variable, term) ->
                    Printf.sprintf "%s := %s" (VariableName.to_string variable) (Term.to_string term)
                )

        let term_depends_on_variable term depends_on_variable frame =
            let rec recurse = function
            | Term.Variable var' ->
                if var' = depends_on_variable
                then true                
                else (
                    match lookup var' frame with
                    | None -> 
                        false
                    | Some value_of_var -> recurse value_of_var
                )
            | Term.Relation { related_terms } ->
                related_terms
                |> List.exists recurse in
            recurse term

    end

    module Rule = struct

        type t = 
            { antecedents : ComplexTerm.t list
            ; consequent : Term.t
            }

        let to_string { consequent; antecedents } =
            let consequent_string = Term.to_string consequent in
            (
                match antecedents with
                | [] -> 
                    consequent_string
                | _ -> 
                    let antecedents_string = antecedents |> Query.to_string in
                    Printf.sprintf "%s\n\twhen %s" consequent_string antecedents_string 
            )
            |> Printf.sprintf "%s."

        let relation_arities { consequent; antecedents } = 
            List.concat 
                [ antecedents 
                |> List.map ComplexTerm.relation_arities
                |> List.flatten
                ; (Term.relation_arities consequent) 
                ]

        let rename_rule_variables = 
            let id = ref 1 in
            let rec aux rule =
                rule.antecedents
                |> List.map rename_complex_term_variables
                |> fun antecedents' ->
                    (rule.consequent |> rename_term_variables)
                |> fun consequent' ->
                    { antecedents = antecedents'
                    ; consequent = consequent'
                    }            
            and rename_complex_term_variables (assertion: ComplexTerm.t) = ComplexTerm.(
                match assertion with
                | Term it -> 
                    it 
                    |> rename_term_variables
                    |> (fun new_assertion ->
                        Term new_assertion
                    )   
                | EqualityAssertion (left, right) ->
                    left
                    |> rename_term_variables
                    |> fun left' -> right |> rename_term_variables
                    |> fun right' ->
                        EqualityAssertion (left', right')            
                | InequalityAssert (left, right) ->
                    left
                    |> rename_term_variables
                    |> fun left' -> right |> rename_term_variables
                    |> fun right' ->
                        InequalityAssert (left', right')
                    )    
            and rename_term_variables (assertion: Term.t) = 
                match assertion with
                | Variable variable_name -> 
                    Variable (variable_rename variable_name)
                | Relation { relation_name; related_terms } -> 
                    related_terms
                    |> List.map rename_term_variables
                    |> fun new_related_terms -> 
                        Term.Relation 
                            { relation_name
                            ; related_terms = new_related_terms
                            }               
            and variable_rename (variable_name: VariableName.t) =
                VariableName.make_numbered variable_name !id
            and rename rule =
                id := !id + 1;
                aux rule in
            rename
    end

    module RuleDatabase : sig

        type rule_entry
        type t
        
        val empty: t

        val rule_from_entry: rule_entry -> Rule.t
        val identifier_of_rule_entry: rule_entry -> string
        val update_rule_entry: rule_entry -> Rule.t -> rule_entry
        val is_same: rule_entry -> rule_entry -> bool


        val remove_rule: t -> rule_entry -> t        
        val add_rule: t -> Rule.t -> t
        val update_rule: t -> rule_entry -> t       
        
        val fetch_for_query: t -> Term.t -> rule_entry LazyStream.t
        val all_rules: t -> rule_entry list

    end = struct

        module RuleIndex = Map.Make(String)

        type rule_entry =
            { id: int
            ; rule: Rule.t
            }

        type rule_index = (rule_entry list) RuleIndex.t
        
        type t = 
            { all_rules: rule_entry list
            ; indexed_by_consequent_relation: rule_index
            }

        let rule_from_entry { rule } = rule
        let identifier_of_rule_entry { id } = Printf.sprintf "%d" id
        let is_same left right = left.id = right.id

        let update_rule_entry entry rule = 
            { id = entry.id
            ; rule 
            }

        let empty: t = 
            { all_rules = []
            ; indexed_by_consequent_relation = RuleIndex.empty
            }

        let fetch_for_query (db: t) (query) = 
            (
                match query with
                | Term.Variable _ ->
                    db.all_rules
                | Term.Relation { relation_name = RelationName.RelationName name } ->
                    match (RuleIndex.find_opt name db.indexed_by_consequent_relation) with
                    | Some rules -> 
                        rules
                    | None ->
                        []
            )                
            |> List.rev  
            |> LazyStream.from_list

        let all_rules { all_rules } = all_rules |> List.rev

        let current_id = ref 1

        let new_id () = 
            current_id := !current_id + 1; 
            !current_id        
            
        let remove_rule (db: t) ({ rule; id }: rule_entry) = 
            let filter = List.filter (fun entry -> entry.id != id) in
            let all_rules = db.all_rules |> filter in
            let remove = function
                | None -> Some []
                | Some rules' -> Some (filter rules') in
            match rule.consequent with
            | Term.Variable _ ->
                { db with all_rules }
            | Term.Relation { relation_name = RelationName name } ->
                { all_rules
                ; indexed_by_consequent_relation = RuleIndex.update name remove db.indexed_by_consequent_relation
                }

        let update_rule db updated_rule_entry = 
            let update_rule_entries rule_entries =
                rule_entries 
                |> List.map (fun rule_entry ->
                    if rule_entry.id = updated_rule_entry.id
                    then updated_rule_entry
                    else rule_entry 
                ) in
            let all_rules = db.all_rules |> update_rule_entries in
            let update_for_key = function
                | None -> Some [updated_rule_entry]
                | Some rules' -> Some (update_rule_entries rules') in
            match updated_rule_entry.rule.consequent with
            | Term.Variable _ ->
                { db with all_rules }
            | Term.Relation { relation_name = RelationName name } ->
                { all_rules
                ; indexed_by_consequent_relation = RuleIndex.update name update_for_key db.indexed_by_consequent_relation
                }
        
        let add_rule (db: t) (rule: Rule.t) =
            let entry = { id = new_id (); rule; } in
            let update_rule = function
            | None -> Some [entry]
            | Some rules' -> Some (entry::rules') in
            match rule.consequent with
            | Term.Variable _ ->
                { db with all_rules = entry::db.all_rules }
            | Term.Relation { relation_name = RelationName name } ->
                { all_rules = entry::db.all_rules
                ; indexed_by_consequent_relation = RuleIndex.update name update_rule db.indexed_by_consequent_relation
                }

    end 
end

module Validator 
    : sig

    type rule_database_snapshot

    val rule_database_snapshot: Types.RuleDatabase.t -> rule_database_snapshot

    (** Issues found in the edited version of an existing rule in the database. *)
    val issues_in_existing_rule: rule_database_snapshot -> Types.RuleDatabase.rule_entry -> string list

    (** Issues found in a proposed new rule. *)
    val issues_in_new_rule: rule_database_snapshot -> Types.Rule.t -> string list

    (** Issues found in a query. *)
    val issues_in_query: rule_database_snapshot -> Types.ComplexTerm.t list -> string list

    end
    = struct

    module RelationMap = Utils.AggregateMap(Types.RelationName)

    type rule_database_snapshot = Types.RuleDatabase.rule_entry list 

    let rule_database_snapshot rule_database = 
        rule_database
        |> Types.RuleDatabase.all_rules

    let arity_mismatch_messages relation_arities_opt relation_names = 
        relation_names
        |> List.fold_left 
            (fun messages relation_name -> 
                let Types.RelationName.RelationName relation_name' = relation_name in 
                match relation_arities_opt relation_name with
                | None -> 
                    messages
                | Some relation_arities -> 
                    match Utils.ListEx.first_inconsistent_opt relation_arities snd with
                    | None -> messages
                    | Some (first, second) ->
                        (Printf.sprintf "Relation '%s' has inconsistent number of terms applied of %d and %d" relation_name' first second)::messages
            )
            []        

    let relation_map_of_rules rules = 
        rules
        |> Utils.ListEx.concat_map Types.Rule.relation_arities
        |> RelationMap.make fst

    let unique_relation_names_of_rule rule = 
        rule
        |> Types.Rule.relation_arities 
        |> RelationMap.make fst 
        |> RelationMap.keys

    let issues_in_existing_rule rule_database_snapshot rule_entry_to_validate = 
        let rule_map =             
            (
                rule_entry_to_validate
                ::(
                    rule_database_snapshot 
                    |> List.filter (fun entry -> not (Types.RuleDatabase.is_same entry rule_entry_to_validate))
                )
            )
            |> List.map Types.RuleDatabase.rule_from_entry
            |> relation_map_of_rules in
        rule_entry_to_validate
        |> Types.RuleDatabase.rule_from_entry
        |> unique_relation_names_of_rule
        |> arity_mismatch_messages (fun relation_name -> RelationMap.find_opt relation_name rule_map)

    let issues_in_new_rule rule_database_snapshot rule_to_validate = 
        let rule_map =             
            (
                rule_to_validate
                ::(rule_database_snapshot |> List.map Types.RuleDatabase.rule_from_entry)
            )
            |> relation_map_of_rules in
        rule_to_validate
        |> unique_relation_names_of_rule
        |> arity_mismatch_messages (fun relation_name -> RelationMap.find_opt relation_name rule_map)

    let issues_in_query rule_database_snapshot query_to_validate = 
        let query_relation_arities = query_to_validate |> Utils.ListEx.concat_map Types.ComplexTerm.relation_arities in
        let rule_map =
            List.concat 
                [ query_relation_arities 
                ; rule_database_snapshot 
                |> List.map Types.RuleDatabase.rule_from_entry
                |> Utils.ListEx.concat_map Types.Rule.relation_arities
                ]                    
            |> RelationMap.make fst in
        query_relation_arities
        |> RelationMap.make fst
        |> RelationMap.keys
        |> arity_mismatch_messages (fun relation_name -> RelationMap.find_opt relation_name rule_map)

end

module Parser 
    : sig
        val rule_parser: Types.Rule.t ParserM.t
        val query_parser: (Types.ComplexTerm.t list) ParserM.t
        (** Return the result of batch parsing a ton of rule strings. The rules are parsed and validated and a successful result is only returned if every rule is cool. *)
        val rule_database_result_from_rule_strings: string list -> (Types.RuleDatabase.t, string list) Tea.Result.t
    end 
    = struct

    open Types
    open ParserM

    let name_parser purpose = 
        concatenate_error_messages (Printf.sprintf "%s requires %s" purpose) (letter <|> equals '_')
        >>= fun first_letter -> zero_to_many (attempt_in_order [letter; digit; equals '_'; equals '-']) 
        |> map (fun char_list ->
            (first_letter::char_list)
            |> List.map (String.make 1)
            |> String.concat ""
        )

    let variable_parser = 
        change_last_failure_message 
            "Variable starting with ?"
            (
                equals '?'
                >> 
                (
                    (name_parser "Variable")
                    |> map (fun str -> 
                        Term.Variable (VariableName.VariableName str)
                    )
                )
            )

    let is_equal_parser =
        (token "= ") >> succeed_with true

    let is_inequal_parser =
        (token "/= ") >> succeed_with false

    let inequality_parser =
        is_equal_parser <|> is_inequal_parser

    let conjunction_parser item_parser =
        one_to_many_delimited ~item_parser: item_parser ~delimiter_parser: (skip_whitespace >> token "and" >> skip_whitespace)

    let rec query_parser input = 
        (
            complex_terms_parser 
        ) input
    and complex_term_parser input = 
        (
            (simple_term_parser |> map (fun term -> ComplexTerm.Term term))
            <|> comparison_parser
        ) input
    and rule_parser input = 
        (
            (
                simple_term_parser 
                >>= fun consequent ->
                    (
                        (skip_whitespace >> (token "when") >> skip_whitespace >> complex_terms_parser)
                        |> map (fun antecedents -> { Rule.consequent; antecedents })
                    )
                    <|> 
                    (succeed_with { Rule.consequent; antecedents = [] })                 
            ) << (equals '.')
        ) input
    and complex_terms_parser input = (conjunction_parser complex_term_parser) input
    and comparison_parser input: ComplexTerm.t parse_result =
        (
            ((equals '<') >> simple_term_parser)
            >>= fun (left_term: Term.t) -> inequality_parser
            >>= fun (is_equal: bool) -> (simple_term_parser << (equals '>'))
            >>= fun (right_term: Term.t) ->
                succeed_with (
                    if is_equal
                    then ComplexTerm.EqualityAssertion (left_term, right_term)
                    else ComplexTerm.InequalityAssert (left_term, right_term)
                )
        ) input
    and simple_term_parser input: Term.t parse_result =
        (
            variable_parser 
            <|> relational_term_parser            
        ) input
    and relational_term_parser input =
        (
            ((name_parser "Relation") << skip_whitespace)           
            >>= fun name ->
                let relation_name = RelationName.RelationName name in
                ParserM.bind_with 
                    ~parser: (equals '(' << skip_whitespace)
                    ~failure_return: (Term.Relation { relation_name; related_terms = []})
                    ~next_parser: (fun _ -> 
                        (simple_terms_parser << skip_whitespace << equals ')')
                        |> map (fun related_terms -> Term.Relation { relation_name; related_terms })
                    )                
        ) input

    and simple_terms_parser input =
        (one_to_many_delimited ~item_parser: (simple_term_parser << skip_whitespace) ~delimiter_parser: (equals ',' >> skip_whitespace)) input


    (** Return the result of batch parsing a ton of rule strings. The rules are parsed and validated and a successful result is only returned if every rule is cool. *)
    let rule_database_result_from_rule_strings rule_strings =
        rule_strings
        |> List.fold_left 
            (fun rule_database_result rule ->                 
                rule_database_result
                |> Utils.ResultEx.flat_map (fun rule_database -> 
                    (ParserM.parse_require_all rule_parser rule)
                    |> Utils.ResultEx.map_error (fun err -> err |> List.map ParserM.string_of_parse_error)
                    |> Utils.ResultEx.flat_map (fun ({ result }:(Types.Rule.t ParserM.parse_success)) ->
                        let issues = Validator.issues_in_new_rule (Validator.rule_database_snapshot rule_database) result in
                        if (List.length issues) > 0
                        then Tea.Result.Error issues
                        else Tea.Result.Ok (Types.RuleDatabase.add_rule rule_database result)
                    )
                )
            ) 
            (Tea.Result.Ok Types.RuleDatabase.empty)

end


module IO = struct


end

module Evaluator 
    : sig 

        type solution = 
            { frame: Types.Frame.t
            ; rules_applied: Types.RuleDatabase.rule_entry list            
            ; failed_at_depth: int option                   
            }

        val query: Types.RuleDatabase.t -> Types.ComplexTerm.t list -> solution LazyStream.t 

    end
    = struct

    open Types
    open LazyStream

    type solution = 
        { frame: Frame.t
        ; rules_applied: Types.RuleDatabase.rule_entry list 
        ; failed_at_depth: int option                   
        }

    let put_negations_at_end terms =
        let is_negation = function
        | ComplexTerm.InequalityAssert _ -> true
        | _ -> false in
        let (negation_terms, positive_terms) = List.partition is_negation terms in
        List.concat [positive_terms; negation_terms]

    let maximum_search_depth = 200

    let query_complex_terms (db: RuleDatabase.t) terms =
        let rec query_complex_terms 
            (search_depth: int)
            (complex_term_list: ComplexTerm.t list) 
            (solution_stream: solution LazyStream.t) 
            : solution LazyStream.t =
            
            if (search_depth > maximum_search_depth)
            then LazyStream.return ({ frame = Frame.empty; rules_applied = []; failed_at_depth = Some search_depth })
            else
                let query_complex_term (complex_term: ComplexTerm.t) : solution LazyStream.t = ComplexTerm.(
                    match complex_term with
                    | Term term ->
                        query_term search_depth term solution_stream       
                    | EqualityAssertion (left, right) ->
                        solution_stream >>= (fun solution -> (unification_opt left right solution) |> LazyStream.from_option)
                    | InequalityAssert (left, right) -> 
                        let solution_stream_where_no_unification solution =
                            match unification_opt left right solution with
                            | None -> return solution
                            | Some _ -> EndOfStream in
                        solution_stream >>= solution_stream_where_no_unification
                ) in
                match complex_term_list with
                | [] -> solution_stream
                | term::rest_of_terms ->
                    query_complex_terms 
                        search_depth
                        rest_of_terms 
                        (query_complex_term term)
        
        and query_term (search_depth: int) (term: Term.t) (solution_stream: solution LazyStream.t) =
            let apply_rule 
                (query_term: Term.t) 
                (solution: solution) 
                (rule_entry: RuleDatabase.rule_entry) 
                : solution LazyStream.t =                 
                let rule = RuleDatabase.rule_from_entry rule_entry in 
                let clean_rule = Rule.rename_rule_variables rule in
                match unification_opt query_term clean_rule.consequent solution with
                | None -> 
                    EndOfStream

                | Some solution_info' ->   
                    query_complex_terms 
                        (search_depth + 1)
                        clean_rule.antecedents 
                        (LazyStream.return ({ solution_info' with rules_applied = rule_entry::solution_info'.rules_applied })) in
            let apply_rules 
                (query_term: Term.t) 
                (solution: solution) =
                (RuleDatabase.fetch_for_query db query_term)
                >>= (apply_rule query_term solution) in        

            solution_stream >>= (apply_rules term)
        
        and unification_opt 
            (left_term: Term.t) 
            (right_term: Term.t) 
            (solution: solution)
            : solution option =

            let unification_or_add_variable_opt 
                (variable_name: VariableName.t) 
                (value_term: Term.t) 
                (solution: solution)
                : solution option = 
                match Frame.lookup variable_name solution.frame with
                | Some term_bound_to_variable ->
                    unification_opt term_bound_to_variable value_term solution
                | None -> (
                    match value_term with
                    | Term.Variable value_variable -> (
                        match Frame.lookup value_variable solution.frame with
                        | Some term_bound_to_value ->
                            unification_opt (Term.Variable variable_name) term_bound_to_value solution
                        | None ->
                            Some                             
                                { solution 
                                with frame = (Frame.extend (variable_name, value_term) solution.frame)
                                }                        
                    )
                    | _ -> (
                        if (Frame.term_depends_on_variable value_term variable_name solution.frame)
                        then None
                        else Some 
                            { solution
                            with frame = (Frame.extend (variable_name, value_term) solution.frame)
                            }                                          
                    )
                ) in

            let unification_of_terms left_terms right_terms =                
                List.combine left_terms right_terms
                |> List.fold_left 
                    (fun solution_opt (left, right) -> 
                        match solution_opt with
                        | None -> 
                            None
                        | Some solution ->
                            unification_opt left right solution
                    ) 
                    (Some solution) in

            if (left_term = right_term)
            then (Some solution)                
            else (
                match (left_term, right_term) with
                | (Term.Variable left_var, _) ->
                    unification_or_add_variable_opt 
                        left_var 
                        right_term 
                        solution

                | (_, Term.Variable right_var) ->
                    unification_or_add_variable_opt 
                        right_var 
                        left_term 
                        solution

                | (Term.Relation left_relation, Term.Relation right_relation) ->
                    if (RelationName.equals left_relation.relation_name right_relation.relation_name)
                    then 
                        unification_of_terms 
                            left_relation.related_terms 
                            right_relation.related_terms
                    else 
                        None

            ) in        

        query_complex_terms 1 (put_negations_at_end terms)

    let query (db: RuleDatabase.t) (query: ComplexTerm.t list) : solution LazyStream.t =
        query_complex_terms db query (LazyStream.return { frame = Frame.empty; rules_applied = []; failed_at_depth = None })

end