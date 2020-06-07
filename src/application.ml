open Language.Types
open Utils

module Model = struct
    
    module ParsedTextEditing = struct
        type 'a t =
            { text: string
            ; parse_result: 'a ParserM.parse_result
            }

        let empty () : 'a t =
            { text = ""
            ; parse_result = Tea.Result.Error []
            }

        let make text parser : 'a t = 
            { text
            ; parse_result = ParserM.parse_require_all parser text                   
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
        | AddingRule of Rule.t ParsedTextEditing.t
        | EditingQuery of (ComplexTerm.t list) ParsedTextEditing.t
        | ExecutingQuery of ExecutingQueryInfo.t

    type t = 
        { rule_database: RuleDatabase.t
        ; interaction_mode: interaction_mode
        }
    
    let init () : t = 
        { rule_database = RuleDatabase.empty
        ; interaction_mode = AddingRule (ParsedTextEditing.empty ())
        }
end

module Message = struct

    type t =
        | LoadRulesFromLocation of Web.Location.location
        
        | UpdateText of string
        | SwitchToAddRule
        | SwitchToEditQuery
        
        | AddRule of Rule.t
        | DeleteRule of RuleDatabase.rule_entry

        | ExecuteQuery of ComplexTerm.t list
        | NextFrame
        [@@bs.deriving {accessors}] (* This is a nice quality-of-life addon from Bucklescript, it will generate function names for each constructor name, optional, but nice to cut down on code, this is unused in this example but good to have regardless *)

end

let update ({ rule_database; interaction_mode }: Model.t) msg = Message.(
    (
        match msg with        
        | LoadRulesFromLocation _location -> (
            { Model.rule_database; interaction_mode }
        )            
        
        | UpdateText text -> (
            match interaction_mode with 
            | AddingRule _ ->
                { Model.rule_database
                ; interaction_mode = AddingRule (Model.ParsedTextEditing.make text Language.Parser.rule_parser)
                }
            | EditingQuery _ ->
                { Model.rule_database
                ; interaction_mode = EditingQuery (Model.ParsedTextEditing.make text Language.Parser.query_parser)
                }
            | _ ->
                { Model.rule_database; interaction_mode }
        )            

        | SwitchToAddRule ->
            { rule_database; interaction_mode = AddingRule (Model.ParsedTextEditing.empty ()) }

        | SwitchToEditQuery ->
            { rule_database; interaction_mode = EditingQuery (Model.ParsedTextEditing.empty ()) }

        | AddRule rule -> 
            { rule_database = (RuleDatabase.add_rule rule_database rule)
            ; interaction_mode = AddingRule (Model.ParsedTextEditing.empty ())
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
                ; interaction_mode =  ExecutingQuery (Model.ExecutingQueryInfo.next_solution executing_query_info)
                }
            | _ ->
                { rule_database; interaction_mode }
    )
    |> (fun model -> (model, Tea.Cmd.NoCmd))
)
