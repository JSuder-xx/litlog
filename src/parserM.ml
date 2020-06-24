let string_of_chars char_list = 
    String.concat 
        "" 
        (List.map (String.make 1) char_list)

let chars_of_string (s: string) : char list =
    let len = String.length s in
    let read = String.get s in
    let rec build acc index = 
    if index = len
    then acc
    else build ((read index)::acc) (index + 1) in
    (build [] 0) |> List.rev 

type location =
    { column: int
    ; line: int
    }

let location_compare (left: location) (right: location) = 
    if left.line = right.line
    then compare right.column left.column
    else compare right.line left.line

let string_of_location { column; line } =
    Printf.sprintf "Ln %d, Col %d" line column

type parse_error = 
    { expecting: string
    ; actual: string
    ; location: location 
    }

let parse_error_compare left right =
    location_compare left.location right.location

let string_of_parse_error { expecting; location; actual } =
    Printf.sprintf "At %s; Expecting %s but actual %s" (string_of_location location) expecting actual

type 'value parse_success = 
    { result: 'value
    ; location: location
    ; remaining_chars: char list
    }

let result_of_parse_success ({ result }: 'a parse_success): 'a = result 

type 'value parse_result = ('value parse_success, parse_error list) Tea.Result.t

type parse_input = 
    { location: location
    ; input_chars: char list
    }

type 'value t = parse_input -> 'value parse_result

(* -------- *)
(* Category *)
(* -------- *)

