open Tea.Html
open Application
open Language.Types
open Utils

module ContainersView = struct

    let style = {j|
        html {
            height: 100%
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
            height: 98%;
        }

        div.$panel_header_class {
            background-color: #248;
            color: white;
            font-weight: bold;
            padding: 4px;
        }   

        div.$panel_class {
            overflow-y: auto;
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
                width: 48%;
                height: 98%;
                border: solid 1px #aaa;
            }
        }

        div.$panel_body_class {
            padding: 6px;
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
    
    let rule_item_class = "rule-item"
    let rule_used_class = "rule-used"
    let rule_display_class = "rule-display"

    let style = {j|
        .$variable_class {
            color: #ff0; 
            display: inline-block;
        }

        .$fact_name_class {
            color: #0f0;
            display: inline-block;
        }
        
        .$relation_name_class {
            color: #6af;
            font-weight: bold;
            display: inline-block;
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
            background-color: black;

            display: flex;
            align-items: center;            

            border-radius: 6px;
            padding: 6px;
            box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);

            margin-bottom: 12px;
        }

        .$rule_item_class.$rule_used_class {
            box-shadow: 0 0 2px 4px #f44;
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
            span [class' variable_class] [var |> Printf.sprintf "?%s" |> text]
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
                | [] -> punctuation_view "."
                | first::after_first ->
                    match after_first |> List.rev with
                    | [] -> 
                        span []
                            [ punctuation_view " when " 
                            ; complex_term_view first
                            ; punctuation_view "."
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

    let query_display (complex_terms: Language.Types.ComplexTerm.t list) =
        div [class' rule_display_class]
            [ ul []
                 (
                     complex_terms
                    |> List.map (fun complex_term ->
                        li [] [complex_term_view complex_term]
                    )
                 )     
            ]

    let editable (rule_entry: RuleDatabase.rule_entry) =
        div [ classList [(rule_item_class, true); (rule_used_class, false)] ]
            [ CommandView.delete_button (Message.deleteRule rule_entry)                                
            ; rule_entry |> RuleDatabase.rule_from_entry |> (fun rule -> a [onClick (Message.initiateEditRule rule_entry)] [ rule_display rule ])
            ] 
    
    let readonly rule_entries_applied (rule_entry: RuleDatabase.rule_entry) =        
        let should_highlight = rule_entries_applied |> List.exists (fun applied -> RuleDatabase.is_same applied rule_entry) in
        div [ classList [(rule_item_class, true); (rule_used_class, should_highlight)] ]
            [ rule_entry |> RuleDatabase.rule_from_entry |> rule_display ]

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
            font-family: Consolas, monospace;
            background-color: black;
            color: white;
        }

        .$errors_container_class ul {
            padding-left: 20px;
            list-style: square;
        }

        .$editing_container_class {
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
        let header = match model.interaction_mode with
                | ChoosingExample _ -> "Select an Example"
                | _ -> "Rules and Facts" in
        MainPanelView.panel_view
            ~header: header
            [ match model.interaction_mode with
                | ViewingRules ->
                    div ~unique: "viewing_rules"
                        []
                        [ CommandView.button_bar 
                            [ CommandView.button "Add Rule / Fact" (Message.InitiateAddRule)
                            ; (match rules with 
                                | [] -> noNode (* Don't give the user the uption to Query until she has added some rules. *)
                                | _ -> CommandView.button "Query" (Message.InitiateEditQuery [])
                            )
                            ; CommandView.button "Select Example" (Message.InitiateChooseExample)
                            ]
                        ; hr [] []
                        ; editable_rules_view ()
                        ]                    
                
                | ChoosingExample examples ->
                    let example_button (example: Example.t) = CommandView.button example.name (Message.ChooseExample example) in
                    div ~unique: "choosing_example"
                        [] [ p [] [text "Select an example to load rules and example queries"]
                        ; examples |> List.map example_button |> CommandView.button_bar 
                        ; CommandView.button "Cancel" Message.ViewRules
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
                [ RuleView.query_display initiating_query ] in
        let solution_view (solution: Language.Evaluator.solution) = 
            match (Frame.to_strings initiating_query solution.frame) with
            | [] -> 
                div [ class' solution_frame_class ]
                    [ h3 [] [text "Satisfied Without Variable Sustitution"]
                    ; ul [] []
                    ] 
            | bindings -> 
                div [ class' solution_frame_class ]
                    [ h3 [] [text "Satisfied With Variable Substitution(s)"]
                    ; ul [] (bindings |> List.map (fun txt -> li [] [text txt]))
                    ] in
        div ~unique: "executing_query"
            [] 
            (* 
            when displayed solutions is empty and end of stream then display a special message indicating no solution found.
            *)
            [ (
                match solution_stream with
                | LazyStream.EndOfStream ->
                    div ~unique: "end_of_stream" 
                        []
                        [ CommandView.button_bar
                            [ CommandView.button "New Query" (Message.InitiateEditQuery initiating_query)
                            ; CommandView.button "Manage Rules" (Message.ViewRules)
                            ]
                        ; query_view ()
                        ; SectionView.view "All Solutions Found" [label [] [ text "All of the solutions to the query have been found." ]]
                        ; (match displayed_solutions with
                            | [] -> div [ class' no_solution_class ] [text "No Solution"]
                            | _ -> noNode
                        )
                        ]
                | LazyStream.LCons (current, _) ->
                    div ~unique: "solutions_remaining"
                        []
                        [ CommandView.button_bar 
                            [ CommandView.button "Next Solution" Message.NextFrame
                            ; CommandView.button "New Query" (Message.InitiateEditQuery initiating_query)
                            ; CommandView.button "Cancel" Message.ViewRules
                            ]
                        ; query_view ()
                        ; SectionView.view "Current Solution" 
                            [ label [] [text "OBSERVE: All rules and facts applied in the discovery of the current solution are highlighted in the Rules and Facts panel."]
                            ; solution_view current 
                            ]
                        ]
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

    let editing_query_view editing_query query_list = 
        let choose_query_view query = 
            div [ class' example_query_class 
                ; query |> Language.Types.Query.to_string |> Message.updateText |> onClick 
                ]
                [ RuleView.query_display query ] in
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

    let instructions_view () = 
        let paragraph txt = Tea.Html.p [] [text txt] in
        let relation fact_name relations = Term.make_relation fact_name relations in
        let variable name = Term.Variable (VariableName name) in
        let fact fact_name = relation fact_name [] in
        let rule consequent antecedent_terms = 
            { Language.Types.Rule.consequent; antecedents = antecedent_terms |> List.map (fun term -> Language.Types.ComplexTerm.Term term) } in
        let fact_view consequent = RuleView.rule_display { Language.Types.Rule.consequent; antecedents = [] } in
        div ~unique: "instructions"
            []
            [ paragraph {j|LitLog, short for Literate Logic programming, is a subset of Prolog with a simpler syntax and an on-line editor. 
                The goal of LitLog is to offer a path to quickly learning the basics of declarative logic programming in three lunch breaks or less.|j}
            ; paragraph {j|When Logic Programming fits the problem space, it beats other programming paradigms by orders of magnitude so it is a helpful tool to
            have in your mental toolbox (even if an applicable problem may only arise once in a decade). It is also just neat and that alone is worth a few lunch periods.|j}
            ; paragraph "The act of declarative logic programming is building a knowledge database that can be queried. It is the query powers that are surprising and interesting."
            ; paragraph "Rules & Facts are the two forms of knowledge representation."
            ; paragraph {j|FACTs are unconditionally true statements. As soon as a fact is entered into the database it is known to be true. 
            A Fact can relate other terms together or it can stand on its own. An example of a Fact that stands on its own without any relationships might be|j}
            ; fact_view (fact "OrangesAreSpherical")
            ; paragraph {j|A Fact is represented as an identifier written in any case. Spaces cannot be used inside Fact names but underscores can be. The above fact could have also been written|j}
            ; fact_view (fact "oranges_are_spherical")
            ; paragraph {j|Facts can also express the truth of a _relationship_ between things. A Fact that expresses a relationship with a single term can be viewed as a declaration of 
            inclusion in a Set (a Predicate). For example, the Fact above could be represented, more usefully, as|j}
            ; fact_view (relation "Spherical" [fact "Oranges"])
            ; paragraph {j|The form above now expresses that Oranges are in the set of spherical things. The knowledge database could list other spherical things|j}
            ; fact_view (relation "Spherical" [fact "SoccerBalls"])
            ; fact_view (relation "Spherical" [fact "BasketBalls"])
            ; paragraph "Facts can express relationships between multiple things. For example, a fact which expresses a Mother-Child relationship between Sally and Bob"
            ; fact_view (relation "MotherOf" [fact "Sally"; fact "Bob"])
            ; paragraph "Another example might be a relation named 'SumOf' that expresses that two and two relate to four "
            ; fact_view (relation "SumOf" [fact "Two"; fact "Two"; fact "Four"])
            ; paragraph {j|While Facts are uncondtionally true, a RULE specifies a _conclusion_ whose truth is dependent upon one or more conditions. For example, we might instruct the logic database that 
            Sally being the Mother of Bob also means that Sally is a Parent of Bob.|j}
            ; RuleView.rule_display (rule 
                (relation "ParentOf" [fact "Sally"; fact "Bob"]) 
                [ relation "MotherOf" [fact "Sally"; fact "Bob"] ]
            )                
            ; paragraph {j|Observe that the rule above is unfortunately specific. It is not a general statement about all mothers and sons but rather a specific statement about two specific individuals.
            In order to get the power of generalization (abstraction) we need to introduce variables.|j}
            ; paragraph {j|Variables are written with a ? prefix. To make a general statement about all mothers also being parents we would write|j}
            ; RuleView.rule_display (rule 
                (relation "ParentOf" [variable "Mother"; variable "Child"]) 
                [ relation "MotherOf" [variable "Mother"; variable "Child"] ]
            )
            ; paragraph {j|Rules can state multiple conditions that must be true for the rule to be true. To encode the transitive property of the GreaterThan relationship we might write|j}
            ; RuleView.rule_display (rule 
                (relation "GreaterThan" [variable "A"; variable "C"]) 
                [ relation "GreaterThan" [variable "A"; variable "B"] 
                ; relation "GreaterThan" [variable "B"; variable "C"] 
                ]
            )
            ; paragraph {j|Facts, Rules, and Variables are nearly the extent of how knowledge is represented in LitLog. Now we turn to the truly fun part QUERIES!!!
            |j}
            ]       
            
    (* A panel displayed on the right side of the screen which presents query editing and execution. *)
    let view (model: ApplicationModel.t) =
        let query_panel header content = MainPanelView.panel_view ~header: header [content] in
        match model.interaction_mode with
        | EditingQuery editing_query ->
            query_panel "Query" (editing_query_view editing_query model.example_queries);
        | ExecutingQuery executing_query ->
            executing_query |> executing_query_view |> query_panel "Query";
        | _ ->             
            instructions_view () |> query_panel "Instructions"             

end

let style = 
    [ ContainersView.style
    ; CommandView.style
    ; MainPanelView.style
    ; SectionView.style
    ; RuleView.style
    ; CompiledTextEditingView.style
    ; RulesPanelView.style
    ; QueryPanelView.style
    ] 
    |> String.concat " "

let view (model: ApplicationModel.t) =
    MainPanelView.panels_container_view
        [ RulesPanelView.view model
        ; QueryPanelView.view model       
        ]