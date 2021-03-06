open Application

let main =
    let program = Tea.Navigation.navigationProgram
        (fun _location -> Message.viewRules)
        {
            init = (fun _ _ -> (Application.ApplicationModel.init (), Tea.Cmd.NoCmd))
            ; update  = update
            ; view = ApplicationView.view
            ; shutdown = (fun _ -> Tea.Cmd.none)
            ; subscriptions = (fun _ -> Tea.Sub.none)
        } in
    (fun web_node (_: unit) ->
        let style = JsInterop.document##createElement("style") in
        (
            JsInterop.document##head##appendChild(style) |> ignore;
            style##innerHTML #= ApplicationView.style
        ); 
        program web_node ()        
    )