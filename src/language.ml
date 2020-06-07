open Utils

module Types = struct
    (** A Variable Name wrapped in a constructor to avoid confusion with plain strings *)
    module VariableName = struct

        type t = VariableName of string
        let compare (VariableName left) (VariableName right) = compare left right

        (** Make a new variable from an existing by appending a number. *)
        let make_numbered (VariableName variable) num = VariableName (Printf.sprintf "%s%d" variable num)

        let to_string (VariableName name) =
            Printf.sprintf "?%s" name

    end

    module RelationName = struct

        type t = RelationName of string
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

        let rec to_string = function
        | Variable variable -> 
            VariableName.to_string variable
        | Relation { relation_name = (RelationName.RelationName name); related_terms } ->
            match related_terms with
            | [] -> 
                name
            | _ ->
                Printf.sprintf "[%s: %s]" name (related_terms |> List.map to_string |> String.concat ", ")

        (** If a relation which relates terms returns the arity. *)
        let rec relation_arities = function
        | Variable _ -> []
        | Relation { relation_name = (RelationName.RelationName name); related_terms } -> 
            (name, List.length related_terms)
            :: (
                related_terms
                |> List.map relation_arities
                |> List.concat
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

    module Frame = struct

        module FrameMap = Map.Make(VariableName)
        
        type t = Term.t FrameMap.t

        let empty = FrameMap.empty

        let extend (key, value) map : t= 
            FrameMap.add key value map

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
            let antecedents_string = antecedents
                |> List.map ComplexTerm.to_string
                |> String.concat ", " in
            Printf.sprintf "(%s) => %s" antecedents_string (Term.to_string consequent)

        let relation_arities { consequent; antecedents } = 
            List.concat 
                [ antecedents 
                |> List.map ComplexTerm.relation_arities
                |> List.flatten
                ; (Term.relation_arities consequent) 
                ]

        let rename_rule_variables = 
            let rule_counter = ref 0 in
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
                VariableName.make_numbered variable_name !rule_counter
            and rename rule =
                (
                    rule_counter := !rule_counter + 1;
                    aux rule
                )
            in
            rename
    end

    module RuleDatabase : sig

        type rule_entry
        type t
        val rule_from_entry: rule_entry -> Rule.t
        val empty: t
        val fetch_for_query: t -> Term.t -> rule_entry LazyStream.t
        val remove_rule: t -> rule_entry -> t
        val add_rule: t -> Rule.t -> t
        val all_rules: t -> rule_entry list
        val is_same: rule_entry -> rule_entry -> bool

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

        let is_same left right = left.id = right.id

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

        let all_rules { all_rules } = all_rules

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

module Parser 
    : sig
        val rule_parser: Types.Rule.t ParserM.t
        val query_parser: (Types.ComplexTerm.t list) ParserM.t
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

end

module Validator 
    : sig

    val issues: Types.Rule.t list -> Types.Rule.t -> string list

    end
    = struct

    (* 
    open Types

    module RelationMap = Utils.AggregateMap(String)

        let focus_rule_arities = Rule.relation_arities rule in
    *)

    let issues _all_rules _rule = []

end

module Evaluator 
    : sig 

        type solution = 
            { frame: Types.Frame.t
            ; rules_applied: Types.RuleDatabase.rule_entry list            
            }

        val query: Types.RuleDatabase.t -> Types.ComplexTerm.t list -> solution LazyStream.t 

    end
    = struct

    open Types
    open LazyStream

    type solution = 
        { frame: Frame.t
        ; rules_applied: Types.RuleDatabase.rule_entry list                    
        }

    let put_negations_at_end terms =
        let is_negation = function
        | ComplexTerm.InequalityAssert _ -> true
        | _ -> false in
        let (negation_terms, positive_terms) = List.partition is_negation terms in
        List.concat [positive_terms; negation_terms]

    let query_complex_terms (db: RuleDatabase.t) terms =
        let rec solution_stream_from_complex_term_list complex_term_list solution_stream: solution LazyStream.t =
            match complex_term_list with
            | [] -> solution_stream
            | term::rest_of_terms ->
                solution_stream_from_complex_term_list rest_of_terms (solution_stream_from_complex_term term solution_stream)

        and solution_stream_from_complex_term (complex_term: ComplexTerm.t) (solution_stream: solution LazyStream.t): solution LazyStream.t = ComplexTerm.(
            match complex_term with
            | Term term ->
                query_term term solution_stream       
            | EqualityAssertion (left, right) ->
                solution_stream >>= (fun solution -> (solution_opt_by_unification left right solution) |> LazyStream.from_option)
            | InequalityAssert (left, right) -> 
                let solution_stream_where_no_unification solution =
                    match solution_opt_by_unification left right solution with
                    | None -> return solution
                    | Some _ -> EndOfStream in
                solution_stream >>= solution_stream_where_no_unification
        )
        
        and query_term term (solution_stream: solution LazyStream.t) =
            solution_stream >>= (apply_rules term)
            
        and apply_rules query_term solution =
            RuleDatabase.fetch_for_query db query_term 
            >>= (apply_rule query_term solution) 
        
        and apply_rule query_term solution rule_entry: solution LazyStream.t = 
            let rule = RuleDatabase.rule_from_entry rule_entry in 
            let clean_rule = Rule.rename_rule_variables rule in                
            match solution_opt_by_unification query_term clean_rule.consequent solution with
            | None -> 
                EndOfStream

            | Some solution' ->                     
                solution_stream_from_complex_term_list 
                    clean_rule.antecedents 
                    (LazyStream.return { solution' with rules_applied = rule_entry::solution'.rules_applied })               
        
        and solution_opt_by_unification left_term right_term solution: solution option =
            if (left_term = right_term)
            then (Some solution)                
            else (
                match (left_term, right_term) with
                | (Term.Variable left_var, _) ->
                    solution_opt_by_unification_or_extension_of_variable 
                        left_var 
                        right_term 
                        solution

                | (_, Term.Variable right_var) ->
                    solution_opt_by_unification_or_extension_of_variable 
                        right_var 
                        left_term 
                        solution

                | (Term.Relation left_relation, Term.Relation right_relation) ->
                    if (RelationName.equals left_relation.relation_name right_relation.relation_name)
                    then 
                        solution_opt_by_unification_of_term_lists 
                            solution  
                            left_relation.related_terms 
                            right_relation.related_terms
                    else 
                        None

            )                       
        and solution_opt_by_unification_of_term_lists (starting_solution: solution) left_terms right_terms =                
            List.combine left_terms right_terms
            |> List.fold_left 
                (fun solution_opt (left, right) -> 
                    match solution_opt with
                    | None -> 
                        None
                    | Some solution ->
                        solution_opt_by_unification left right solution
                ) 
                (Some starting_solution)
        and solution_opt_by_unification_or_extension_of_variable (variable_name: VariableName.t) (value_term: Term.t) (solution: solution): solution option = 
            match Frame.lookup variable_name solution.frame with
            | Some term_bound_to_variable ->
                solution_opt_by_unification term_bound_to_variable value_term solution
            | None -> (
                match value_term with
                | Term.Variable value_variable -> (
                    match Frame.lookup value_variable solution.frame with
                    | Some term_bound_to_value ->
                        solution_opt_by_unification (Term.Variable variable_name) term_bound_to_value solution
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
            )
        in
        solution_stream_from_complex_term_list (put_negations_at_end terms)

    let query (db: RuleDatabase.t) (query: ComplexTerm.t list) : solution LazyStream.t =
        query_complex_terms db query (LazyStream.return { frame = Frame.empty; rules_applied = [] })

end