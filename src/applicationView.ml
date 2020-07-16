open Tea.Html
open Application
open Language.Types
open Utils

module ContainersView = struct

    let style = {j|
        html {
            height: 100%
        }

        select {
            font-size: 16px;
            color: #444;
            margin-left: 4px;
            margin-right: 16px;
            margin-bottom: 6px;
        }

        body {
            height: 100%;
            background-color: #eee;
            display: flex;
            flex-direction: column;
            font-family: sans-serif;
            padding: 0;
            margin: 0;
        }

        p {
            font-size: 14px;
        }

        h3 {
            margin-bottom: 3px;
        }
    |j}

end

module CommandView : sig 
        val style: string       
        val button: ?enabled: bool -> string -> 'a -> 'a Vdom.t
        val delete_button: 'a -> 'a Vdom.t
        val button_bar: 'a Vdom.t list -> 'a Vdom.t       
    end 
    = struct

    let button_bar_class = "button-bar"
    let delete_class = "delete"

    let delete_button msg =
        button 
            [ onClick msg
            ; class' delete_class
            ]
            [ text "X" ]

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
            cursor: pointer;
            box-shadow: 0 0 0 1px $blue_color;
            border: none;
            border-radius: 4px;
            padding: 6px;
            margin-right: 8px;
            font-size: 14px;
        }

        button.$delete_class {
            background-color: #f00;
            box-shadow: 0 0 2px 2px rgba(127,0,0,.5);
            font-weight: bold;
            color: #fff;
            padding-left: 8px;
            padding-right: 8px;
            border-radius: 4px;
            display: inline-block;
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

module PageView = struct

    let menu_class = "menu"

    let body_class = "body"

    let style =
        {j|
        .$menu_class {
            overflow: hidden;
            background-color: #333;
            position: fixed;
            height: 36px;
            width: 100%;
        }

        .$body_class {
            margin-top: 37px;
            height: calc(100% - 37px);
            height: -webkit-calc(100% - 37px);
        }

        .$menu_class a {
            float: left;
            color: white;
            text-align: center;
            padding: 10px 16px;
            text-decoration: none;
            font-size: 14px;
        }

        .$menu_class a:hover {
            background-color: #ddd;
            color: black;
        }
        
        |j}

    let page ~hyper_links ~body =
        div [ Tea.Html.style "height" "100%" ]
            [ div  
                [ class' menu_class ]                
                (
                    hyper_links
                    |> List.map (fun (msg, txt) ->
                        a [ Tea.Html.href msg; Tea.Html.target "_blank" ] [text txt] 
                    )
                )
            ; div 
                [ class' body_class ]
                [ body ]
            ]

end

module MainPanelView = struct

    let panels_class = "panels"
    let panel_class = "panel"
    let panel_header_class = "panel-header"
    let panel_body_class = "panel-body"

    let panel_view ~header body =
        div [ class' panel_class]
            [ div [ class' panel_header_class ] [text header] 
            ; div [ class' panel_body_class ] body
            ]

    let panels_container_view panels =
        div [ class' panels_class ]
            panels        

    let style = {j|
        div.$panels_class {
            height: 100%;
        }

        div.$panel_header_class {
            background-color: #248;
            color: white;
            font-weight: bold;
            padding: 4px;
            height: 18px;
        }   

        div.$panel_class {
            background-color: white;
            margin-top: 5px;
        }     
        

        @media screen and (max-width: 1023px) {
            div.$panel_class {
                float: left;
                width: 99%;
                margin-top: 10px;
                border: solid 1px #aaa;
            }
        }

        @media screen and (min-width: 1024px) {
            div.$panel_class {
                float: left;
                margin-left: 5px;
                margin-right: 5px;
                width: calc(50% - 15px);
                width: -webkit-calc(50% - 15px);
                height: 98%;
                border: solid 1px #aaa;
            }
        }

        div.$panel_body_class {
            padding: 6px;
            height: calc(100% - 40px);
            height: -webkit-calc(100% - 40px);            
            overflow-y: auto;            
        }
    |j}

end

module SectionView = struct

    let section_class = "section"

    let style = {j|

    |j}


    let view title content =
        div [ class' section_class ]
            [ h3 [] [text title] 
            ; hr [] []
            ; div [] content
            ]

end
    
module RuleView = struct

    let variable_class = "variable"
    let fact_name_class = "fact"
    let relation_name_class = "relation"
    let punctuation_class = "punctuation"
    
    let query_comment_class = "query-comment"
    let rule_application_count_class = "rule-application-count"
    let rule_application_count_visible_class = "rule-application-count-visible"
    let related_terms_list_class = "related-terms-list"
    let relation_class = "relation"
    let multi_line_relation_class = "multi-line-relation"
    let rule_item_class = "rule-item"
    let rule_used_class = "rule-used"
    let rule_display_class = "rule-display"

    let style = {j|
        .$variable_class {
            color: #ff0; 
            display: inline-block;
        }

        .$relation_class {
            display: inline-block;
            vertical-align: top;
        }

        .$multi_line_relation_class {
            border: solid 1px #346;
            padding: 2px;
            margin-bottom: 4px;
            margin-top: 2px;
            border-radius: 5px;
        }

        .$fact_name_class {
            color: #0f0;
            display: inline-block;
        }
        
        .$query_comment_class {
            color: #ccc;
            padding: 4px;
            margin-bottom: 8px;
        }

        .$relation_name_class {
            color: #6af;
            font-weight: bold;
            display: inline-block;
        }

        .$punctuation_class {
            color: white;
            font-weight: bold;
            vertical-align: top;
        }

        .$punctuation_class:last-child {
            vertical-align: bottom;
        }

        .$rule_display_class {
            background-color: black;
            font-family: Consolas, monospace;
            padding: 4px;
        }

        .$rule_item_class {
            color: black;
            background-color: black;

            display: flex;
            align-items: center;            

            border-radius: 6px;
            padding: 6px;
            box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);

            margin-bottom: 12px;
            font-size: 14px;
        }

        .$rule_item_class.$rule_used_class {
            box-shadow: 0 0 2px 4px #f44;
        }

        .$rule_application_count_class {
            display: inline-block;
            visibility: hidden;
            padding-left: 6px;
            padding-right: 6px;
            padding-top: 2px;
            padding-bottom: 2px;
            border-radius: 9px;
            border: solid 1px #884;
            color: black;
            background-color: #ff8;
            font-weight: bold;
            font-size: 16px;
        }

        .$rule_application_count_class.$rule_application_count_visible_class {
            visibility: visible;
        }

        .$rule_display_class ul.$related_terms_list_class {
            padding-left: 20px;
        }

        ul {
            list-style: none;
            margin-block-start: 0;
            margin-block-end: 0;
        }
    |j}

    let punctuation_view str = span [class' punctuation_class] [text str]
    
    let rec term_view term = 
        let multi_line_relation name first_term rest_terms =
            span [ classList [(relation_class, true); (multi_line_relation_class, true)] ]
                [ span [class' relation_name_class] [text name]
                ; punctuation_view "("
                ; ul [ class' related_terms_list_class ]
                    (
                        (li [] [term_view first_term])
                        ::(
                            rest_terms 
                            |> List.map (fun term -> 
                                li []
                                    [ punctuation_view ", "
                                    ; term_view term                                            
                                    ] 
                            )              
                        )
                    )
                ; punctuation_view ")"
                ] in                      
        let single_line_relation name first_term rest_terms =
            span [ class' relation_class ] 
                [ span [class' relation_name_class] [text name]
                ; punctuation_view "("
                ; span [] [term_view first_term]
                ; span []
                    (
                        rest_terms 
                        |> List.map (fun term -> 
                            span []
                                [ punctuation_view ", "
                                ; term_view term                                            
                                ] 
                        )              
                        )
                ; punctuation_view ")"
                ] in                      
        
        match term with 
        | Term.Variable VariableName var ->
            span [class' variable_class] [var |> Printf.sprintf "?%s" |> text]
        | Term.Relation { relation_name = RelationName name; related_terms } ->
            match related_terms with
            | [] -> 
                span [class' fact_name_class] [text name]
            | [single_term] ->
                span [ class' relation_class ] 
                    [ span [class' relation_name_class] [text name]
                    ; punctuation_view "("
                    ; term_view single_term
                    ; punctuation_view ")"
                    ]

            | first::rest -> 
                let count_of_terms = related_terms |> List.map Language.Types.Term.count_sub_terms |> List.fold_left (+) 0 in
                (
                    if count_of_terms >= 4
                    then multi_line_relation 
                    else single_line_relation
                ) name first rest

    let complex_term_view = function
        | Language.Types.ComplexTerm.Term term -> 
            term_view term
        | Language.Types.ComplexTerm.EqualityAssertion (left, right) ->
            span [] 
                [ punctuation_view "<"
                ; term_view left
                ; punctuation_view "="
                ; term_view right
                ; punctuation_view ">"
                ]
        | Language.Types.ComplexTerm.InequalityAssert (left, right) ->
            span [] 
                [ punctuation_view "<"
                ; term_view left
                ; punctuation_view "/="
                ; term_view right
                ; punctuation_view ">"
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
                | [] -> punctuation_view "."
                | first::after_first ->
                    match after_first |> List.rev with
                    | [] -> 
                        ul []
                           [ li [] 
                                [ punctuation_view " when " 
                                ; complex_term_view first
                                ; punctuation_view "."
                                ]
                           ]
                    | last::everything_but_last ->
                        ul []
                           (List.concat 
                                [ [introduced_complex "when " first]
                                ; (everything_but_last |> List.rev |> List.map (introduced_complex "and "))
                                ; [
                                    li [] 
                                       [ punctuation_view "and "
                                       ; complex_term_view last
                                       ; punctuation_view "."
                                       ]
                                  ]
                                ]
                           )
            )
            ]    

    let query_display (complex_terms: Language.Types.ComplexTerm.t list) comment =
        div [class' rule_display_class]
            [ (if String.length comment > 0 then div [ class' query_comment_class ] [text comment] else noNode)
            ; ul []
                 (match complex_terms with
                    | [] -> []
                    | first_term::rest_terms ->
                        (li [] [complex_term_view first_term])
                        ::(
                            rest_terms
                            |> List.map (fun complex_term ->
                                li [] [punctuation_view "and "; complex_term_view complex_term]
                            )
                        )                    
                 )     
            ]

    let editable (rule_entry: RuleDatabase.rule_entry) =
        div [ classList [(rule_item_class, true); (rule_used_class, false)] ]
            [ CommandView.delete_button (Message.deleteRule rule_entry)                                
            ; rule_entry |> RuleDatabase.rule_from_entry |> (fun rule -> a [onClick (Message.initiateEditRule rule_entry)] [ rule_display rule ])
            ] 
    
    let readonly rule_entries_applied (rule_entry: RuleDatabase.rule_entry) =        
        let count = rule_entries_applied |> Utils.ListEx.count (fun applied -> RuleDatabase.is_same applied rule_entry) in
        let should_highlight = count > 0 in
        div [ classList [(rule_item_class, true); (rule_used_class, should_highlight)] ]
            [ span [classList [(rule_application_count_class, true); (rule_application_count_visible_class, count > 0)]] [Printf.sprintf "%d" count |> text] 
            ; rule_entry |> RuleDatabase.rule_from_entry |> rule_display 
            ]

end

module CompiledTextEditingView : 
    sig
        val style: string
        val view: 'result ApplicationModel.CompiledTextEditing.t 
            -> header: string
            -> result_button_caption: string
            -> message_of_result: ('result -> Application.Message.t)
            -> cancel_message: Application.Message.t
            -> placeholder_text: string  
            -> Application.Message.t Vdom.t 
    end =
    struct

    let language_editing_class = "language-editing"
    let errors_container_class = "errors-container"
    let editing_container_class = "editing-container"

    let style = {j|
        input {
            margin-left: 6px;
        }          
        
        .$language_editing_class {
            width: 96%;
            min-height: 92px;
            font-family: Consolas, monospace;
            background-color: black;
            white-space: nowrap;
            color: white;
        }

        .$editing_container_class {
            margin-bottom: 16px;
        }

        .$errors_container_class ul {
            padding-left: 20px;
            list-style: square;
        }

        .$errors_container_class {
            margin-bottom: 16px;
        }

        .$errors_container_class li {
            color: #800;
            font-size: 14px;
        }
    |j}

    let view
        (editing: 'result ApplicationModel.CompiledTextEditing.t) 
        ~header
        ~result_button_caption 
        ~message_of_result
        ~cancel_message
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
        match editing.compilation_result with
        | Tea.Result.Ok result ->
            let msg = message_of_result result in
            div [ class' editing_container_class ] 
                [ label [] [text header]
                ; textarea 
                    [ onInput Message.updateText
                    ; class' language_editing_class
                    ; Vdom.prop "spellcheck" "false"
                    ; placeholder placeholder_text
                    ; value editing.text
                    
                    ; TeaHtmlEx.Keydown.keydown 
                        ~key: editing.text 
                        ~msg: msg
                        ~keydown_predicate: (fun keydown_info  -> keydown_info.keyCode = 13 && keydown_info.ctrlKey)
                    ]
                    []                 
                ; div [] [result_button_caption |> Printf.sprintf "(ctrl+enter to %s)" |> text]
                ; CommandView.button_bar 
                    [ CommandView.button result_button_caption msg
                    ; CommandView.button "Cancel" cancel_message
                    ]            
                ]

        | Tea.Result.Error errors -> 
            div [ class' editing_container_class ] 
                [ label [] [text header]
                ; textarea
                    [ onInput Message.updateText
                    ; class' language_editing_class
                    ; placeholder placeholder_text
                    ; Vdom.prop "spellcheck" "false"
                    ; value editing.text                
                    ; Tea.Html.noProp                    
                    ]
                    []                 
                ; Tea.Html.noNode                
                ; CommandView.button_bar 
                    [ parse_error_result_view errors                    
                    ; CommandView.button "Cancel" cancel_message
                    ]            
                ]
end

module RulesPanelView = struct

    let style = ""

    let view (model: ApplicationModel.t) =
        let rules = RuleDatabase.all_rules model.rule_database in
        let readonly_rules_view rules_applied = 
            div [] (rules |> List.map (RuleView.readonly rules_applied)) in
        let editable_rules_view () = 
            div ~unique: "editable_rules"
                [] 
                [ p [] 
                    [text 
                        (match rules with
                        | [] -> "Click <Add Rule/Fact> to start adding rules to the database."
                        | _ -> "Click the rule text of any rule to edit/update that rule. Clicking X removes the rule from the database WITHOUT a prompt."
                        )
                    ]
                ; div [] (rules |> List.map RuleView.editable)
                ] in
        MainPanelView.panel_view
            ~header: "Rules and Facts"
            [ match model.interaction_mode with
                | ViewingRules ->
                    div ~unique: "viewing_rules"
                        []
                        [ CommandView.button_bar 
                            [ label [] [text "Chapter:"]
                            ; (
                                option' [ Attributes.selected (model.chapter_opt = None)] [text "(select chapter)"]
                                ::(model.available_chapters |> List.map (fun chapter -> option' [ Attributes.selected (model.chapter_opt = Some chapter)] [text chapter.name]))
                              )
                              |> select [ onChange (fun selection ->  
                                model.available_chapters |> List.find_opt (fun (chap: Documentation.chapter) -> chap.name = selection) |> Message.chooseChapter)]                                
                            ; CommandView.button "Add Rule / Fact" (Message.InitiateAddRule)
                            ; (match rules with 
                                | [] -> noNode (* Don't give the user the uption to Query until she has added some rules. *)
                                | _ -> CommandView.button "Query" (Message.InitiateEditQuery [])
                            )
                            ]
                        ; hr [] []
                        ; editable_rules_view ()
                        ]                    
                
                | EditingRule (rule_entry, editing) ->
                    div ~unique: "editing_rule"
                        [] 
                        [ CompiledTextEditingView.view editing 
                            ~header: "Editing Rule"
                            ~result_button_caption: "Update Rule" 
                            ~cancel_message: Message.ViewRules
                            ~message_of_result: (fun updated_rule ->
                                Message.editRuleEntry (RuleDatabase.update_rule_entry rule_entry updated_rule)
                            )
                            ~placeholder_text: "Edit rule..."
                        ; hr [] []
                        ; readonly_rules_view [rule_entry]
                        ]

                | AddingRule adding ->
                    div ~unique: "adding_rule"
                        []
                        [ CompiledTextEditingView.view adding 
                            ~header: "New Rule"
                            ~result_button_caption: "Add Rule" 
                            ~cancel_message: Message.ViewRules
                            ~message_of_result: Message.addRule
                            ~placeholder_text: "New rule..."
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
       
    let solution_frame_class = "solution-frame"
    let no_solution_class = "no-solution"
    let example_query_class = "example-query"

    let style = {j| 

    div.$example_query_class {
        border-radius: 3px;
        padding: 5px;
        margin-bottom: 6px;
        background-color: #444;
    }

    div.$no_solution_class {
        margin: 4px;
        padding: 6px;
        border-radius: 3px;
        border-color: #aaa;
        border-width: 1px;
        border-style: solid;
        background-color: #fcc;
    }

    div.$solution_frame_class {
        margin: 4px;
        padding: 4px;
        border-radius: 3px;
        border-color: #aaa;
        border-width: 1px;
        border-style: solid;
        background-color: #cfc;
    }

    div.$solution_frame_class > h3 {
        font-size: 16px;
        font-weight: bold;
        margin: 4px;
    }
    
    |j}

    let executing_query_view ({ initiating_query; solution_stream; displayed_solutions }: ApplicationModel.ExecutingQueryInfo.t) =
        let query_view () = 
            SectionView.view 
                "Query"
                [ RuleView.query_display initiating_query ""] in
        let solution_view (solution: Language.Evaluator.solution) = 
            let success_view title bindings =
                div [ class' solution_frame_class ]
                    [ h3 [] [title |> text]
                    ; ul [] (bindings |> List.map (fun txt -> li [] [text txt]))
                    ] in
            match solution.failed_at_depth with
            | None -> ( 
                match (Frame.to_strings initiating_query solution.frame) with
                | [] -> 
                    success_view "Satisfied Without Variable Sustitution" []
                | bindings ->
                    success_view "Satisfied With Variable Substitution(s)" bindings
            )
            | Some depth ->
                div [ class' no_solution_class ] 
                    [ depth 
                    |> Printf.sprintf {j|Gave up search at depth of %d. You could be missing a terminating base case in a recursive definition OR you may have simply asked a question whose solution requires more searching than is allowed by LitLog.|j} 
                    |> text] in
        div ~unique: "executing_query"
            [] 
            [ (
                match solution_stream with
                | LazyStream.EndOfStream ->
                    div ~unique: "end_of_stream" 
                        []
                        [ CommandView.button_bar
                            [ CommandView.button "New Query" (Message.InitiateEditQuery initiating_query)
                            ; CommandView.button "Manage Rules" (Message.ViewRules)
                            ; CommandView.button "Go to Next Chapter" Message.NextChapter
                            ]
                        ; query_view ()
                        ; (match displayed_solutions with
                            | [] -> div [ class' no_solution_class ] [text "No Solution"]
                            | _ -> noNode
                        )
                        ; SectionView.view "All Solutions Found" [label [] [ text "All of the solutions to the query have been found. Click New Query to keep experimenting in this chapter or <Next Chapter> to move on." ]]
                        ]
                | LazyStream.LCons (current, stream) -> (
                    let current_solution_view = 
                        SectionView.view "Current Solution" 
                                [ label [] [text "OBSERVE: All rules and facts applied in the discovery of the current solution are highlighted in the Rules and Facts panel with a count of the number of times the Rule/Fact was applied in the discovery of the solution."]
                                ; solution_view current 
                                ] in
                    match Lazy.force stream with
                    | LazyStream.EndOfStream -> 
                        div ~unique: "end_of_stream_with_current" 
                            []
                            [ CommandView.button_bar
                                [ CommandView.button "New Query" (Message.InitiateEditQuery initiating_query)
                                ; CommandView.button "Manage Rules" (Message.ViewRules)
                                ; CommandView.button "Go to Next Chapter" Message.NextChapter
                                ]
                            ; query_view ()
                            ; current_solution_view
                            ; SectionView.view "All Solutions Found" [label [] [ text "All of the solutions to the query have been found. Click New Query to keep experimenting in this chapter or <Next Chapter> to move on." ]]
                            ]
                    | LazyStream.LCons (_next, _) ->
                        div ~unique: "solutions_remaining"
                            []
                            [ CommandView.button_bar 
                                [ CommandView.button "Next Solution" Message.NextFrame
                                ; CommandView.button "New Query" (Message.InitiateEditQuery initiating_query)
                                ; CommandView.button "Cancel Querying" Message.ViewRules
                                ; CommandView.button "Cancel Querying and Go to Next Chapter" Message.NextChapter
                                ]
                            ; query_view ()
                            ; current_solution_view
                            ]
                )
            )
            ; (
                match displayed_solutions with
                | [] -> noNode
                | _ -> 
                    let count = List.length displayed_solutions in
                    SectionView.view 
                        (Printf.sprintf "Prior Solutions (%d)" count) 
                        ((label [] [text "OBSERVE: Some solutions may appear more than once because there can be multiple paths to reach the same solution. LitLog does not remove duplicate solutions from the display in order to illustrate the paths / search process."])::(displayed_solutions |> List.map solution_view))
            )
            ] 

    let editing_query_view editing_query chapter_opt = 
        let query_list = match chapter_opt with
            | Some chapter -> Documentation.queries chapter
            | None -> [] in
        let choose_query_view (query, Documentation.Comment comment) = 
            div [ class' example_query_class 
                ; query |> Language.Types.Query.to_string |> Message.updateText |> onClick 
                ]
                [ RuleView.query_display query comment] in
        div ~unique: "editing_query"
            []
            [ CompiledTextEditingView.view editing_query 
                ~header: "Query"
                ~result_button_caption: "Execute Query" 
                ~message_of_result: Message.executeQuery
                ~placeholder_text: "New query..."
                ~cancel_message: Message.ViewRules
            ; (
                match query_list with
                | [] -> noNode
                | _ ->
                    div []
                        [ label [] [text "Example Queries. Click a query below to populate the query entry box with that query."]
                        ; div [] (query_list |> List.map choose_query_view)
                        ]
            )
            ]

    let instructions_view (parts: string list) = 
        let paragraph txt = Tea.Html.p [] [text txt] in
        div ~unique: "instructions"
            []
            (parts |> List.map paragraph)
            
    (* A panel displayed on the right side of the screen which presents query editing and execution. *)
    let view (model: ApplicationModel.t) =
        let query_panel header content = MainPanelView.panel_view ~header: header [content] in
        let instruction_parts = match model.chapter_opt with
            | Some chapter -> chapter.rule_instructions
            | None -> Documentation.overview in
        match model.interaction_mode with
        | EditingQuery editing_query ->
            query_panel "Query" (editing_query_view editing_query model.chapter_opt);
        | ExecutingQuery executing_query ->
            executing_query |> executing_query_view |> query_panel "Query";
        | _ -> (             
            instructions_view instruction_parts |> query_panel "Instructions"             
        )
end

let style = 
    [ ContainersView.style
    ; CommandView.style
    ; PageView.style
    ; MainPanelView.style
    ; SectionView.style
    ; RuleView.style
    ; CompiledTextEditingView.style
    ; RulesPanelView.style
    ; QueryPanelView.style
    ] 
    |> String.concat " "

let view (model: ApplicationModel.t) =
    PageView.page
        ~hyper_links: [                      
            ("https://jsuder-xx.github.io", "My Home Page")
            ; ("https://github.com/JSuder-xx/litlog", "On GitHub")
        ]
        ~body: (
            MainPanelView.panels_container_view
            [ RulesPanelView.view model
            ; QueryPanelView.view model       
            ]
        )
        