open Language.Types
open Utils

module ApplicationModel = struct
    
    module CompiledTextEditing = struct

        type 'a t =
            { text: string
            ; compilation_result: ('a, string list) Tea.Result.t
            }

        let empty () : 'a t =
            { text = ""
            ; compilation_result = Tea.Result.Error []
            }

        let edit string_of_item item : 'a t =
            { text = string_of_item item
            ; compilation_result = Tea.Result.Ok item
            }

        let make text parser validator : 'a t = 
            { text
            ; compilation_result = 
                match ParserM.parse_require_all parser text with
                | Tea.Result.Ok { result } -> (
                    match validator result with
                    | [] -> 
                        Tea.Result.Ok result
                    | validation_messages ->
                        Tea.Result.Error validation_messages
                )
                | Tea.Result.Error errors -> (
                    match List.sort ParserM.parse_error_compare errors with
                    | [] -> Tea.Result.Error []
                    | first_error::rest_of_errors ->
                        let errors' = first_error::(rest_of_errors |> List.filter (fun err -> (ParserM.parse_error_compare err first_error) <= 0)) in 
                        Tea.Result.Error (errors' |> List.map ParserM.string_of_parse_error)
                )
            }

    end

    module ExecutingQueryInfo = struct
        type displayed_solution = 
            { bindings: string list        
            }

        type t = 
            { initiating_query: ComplexTerm.t list
            ; solution_stream: Language.Evaluator.solution LazyStream.t
            ; displayed_solutions: Language.Evaluator.solution list
            }

        let next_solution (info: t) =
            match info.solution_stream with
            | LazyStream.EndOfStream ->
                info
            | LazyStream.LCons (value, delayed_tail) ->
                { initiating_query = info.initiating_query
                ; solution_stream = Lazy.force delayed_tail
                ; displayed_solutions = (value::info.displayed_solutions)
                }           

    end

    type interaction_mode = 
        | ViewingRules 
        | AddingRule of Rule.t CompiledTextEditing.t
        | EditingRule of RuleDatabase.rule_entry * Rule.t CompiledTextEditing.t

        | EditingQuery of (ComplexTerm.t list) CompiledTextEditing.t
        | ExecutingQuery of ExecutingQueryInfo.t

    type t = 
        { rule_database: RuleDatabase.t
        ; interaction_mode: interaction_mode
        }
    
    let init () : t = 
        { rule_database = RuleDatabase.empty
        ; interaction_mode = ViewingRules
        }
end

module Message = struct

    type t =              
        | ViewRules
        | InitiateAddRule
        | InitiateEditRule of RuleDatabase.rule_entry
        | InitiateEditQuery

        | UpdateText of string

        | AddRule of Rule.t
        | EditRuleEntry of RuleDatabase.rule_entry
        | DeleteRule of RuleDatabase.rule_entry

        | ExecuteQuery of ComplexTerm.t list
        | NextFrame
        [@@bs.deriving {accessors}] (* This is a nice quality-of-life addon from Bucklescript, it will generate function names for each constructor name, optional, but nice to cut down on code, this is unused in this example but good to have regardless *)

end

let update ({ rule_database; interaction_mode }: ApplicationModel.t) msg = 
    let open Message in
    let open ApplicationModel in 
    (
        match msg with                
        | UpdateText text -> (
            let snapshot = rule_database |> Language.Validator.rule_database_snapshot in
            match interaction_mode with 
            | AddingRule _ ->
                { rule_database
                ; interaction_mode = AddingRule (ApplicationModel.CompiledTextEditing.make text Language.Parser.rule_parser (Language.Validator.issues_in_new_rule snapshot))
                }
            | EditingRule (rule_entry, _) ->
                let validator rule = 
                    Language.Types.RuleDatabase.update_rule_entry rule_entry rule
                    |> Language.Validator.issues_in_existing_rule snapshot in
                { rule_database
                ; interaction_mode = EditingRule 
                    (
                        rule_entry
                        , ApplicationModel.CompiledTextEditing.make text Language.Parser.rule_parser validator
                    )                    
                }
            | EditingQuery _ ->
                { rule_database
                ; interaction_mode = EditingQuery (ApplicationModel.CompiledTextEditing.make text Language.Parser.query_parser (Language.Validator.issues_in_query snapshot))
                }
            | _ ->
                { rule_database; interaction_mode }
        )         

        | ViewRules ->
            { rule_database; interaction_mode = ViewingRules }

        | InitiateEditRule rule_entry ->            
            let rule = Language.Types.RuleDatabase.rule_from_entry rule_entry in
            { rule_database; 
            interaction_mode = EditingRule
                (
                    rule_entry
                    , (ApplicationModel.CompiledTextEditing.edit Language.Types.Rule.to_string rule)
                ) 
            }

        | InitiateAddRule ->
            { rule_database; interaction_mode = AddingRule (ApplicationModel.CompiledTextEditing.empty ()) }

        | InitiateEditQuery ->
            { rule_database; interaction_mode = EditingQuery (ApplicationModel.CompiledTextEditing.empty ()) }

        | AddRule rule -> 
            { rule_database = (RuleDatabase.add_rule rule_database rule)
            ; interaction_mode = AddingRule (ApplicationModel.CompiledTextEditing.empty ())
            }

        | EditRuleEntry rule_entry ->
            { rule_database = (RuleDatabase.update_rule rule_database rule_entry)
            ; interaction_mode = ViewingRules 
            }

        | DeleteRule rule_entry ->
            { rule_database = (RuleDatabase.remove_rule rule_database rule_entry)
            ; interaction_mode                    
            }

        | ExecuteQuery initiating_query ->
            let solution_stream = Language.Evaluator.query rule_database initiating_query in
            { rule_database
            ; interaction_mode = ExecutingQuery 
                { initiating_query
                ; solution_stream 
                ; displayed_solutions = []
                }
            }

        | NextFrame ->
            match interaction_mode with
            | ExecutingQuery executing_query_info ->
                { rule_database
                ; interaction_mode =  ExecutingQuery (ApplicationModel.ExecutingQueryInfo.next_solution executing_query_info)
                }
            | _ ->
                { rule_database; interaction_mode }
    )
    |> (fun model -> (model, Tea.Cmd.NoCmd))