(** Monad bind operator. *)
let bind (original_parser: 'original t) (new_parser: ('original -> 'next t)) (input: parse_input)  =    
    match original_parser input with
    | Ok success -> 
        (new_parser success.result) { input_chars = success.remaining_chars; location = success.location }
    | Error err ->         
        Error err

(** Monad bind operator. *)
let (>>=) = bind

let bind_with  
    ~parser: (original_parser: 'original t) 
    ~next_parser: (next_parser: ('original -> 'next t)) 
    ~failure_return: (failure_return: 'next) 
    : 'next t
    =    
    (fun input ->
        match original_parser input with
        | Ok success -> 
            (next_parser success.result) { input_chars = success.remaining_chars; location = success.location }
        | Error _ ->         
            Ok 
                { result = failure_return
                ; location = input.location
                ; remaining_chars = input.input_chars
                }                                                           
    )

(** A parser that always succeeds with a constant value. This is Monad.return *)
let succeed_with (result: 'constant) : 'constant t =
    fun (input: parse_input) -> 
        Ok 
            { result
            ; remaining_chars = input.input_chars
            ; location = input.location
            }

(** A parser that always succeeds with a constant value. This is Monad.return *)
let return = succeed_with

(** A parser that always fails. Monad.mzero. *)
let fail err_list : 'value t = fun _ -> 
    Error err_list

let concatenate_error_messages (new_message: (string -> string)) (parser: 'a t) : 'a t =
    fun (input: parse_input) ->
        match parser input with
        | Error err_list -> (
            match err_list with
            | [] -> Error [
                { expecting = (new_message "") 
                ; actual = "No input"
                ; location = input.location 
                }
                ]
            | head::_ as errs ->
                let messages = errs |> List.map (fun err -> err.expecting) |> String.concat " OR " in
                Error [
                    { expecting = (new_message messages)
                    ; actual = head.actual
                    ; location = input.location 
                    }
                ]

        )
        | Ok _ as ret -> ret


let change_last_failure_message (expecting: string) (parser: 'a t) : 'a t =
    fun (input: parse_input) ->
        match parser input with
        | Error err_list -> (
            match err_list with
            | [] -> Error [
                { expecting; actual = ""; location = input.location }                
            ]
            | head::other ->
                Error ({ expecting; actual = head.actual; location = input.location }::other)
        )
        | Ok _ as ret -> ret

(** Functor.fmap *)
let map
    (fn: ('original_result -> 'transformed_result)) 
    (parser: 'original_result t) 
    : 'transformed_result t = 
    parser 
    >>= fun result -> 
        succeed_with (fn result)

(* -------------------- *)
(* Standard Combinators *)
(* -------------------- *)

(** If the first does not success then run the second. *)
let try_first_then_second (first_parser: 'result t) (second_parser: 'result t) tokens  =
    match first_parser tokens with
    | Tea.Result.Ok _ as ret -> ret
    | Tea.Result.Error err1 -> 
        match second_parser tokens with
        | Tea.Result.Ok _ as ret -> ret
        | Tea.Result.Error err2 ->
            Error (List.concat [err1; err2])

(** If the first does not success then run the second. *)
let (<|>) = try_first_then_second

(** Attempt an ordered list of parsers returning the first to succeed and failing if none succeed. *)
let rec attempt_in_order (parsers: ('result t) list) : 'result t = 
    match parsers with
    | [] -> fail []
    | head_parser :: rest_parsers -> 
        try_first_then_second 
            head_parser
            (attempt_in_order rest_parsers)

(** Succeed only when BOTH parsers succeed, return RIGHT result, toss the left. *)
let right (left_parser: 'left t) (right_parser: 'right t) = 
    left_parser >>= fun _ -> right_parser
(** Succeed only when BOTH parsers succeed, return RIGHT result, toss the left. *)
let (>>) = right

(** Succeed only when BOTH parsers succeed, return LEFT result, toss the right. *)
let left  (left_parser: 'left t) (right_parser: 'right t) : 'left t = 
    left_parser
    >>= fun left -> right_parser
    >>= fun _right -> succeed_with left (* this line necessary so that the types of first and second can diverge*)      
(** Succeed only when BOTH parsers succeed, return LEFT result, toss the right. *)
let (<<) = left

(** Given a parser for a single item and a parser for a list return a parser for the cons'd list. *)
let cons ~head_parser: (head_parser: 'item t) ~tail_parser: (tail_parser: 'item list t) = 
    head_parser
    >>= fun head -> tail_parser 
    >>= fun tail -> succeed_with (head :: tail)

(** Repeat a parser a given number of times and return a list of the results. *)
let rec parse_times ~times: (times: int) ~parser:(parser: 'value t) =
    if times <= 0
    then succeed_with []
    else cons 
        ~head_parser: parser 
        ~tail_parser: (parse_times 
            ~times: (times - 1) 
            ~parser: parser
        )

(** Given start, end, and content return the content. Good for sandwihed content like stuff wrapped in parenthesis. *)
let between 
    ~start_parser: (start_parser: 'starting t) 
    ~end_parser: (end_parser: 'ending t) 
    (content_parser: 'content t) 
    : 'content t = 
    start_parser >> content_parser << end_parser

(** Try the given parser and if it fails then succeed with the given default value (always succeeds). *)
let default_on_failure 
    ~default:(default: 'value) 
    ~try_parser: (parser: 'value t) 
    : 'value t = 
    try_first_then_second
        parser 
        (succeed_with default)

let optional parser = 
    default_on_failure
        ~default: () 
        ~try_parser: (right parser (succeed_with ()))

(** Skip a given parser zero to many times (always succeeds). Returns unit. *)
let rec skip_zero_to_many skip_parser = 
    default_on_failure 
        ~default: () 
        ~try_parser: (
            skip_parser 
            >>= fun _ -> skip_zero_to_many skip_parser
        )

(** Skip a given parser one to many times (fails if it doesn't find at least one item to skip). Returns unit. *)
let skip_one_to_many skip_parser = 
    right 
        skip_parser 
        (skip_zero_to_many skip_parser)

(** A parser that returns a list of 0 to many values. It ALWAYS succeeds even if the first item parsed fails (in which case it returns the empty list). *)
let rec zero_to_many (item_parser: 'item t) = 
    default_on_failure
        ~default: []
        ~try_parser: (
            item_parser
            >>= fun item -> (zero_to_many item_parser)
            >>= fun remaining -> succeed_with (item :: remaining)
        )
        
(** A parser that returns a list of 1 to many values. It succeeds only if at least the first is successful.  *)
let one_to_many (item_parser: 'item t) = 
    cons 
        ~head_parser: item_parser 
        ~tail_parser: (zero_to_many item_parser)

let prefix_parser prefix_parser item_parser =
    let rec aux lst =
        bind_with 
            ~parser: prefix_parser
            ~failure_return: (lst |> List.rev)
            ~next_parser: (fun _ -> 
                item_parser
                >>= fun item -> aux (item::lst)
            ) in 
    aux []

(** A parser that returns a list of 1 to many values where the values are delimited (separated). *)
let one_to_many_delimited 
    ~item_parser:(item_parser: 'item t) 
    ~delimiter_parser:(delimiter_parser: 'delim t) 
    : 'item list t =    
    cons 
        ~head_parser: item_parser 
        ~tail_parser: (prefix_parser delimiter_parser item_parser)

let zero_to_many_delimited 
    ~item_parser: (item_parser: 'item t) 
    ~delimiter_parser:(delimiter_parser: 'delim t) 
    : 'item list t = 
    try_first_then_second
        (one_to_many_delimited ~item_parser: item_parser ~delimiter_parser: delimiter_parser)
        (succeed_with [])

(** left associative binary operation *)
let infix_binary_operation
    ~operand_parser: (operand_parser: 'operand t) 
    ~op_parser =
    let rec loop left_operand =
        try_first_then_second
            (
                op_parser
                >>= fun op -> operand_parser
                >>= fun right_operand -> loop (op left_operand right_operand)
            ) 
            (succeed_with left_operand)
    in
        operand_parser >>= loop

let rec infix_binary_operation_right 
    ~operand_parser: (operand_parser: 'operand t) 
    ~op_parser =
    operand_parser 
    >>= fun left_operand -> (
        op_parser 
        >>= fun binary_op ->  
            map 
                (binary_op left_operand)
                (infix_binary_operation_right ~operand_parser: operand_parser ~op_parser: op_parser)
    ) 
    <|> succeed_with left_operand    

let update_location { column; line } (ch: char) =
    let code = Char.code ch in
    match code with
    | 10 -> { column = 1; line = line + 1 }
    | 13 -> { column = 1; line = line + 1 }
    | _ -> { column = column + 1; line }

(* ----------------------- *)
(* Token Parser Operations *)
(* ----------------------- *)

(** When there are _any_ tokens this succeeds with the first token else fails. *)
let any_char : 'token t = 
    fun input -> 
        match input.input_chars with
        | [] -> 
            Tea.Result.Error 
            [
                { expecting = "Expected anything."
                ; actual = "No input"
                ; location = input.location
                }
            ]
        | head::rest -> 
            Tea.Result.Ok 
                { result = head
                ; remaining_chars = rest
                ; location = update_location input.location head
                }

(** A parser that returns the first token if it passes the predicate. *)
let succeed_if predicate expecting : 'token t =
    fun input ->
        match input.input_chars with
        | [] ->
            Tea.Result.Error 
            [
                { expecting 
                ; actual = "Ran out of characters"
                ; location = input.location
                }
            ]
        | head_char::remaining_chars ->
            if predicate head_char
            then 
                Tea.Result.Ok 
                    { result = head_char
                    ; remaining_chars
                    ; location = update_location input.location head_char
                    }                    
            else 
                Tea.Result.Error 
                [
                    { expecting 
                    ; actual = Printf.sprintf "'%c'" head_char
                    ; location = input.location
                    }
                ]

(** Parser which succeeds and returns the token if it matches the given token. *)
let equals this_value = 
    succeed_if 
        ((=) this_value) 
        (Printf.sprintf "%c" this_value)

(** Parser which succeeds and returns the token if it is one of the specified valid options . *)
let one_of valid_options = 
    succeed_if 
        (fun token -> List.mem token valid_options) 
        (
            valid_options 
            |> List.map (String.make 1)
            |> String.concat ", " 
            |> Printf.sprintf "One of: %s"
        )

(** Parser which succeeds and returns the token if it is NONE of the specified valid options . *)
let none_of invalid_options = 
    succeed_if 
        (fun token -> not (List.mem token invalid_options))
        (
            invalid_options 
            |> List.map (String.make 1)
            |> String.concat ", " 
            |> Printf.sprintf "None of: %s"
        )

(** Parser which succeeds and returns the token if it is in the range (inclusive). *)
let in_range start_inclusive end_inclusive = 
    succeed_if 
        (fun token -> 
            token >= start_inclusive 
            && token <= end_inclusive
        )
        (Printf.sprintf "A character between %c and %c" start_inclusive end_inclusive)


(* ----------------- *)
(* Character Parsers *)
(* ----------------- *)

let space     = one_of [' '; '\t'; '\r'; '\n']
let spaces    = skip_zero_to_many space
let newline   = equals '\n'
let tab       = equals '\t'
let upper     = in_range 'A' 'Z'
let lower     = in_range 'a' 'z'
let digit     = in_range '0' '9'
let letter    = concatenate_error_messages (Printf.sprintf "%s") (lower <|> upper)
let alpha_num = try_first_then_second letter digit
let hex_digit = attempt_in_order [
    in_range 'a' 'f' 
    ; in_range 'A' 'F' 
    ; digit
]

let skip_whitespace = skip_zero_to_many space

let parens parser : 'content t = 
    between 
        ~start_parser: (equals '(') 
        ~end_parser: (equals ')') 
        parser
    
let oct_digit = in_range '0' '7'

let integer = 
    (one_to_many digit)
    |> map (fun digits ->
        digits
        |> string_of_chars
        |> int_of_string
    ) 

let token str =
    let len = String.length str in
    let read_index = String.get str in 
    let rec match_character_index index =
        if index >= len
        then (succeed_with str)
        else (equals (read_index index)) >> match_character_index (index + 1) in
    if len > 0
    then change_last_failure_message str (skip_whitespace >> (match_character_index 0))
    else failwith "token must be a non-empty string"        

let parse (parser: 'result t) s =
    parser 
        { input_chars = s |> String.trim |> chars_of_string
        ; location = { column = 1; line = 1 }
        } 

let parse_require_all (parser: 'result t) s =
    match (parse parser s) with
    | Tea.Result.Error errors -> Tea.Result.Error errors
    | Tea.Result.Ok { result; location; remaining_chars } ->
        match remaining_chars with
        | [] ->
            Tea.Result.Ok { result; location; remaining_chars}
        | chars ->
            Tea.Result.Error 
                [
                    { location = location
                    ; expecting = "End of input"
                    ; actual = (chars |> List.map (String.make 1) |> String.concat "" |> Printf.sprintf "Characters remaining: %s")
                    }
                ]                
