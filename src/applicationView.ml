open Tea.Html
open Application
open Language.Types
open Utils

module ContainersView = struct

    let style = {j|
        body {
            background-color: #eee;
            display: flex;
            flex-direction: column;
            font-family: sans-serif;
        }

        p {
            font-size: 14px;
        }
    |j}

end

module CommandView : sig 
        val style: string       
        val button: ?enabled: bool -> string -> 'a -> 'a Vdom.t
       
    end 
    = struct

    let button ?enabled:(enabled = true) title msg  =
        button
            [ onClick msg; Attributes.disabled (not enabled)]
            [ text title ]

    let blue_color = "#48a9dc"

    let style = {j|
        button {
            background-color: white;
            color: $blue_color;
            box-shadow: 0 0 0 1px $blue_color;
            border: none;
            padding: 6px;
            margin-left: 4px;
            font-size: 14px;
        }

        button:active {
            background-color: $blue_color;
            color: white;
        }

        button:disabled {
            background-color: #ddd;
            color: #90adbd;
        }

        a, a:active, a:visited {
            display: inline-block;
            color: $blue_color
        }

        a, a:active, a:visited {
            display: inline-block;
            color: $blue_color
        }
    |j}

end    

module PanelView = struct

    let container_class = "panel-container"
    let panel_header_class = "header"
    let panel_body_class = "panel-body"

    let view ~header body =
        div [ class' container_class]
            [ div [ class' panel_header_class ] [text header] 
            ; div [ class' panel_body_class ] body
            ]

    let style = {j|
        div.$panel_header_class {
            background-color: blue;
            color: white;
            font-weight: bold;
            padding: 4px;
        }        

        div.$container_class {
            float: left;
            margin: 5px;
            width: 48%;
            border: solid 1px #aaa;
        }

        div.$panel_body_class {
            padding: 6px;
        }
    |j}

end
    
module RuleView = struct

    let variable_class = "variable"
    let fact_name_class = "fact"
    let relation_name_class = "relation"
    let punctuation_class = "punctuation"
    
    let rule_item_class = "rule-item"
    let rule_used_class = "rule-used"
    let rule_display_class = "rule-display"

    let style = {j|
        .$variable_class {
            color: #ff0; 
        }

        .$fact_name_class {
            color: #0f0;
        }
        
        .$relation_name_class {
            color: #4af;
        }

        .$punctuation_class {
            color: white;
            font-weight: bold;
        }

        .$rule_display_class {
            background-color: black;
            font-family: Consolas, monospace;
            padding: 4px;
        }

        .$rule_item_class {
            border: solid 1px #888;
            margin-bottom: 10px;
            background-color: white;
        }

        .$rule_item_class.$rule_used_class {
            border: solid 2px #44f;
            background-color: yellow;            
        }

        ul {
            list-style: none;
            margin-block-start: 0;
            margin-block-end: 0;
        }
    |j}


    let punctuation_view str = span [class' punctuation_class] [text str]
    
    let rec term_view = function
        | Term.Variable VariableName var ->
            span [class' variable_class] [text var]
        | Term.Relation { relation_name = RelationName name; related_terms } ->
            match related_terms with
            | [] -> 
                span [class' fact_name_class] [text name]
            | first::rest -> 
                span [] 
                    [ span [class' relation_name_class] [text name]
                    ; punctuation_view "("
                    ; term_view first
                    ; span [] 
                        (
                            rest 
                            |> List.map (fun term -> 
                                span []
                                    [ punctuation_view ", "
                                    ; term_view term                                            
                                    ]               
                            )                                                    
                        )                                
                    ; punctuation_view ")"
                    ]                     

    let complex_term_view = function
        | Language.Types.ComplexTerm.Term term -> term_view term
        | Language.Types.ComplexTerm.EqualityAssertion (left, right) ->
            span [] 
                [ term_view left
                ; punctuation_view "="
                ; term_view right
                ]
        | Language.Types.ComplexTerm.InequalityAssert (left, right) ->
            span [] 
                [ term_view left
                ; punctuation_view "/="
                ; term_view right
                ]

    let view rule_entries_applied (rule_entry: RuleDatabase.rule_entry) =        
        let { Rule.antecedents; consequent } = RuleDatabase.rule_from_entry rule_entry in
        let should_highlight = rule_entries_applied |> List.exists (fun applied -> RuleDatabase.is_same applied rule_entry) in
        let introduced_complex introducer term = 
            li [] 
                [ punctuation_view introducer
                ; complex_term_view term 
                ] in
        div [ classList [(rule_item_class, true); (rule_used_class, should_highlight)] ]
            [ Tea.Html.a [onClick (Message.deleteRule rule_entry)] [text "Delete"]
            ; div [class' rule_display_class]
                [ term_view consequent            
                ; (
                    match antecedents with
                    | [] -> noNode
                    | first::rest ->
                        ul []
                            (
                                (introduced_complex "when " first)::
                                (rest |> List.map (introduced_complex "and "))
                            )
                )
                ]
            ]

end

module ParsedTextEditingView = struct

    let language_editing_class = "language-editing"
    let errors_container_class = "errors-container"

    let style = {j|
        input {
            margin-left: 6px;
        }          
        
        .$language_editing_class {
            width: 96%;
            font-family: Consolas, monospace;
            background-color: black;
            color: white;
        }

        .$errors_container_class h3 {
            font-size: 16px;
            font-weight: bold;            
        }
    |j}

    let view
        (editing: 'result Model.ParsedTextEditing.t) 
        ~result_button_caption 
        ~message_of_result
        ~placeholder_text =
        let parse_error_result_view errors = 
            let parse_error_view (err: ParserM.parse_error) =
                li [] 
                [ label [] [err.location |> ParserM.string_of_location |> Printf.sprintf "At %s" |> text]
                ; label [] [err.expecting |> Printf.sprintf "; Expecting %s" |> text]
                ; label [] [err.actual |> Printf.sprintf "; Got %s" |> text]
                ] in
            match List.sort ParserM.parse_error_compare errors with
            | [] ->
                Tea.Html.noNode
            | first_error::rest_of_errors ->
                let errors' = first_error::(rest_of_errors |> List.filter (fun err -> (ParserM.parse_error_compare err first_error) <= 0)) in
                div [ class' errors_container_class ]
                    [ h3 [] [text "Parse Messages"]
                    ; ul [] (errors' |> List.map parse_error_view)
                    ] 
        in
        div [] 
            [ textarea
                [ onInput Message.updateText
                ; class' language_editing_class
                ; placeholder placeholder_text
                ; value editing.text                
                ; (match editing.parse_result with
                    | Tea.Result.Ok {result} ->
                        TeaHtmlEx.Keydown.keydown (fun keydown_info  ->
                            if keydown_info.keyCode = 13 && keydown_info.ctrlKey
                            then Tea.Json.Decoder.succeed (message_of_result result)
                            else Tea.Json.Decoder.fail "Expecting Ctrl-Enter"
                        )
                    | _ ->
                        Tea.Html.noProp
                )
                ]
                []                 
            ; (match editing.parse_result with
                | Tea.Result.Ok _ ->
                    div [] [result_button_caption |> Printf.sprintf "(ctrl+enter to %s)" |> text]
                | _ ->
                    Tea.Html.noNode
            )
            ; (
                match editing.parse_result with
                | Tea.Result.Ok {result} ->
                    CommandView.button result_button_caption (message_of_result result)
                | Tea.Result.Error error_result ->
                    parse_error_result_view error_result
            )
            ]
end

module RulesPanelView = struct

    let style = ""

    let view (model: Model.t) =
        let rules = RuleDatabase.all_rules model.rule_database in
        let rules_view rules_applied = 
            div []
                (rules |> List.map (RuleView.view rules_applied)) in
        PanelView.view
            ~header: "Rules"
            [ match model.interaction_mode with
                | AddingRule adding ->
                    div []
                        [ ParsedTextEditingView.view adding 
                            ~result_button_caption: "Add Rule" 
                            ~message_of_result: Message.addRule
                            ~placeholder_text: "New rule..."
                        ; CommandView.button "Cancel and Query" Message.SwitchToEditQuery
                        ; rules_view []
                        ]
                | EditingQuery _ ->
                    rules_view []
                | ExecutingQuery { solution_stream } -> 
                    rules_view (
                        match solution_stream with
                        | LazyStream.EndOfStream ->
                            []
                        | LazyStream.LCons ({ rules_applied }, _) ->
                            rules_applied
                    )            
            ]

end

(* A panel displayed on the right side of the screen which presents query editing and execution. *)
module QueryPanelView = struct
    
    let style = ""

    let executing_query_view ({ initiating_query; solution_stream; displayed_solutions }: Model.ExecutingQueryInfo.t) =
        let solution_view (solution: Language.Evaluator.solution) = 
            match (Frame.to_strings initiating_query solution.frame) with
            | [] ->
                h3 [] [text "Satisfied"]
            | bindings ->
                div []
                    [ h3 [] [text "Satisfied:"]
                    ; ul [] (bindings |> List.map (fun txt -> li [] [text txt]))
                    ] in
        div [] 
            [ div [] (displayed_solutions |> List.map solution_view)
            ; (
                match solution_stream with
                | LazyStream.EndOfStream ->
                    CommandView.button "Another Query" Message.SwitchToEditQuery
                | LazyStream.LCons (current, _) ->
                    div []
                        [ solution_view current
                        ; CommandView.button "Next Frame" Message.NextFrame
                        ; CommandView.button "Cancel and New Query" Message.SwitchToEditQuery
                        ; CommandView.button "Cancel and Add Rule" Message.SwitchToAddRule
                        ]
            )
            ] 

    (* A panel displayed on the right side of the screen which presents query editing and execution. *)
    let view (model: Model.t) =
        PanelView.view 
            ~header: "Query"
            [ (
                match model.interaction_mode with
                | EditingQuery editing_query ->
                    div []
                        [ ParsedTextEditingView.view editing_query 
                            ~result_button_caption: "Execute Query" 
                            ~message_of_result: Message.executeQuery
                            ~placeholder_text: "New query..."
                        ; CommandView.button "Cancel and Add Rule" Message.SwitchToAddRule
                        ]
                | ExecutingQuery executing_query ->
                    executing_query_view executing_query
                | _ -> Tea.Html.noNode
            )
            ]
end

let style = 
    [ ContainersView.style
    ; CommandView.style
    ; PanelView.style
    ; RuleView.style
    ; ParsedTextEditingView.style
    ; RulesPanelView.style
    ; QueryPanelView.style
    ] 
    |> String.concat " "

let view (model: Model.t) =
    div
        []
        [ RulesPanelView.view model
        ; QueryPanelView.view model
        ]
