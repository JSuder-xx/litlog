module Func = struct

    let compose f g x = x |> f |> g
    let (>>) = compose

end

module ListEx = struct
    (* take n from a list, if the list has fewer than n that is OK *)
    let take (n: int) (lst: 'a list) =
        let rec recur acc list_remaining num_remaining =
            if num_remaining = 0
            then (acc, list_remaining)
            else 
                (
                    match list_remaining with
                    | [] -> (acc, [])
                    | head::remaining ->
                        recur (head::acc) remaining (num_remaining - 1)
                ) in
        let (up_to, remaining) = (recur [] lst n) in
        (up_to |> List.rev, remaining)

    let apply v fn = fn v

    let bind lst fn = lst |> List.map fn |> List.concat

    let concat_map fn lst = bind lst fn

    let (>>=) = bind

    let list_from_option = function
    | None -> []
    | Some item -> [item]

    (** Given a list and a key selector, returns the first pair of entries that are unequal if any are found otherwise None. *)
    let first_inconsistent_opt lst fn =
        let rec aux last = function
        | [] -> None
        | head::rest ->
            let current = fn head in
            if current = last
            then aux current rest
            else Some (last, current) in
        match lst with
        | [] -> None
        | head::rest -> aux (fn head) rest


end

module AggregateMap(Ord: Map.OrderedType) = struct

    module Map = Map.Make(Ord)   

    let make (key_of: 'a -> Ord.t) (lst: 'a list)  =
        let add_to_list item = function
            | None -> Some [item]
            | Some existing -> Some (item::existing) in
        lst 
        |> List.fold_left
            (fun map item -> 
                Map.update (key_of item) (add_to_list item) map
            )
            Map.empty 
    
    (** the keys for the aggregated map *)
    let keys map = Map.bindings map |> List.map fst

    let find_opt key map = Map.find_opt key map 

end

module TeaHtmlEx = struct

    (** 
    Custom version of "on" which takes a key in order to ensure that eventhandlers are
    properly merged on updates. Without a key, event handlers on text inputs were not 
    getting updated. 
    CONTACT LIBRARY AUTHOR or submit a PR.
    *)
    let on_keyed ~eventName ~key ~decoder = 
        Tea.Html.onCB eventName key (fun event ->
            if Tea.Html.defaultOptions.stopPropagation then event##stopPropagation () |> ignore;
            if Tea.Html.defaultOptions.preventDefault then event##preventDefault () |> ignore;
            event
            |> Tea_json.Decoder.decodeEvent decoder
            |> Tea_result.result_to_option
        )

    module Keydown = struct
        type keydown_info = 
            { ctrlKey: bool
            ; keyCode: int
            }
        
        let keydown ~key ~msg ~keydown_predicate = 
            let decode_keydown_info = 
                let ctrlKey = Tea_json.Decoder.field "ctrlKey" Tea_json.Decoder.bool in
                Tea.Json.Decoder.map2 (fun keyCode ctrlKey -> { keyCode; ctrlKey }) Tea.Html.keyCode ctrlKey in
            let keydown_to_message info = 
                if keydown_predicate info
                then Tea.Json.Decoder.succeed msg                
                else Tea.Json.Decoder.fail "Incorrect keys" in
            on_keyed 
                ~eventName: "keydown" 
                ~key: key
                ~decoder: (Tea.Json.Decoder.andThen keydown_to_message decode_keydown_info)
    end

end

module ResultEx = struct

    let map fn = function
    | Tea.Result.Error _ as ret -> ret
    | Tea.Result.Ok v -> Tea.Result.Ok (fn v)

    let map_error fn = function
    | Tea.Result.Error err -> Tea.Result.Error (fn err)
    | Tea.Result.Ok _ as ret -> ret

    let flatten = function
    | Tea.Result.Error _ as ret -> ret
    | Tea.Result.Ok outer -> outer

    let flat_map fn result = result |> map fn |> flatten

    let bind result fn = flat_map fn result

    let (>>=) = bind

end

module LazyStream = struct

    type 'a t =
        | EndOfStream
        | LCons of 'a * 'a t Lazy.t

    let return v = LCons(v, lazy EndOfStream)
    let unit = return

    let push (value: 'a) (stream: 'a t) : 'a t =
        LCons (value, lazy stream)

    let rec map fn = function
        | EndOfStream ->
            EndOfStream
        | LCons (value, delayed_stream) ->
            LCons (
                fn value
                , lazy (delayed_stream |> Lazy.force |> map fn)
            )

    let rec filter pred = function
        | EndOfStream ->
            EndOfStream
        | LCons (value, delayed_stream) ->
            if pred value
            then 
                LCons (
                    value
                    , lazy (delayed_stream |> Lazy.force |> filter pred)
                )
            else
                delayed_stream |> Lazy.force |> filter pred 

    let rec interleave_delayed s1 delayed_s2 =
        match s1 with
        | EndOfStream ->
            Lazy.force delayed_s2
        | LCons (head_s1, delayed_tail_s1) ->
            LCons (
                head_s1,
                lazy (
                    interleave_delayed 
                        (Lazy.force delayed_s2) 
                        (delayed_tail_s1)
                )
            )

    let rec append_delayed s1 delayed_s2 =
        match s1 with
        | EndOfStream ->
            Lazy.force delayed_s2
        | LCons (head_s1, delayed_tail_s1) ->
            LCons (
                head_s1,
                lazy (
                    append_delayed
                        (Lazy.force delayed_tail_s1)
                        delayed_s2
                )
            )

    let rec flatten = function
        | EndOfStream ->
            EndOfStream
        | LCons (value, delayed_stream) ->
            interleave_delayed value (lazy (delayed_stream |> Lazy.force |> flatten))

    let bind (stream: 'original t) (fn: 'original -> 'transformed t) = 
        stream 
        |> map fn
        |> flatten

    let (>>=) = bind

    let rec from_list = function
        | [] -> EndOfStream
        | car::cdr ->
            LCons (car, lazy (from_list cdr))

    let from_option = function
        | None -> EndOfStream
        | Some v -> return v

end

module StateM = struct

    type ('state, 'result) state_computation_result = 
        {
            state: 'state;
            result: 'result;
        }
    type ('state, 'result) state_function = 'state -> ('state, 'result) state_computation_result
    type ('state, 'result) t = StateM of ('state, 'result) state_function

    let run (StateM f) s = f s

    let (>>=) (StateM state_function: ('state, 'original_result) t) (produce_new_state: 'original_result -> ('state, 'new_result) t) : ('state, 'new_result) t =
        StateM (
            fun (original_state: 'state) ->
            let {result; state} = state_function original_state in 
            let (StateM new_state_function) = produce_new_state result in
            new_state_function state
        )

    let return (result: 'result) : ('state, 'result) t = StateM (fun state -> { result; state })

    let map (fn: 'original_result -> 'new_result) state =
        state
        >>= fun result -> return (fn result)

    let void () = StateM (fun state -> { result = (); state })

    let read_state  = StateM (fun (state: 'state) -> { result = state; state })

    let write_state state : ('state, unit) t = StateM (fun _ -> { result = (); state })

    let execute (StateM state_function) (initial_state: 'state) : 'result =
        let {result} = state_function initial_state in
        result

    (** Turn a list of states into a state that produces a list of the given results. *)
    let sequence (states: ('state, 'result) t list) =
        let rec aux (states_remaining: ('state, 'result) t list) (results_accumulator: 'result list) =
            match states_remaining with
            | [] -> return (results_accumulator |> List.rev)
            | head_state :: states_remaining' ->
                head_state
                >>= fun result -> aux states_remaining' (result::results_accumulator)                   
        in
        aux states []

    let repeat (num_times: int) (state_monad: ('state, 'result) t) =
        let rec aux times_remaining acc =
            if times_remaining = 0
            then return acc 
            else state_monad >>= fun result -> aux (times_remaining - 1) (result::acc) in
        aux num_times []
end
