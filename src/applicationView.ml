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
        val button_bar: 'a Vdom.t list -> 'a Vdom.t       
    end 
    = struct

    let button_bar_class = "button-bar"

    let button ?enabled:(enabled = true) title msg  =
        button
            [ onClick msg; Attributes.disabled (not enabled)]
            [ text title ]

    let button_bar buttons =
        div [class' button_bar_class] buttons

    let blue_color = "#48a9dc"

    let style = {j|

        .$button_bar_class {
            padding-top: 5px; 
            padding-bottom: 5px;
        }

        button {
            background-color: white;
            color: #555;
            box-shadow: 0 0 0 1px $blue_color;
            border: none;
            border-radius: 4px;
            padding: 6px;
            margin-right: 8px;
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
            color: black;
            background-color: white;

            border-radius: 6px;
            padding: 6px;
            box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);

            margin-bottom: 12px;
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

    let rule_display rule = 
        let { Rule.antecedents; consequent } = rule in
        let introduced_complex introducer term = 
            li [] 
                [ punctuation_view introducer
                ; complex_term_view term 
                ] in
        div [class' rule_display_class]
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

    let editable (rule_entry: RuleDatabase.rule_entry) =
        div [ classList [(rule_item_class, true)] ]
            [ CommandView.button_bar
                [ CommandView.button "Edit" (Message.initiateEditRule rule_entry)
                ; CommandView.button "Delete" (Message.deleteRule rule_entry)                
                ]
            ; rule_entry |> RuleDatabase.rule_from_entry |> rule_display
            ]
    
    let readonly rule_entries_applied (rule_entry: RuleDatabase.rule_entry) =        
        let should_highlight = rule_entries_applied |> List.exists (fun applied -> RuleDatabase.is_same applied rule_entry) in
        div [ classList [(rule_item_class, true); (rule_used_class, should_highlight)] ]
            [ rule_entry |> RuleDatabase.rule_from_entry |> rule_display ]

end

module CompiledTextEditingView = struct

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

        .$errors_container_class ul {
            padding-left: 20px;
            list-style: square;
        }

        .$errors_container_class li {
            color: #800;
            font-size: 14px;
        }
    |j}

    let view
        (editing: 'result ApplicationModel.CompiledTextEditing.t) 
        ~result_button_caption 
        ~message_of_result
        ~placeholder_text =
        let parse_error_result_view = function
            | [] ->
                Tea.Html.noNode
            | errors  ->            
                div [ class' errors_container_class ]
                    [ 
                    ul [] (errors |> List.map (fun err -> li [] [text err]))
                    ] 
        in
        div [] 
            [ textarea
                [ onInput Message.updateText
                ; class' language_editing_class
                ; placeholder placeholder_text
                ; value editing.text                
                ; (match editing.compilation_result with
                    | Tea.Result.Ok result ->
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
            ; (match editing.compilation_result with
                | Tea.Result.Ok _ ->
                    div [] [result_button_caption |> Printf.sprintf "(ctrl+enter to %s)" |> text]
                | _ ->
                    Tea.Html.noNode
            )
            ; (
                match editing.compilation_result with
                | Tea.Result.Ok result ->
                    CommandView.button result_button_caption (message_of_result result)
                | Tea.Result.Error errors ->
                    parse_error_result_view errors
            )
            ]
end

module RulesPanelView = struct

    let style = ""

    let view (model: ApplicationModel.t) =
        let rules = RuleDatabase.all_rules model.rule_database in
        let readonly_rules_view rules_applied = 
            div [] (rules |> List.map (RuleView.readonly rules_applied)) in
        let editable_rules_view () = 
            div [] (rules |> List.map RuleView.editable) in
        PanelView.view
            ~header: "Rules"
            [ match model.interaction_mode with
                | ViewingRules ->
                    (** Next actions for Add Rule and Query *)
                    div []
                        [ CommandView.button_bar 
                            [ CommandView.button "Add Rule" (Message.InitiateAddRule)
                            ; CommandView.button "Query" (Message.InitiateEditQuery)
                            ]
                        ; hr [] []
                        ; editable_rules_view ()
                        ]
                    

                | EditingRule (rule_entry, editing) ->
                    div [] 
                        [ CompiledTextEditingView.view editing 
                            ~result_button_caption: "Update Rule" 
                            ~message_of_result: (fun updated_rule ->
                                Message.editRuleEntry (RuleDatabase.update_rule_entry rule_entry updated_rule)
                            )
                            ~placeholder_text: "Edit rule..."
                        ; CommandView.button_bar [ CommandView.button "Cancel Edit" Message.ViewRules ]
                        ; hr [] []
                        ; readonly_rules_view []
                        ]

                | AddingRule adding ->
                    div []
                        [ CompiledTextEditingView.view adding 
                            ~result_button_caption: "Add Rule" 
                            ~message_of_result: Message.addRule
                            ~placeholder_text: "New rule..."
                        ; CommandView.button_bar [ CommandView.button "Cancel Add" Message.ViewRules ]
                        ; hr [] []
                        ; readonly_rules_view []
                        ]

                | EditingQuery _ ->
                    readonly_rules_view []

                | ExecutingQuery { solution_stream } -> 
                    readonly_rules_view (
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

    let executing_query_view ({ initiating_query; solution_stream; displayed_solutions }: ApplicationModel.ExecutingQueryInfo.t) =
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
                    CommandView.button "Another Query" Message.InitiateEditQuery
                | LazyStream.LCons (current, _) ->
                    div []
                        [ solution_view current
                        ; CommandView.button "Next Frame" Message.NextFrame
                        ; CommandView.button "New Query" Message.InitiateEditQuery
                        ; CommandView.button "Cancel" Message.ViewRules
                        ]
            )
            ] 

    let editing_query_view editing_query = 
        div []
            [ CompiledTextEditingView.view editing_query 
                ~result_button_caption: "Execute Query" 
                ~message_of_result: Message.executeQuery
                ~placeholder_text: "New query..."
            ; CommandView.button "Cancel" Message.ViewRules
            ]

    (* A panel displayed on the right side of the screen which presents query editing and execution. *)
    let view (model: ApplicationModel.t) =
        let panel content = PanelView.view ~header: "Query" [content] in
        match model.interaction_mode with
        | EditingQuery editing_query ->
            editing_query |> editing_query_view |> panel
        | ExecutingQuery executing_query ->
            executing_query |> executing_query_view |> panel
        | _ ->
            Tea.Html.noNode
            
end

let style = 
    [ ContainersView.style
    ; CommandView.style
    ; PanelView.style
    ; RuleView.style
    ; CompiledTextEditingView.style
    ; RulesPanelView.style
    ; QueryPanelView.style
    ] 
    |> String.concat " "

let view (model: ApplicationModel.t) =
    div
        []
        [ RulesPanelView.view model
        ; QueryPanelView.view model
        ]
