let overview: string list = 
    [ {j|LitLog, short for Literate Logic programming, is a subset of Prolog with a simpler syntax and an on-line editor. 
    The goal of LitLog is to offer a path to quickly learning the basics of declarative logic programming in three lunch breaks or less.|j}
    ; {j|When Logic Programming fits the problem space, it beats other programming paradigms by orders of magnitude so it is a helpful tool to
    have in your mental toolbox (even if an applicable problem may only arise once in a decade). It is also just neat and that alone is worth a few lunch periods.|j}
    ; "The act of declarative logic programming is building a knowledge database that can be queried. It is the query powers that are surprising and interesting."
    ; "Rules & Facts are the two forms of knowledge representation. Get started by choosing the first chapter."
    ]

type comment = Comment of string

type chapter = 
    { name: string
    ; rule_instructions: string list
    ; rules: string list
    ; queries: (string * comment) list
    }

let queries chapter = 
    match chapter.queries
        |> List.map fst
        |> List.map (ParserM.parse_require_all Language.Parser.query_parser) 
        |> Tea.Result.accumulate with
    | Tea.Result.Ok example_parse_successes -> 
        List.combine
            (example_parse_successes |> List.map ParserM.result_of_parse_success)
            (chapter.queries |> List.map snd)
    | Tea.Result.Error err ->
        Js.Console.error err;
        []
    
let chapters: chapter list = 
    [ 
      { name = "Simple Facts"
      ; rule_instructions = 
        [ {j|FACTs are unconditionally true statements. As soon as a fact is entered into the database it is known to be true. 
        A Fact can relate other terms together or it can stand on its own. In this chapter we show just simple facts that stand on their own.|j}
        ; {j|A Fact is represented as an identifier written in any case. Spaces cannot be used inside Fact names but underscores can be.|j}
        ; {j|Click the <Query> button to explore the queries that can be written against this simple database.|j}
      ]
      ; rules = 
        [ "OrangesAreSpherical."
        ; "oranges_are_spherical."
        ; "SoccerBallsAreSpherical."
        ; "soccerBalls_ARE_spherical."
        ]
      ; queries = 
        [ ("SoccerBallsAreSpherical", Comment "This query just asks whether the fact is found in the database. Execute this query to reveal that this fact is found in the database.")
        ; ("FootballsAreSpherical", Comment "Try this query. Observe that no solution was found because the fact is not in the database.")
        ]
      }
    ; { name = "Facts as Predicates"
      ; rule_instructions =
        [ {j|Facts can also express the truth of a _relationship_ between things. A Fact that expresses a relationship with a single term can be viewed as a declaration of 
            inclusion in a Set (a Predicate). For example, the facts from the previous chapter about spherical items can be more usefully represented as predicates.|j}
        ]
      ; rules =
        [ "Spherical(Oranges)."
        ; "Spherical(SoccerBalls)."
        ; "Spherical(BasketBalls)."
        ; "Spherical(Sun)."
        ]
      ; queries =
        [ ("Spherical(Oranges)", Comment "This query just asks if this specific fact is in the database. It is.")
        ; ("Spherical(FootBalls)", Comment "Observe that this query fails to find a solution.")
        ]
      }
    ; { name = "Querying with Variables"
      ; rule_instructions =
        [ {j|The queries in the prior chapters were pretty lame because they could only ask if very _specific_ facts were present in the database.|j}
        ; {j|To introduce a little abstraction we need variables which act as kind of wildcard placeholders for any value. Variables are written with a ? prefix.|j}
        ; {j|When a query includes a variable, the solution to the query will display the variable binding which satisfies the query.|j}
        ]
      ; rules =
        [ "Spherical(Oranges)."
        ; "Spherical(SoccerBalls)."
        ; "Spherical(BasketBalls)."
        ; "Spherical(Sun)."
        ]
      ; queries =
        [ (
            "Spherical(?sphericalThing)", 
            Comment {j|When you execute this query you will observe multiple things: 1) the solution now includes the value of the binding and 
            2) there are now multiple solutions which can be requested with Next Solution. Logic programming environments
            require user to explicitly ask for the Next Solution because logic programming supports INFINITE solution spaces!!!|j}
        )
        ]
      }
    ; { name = "Relationships"
      ; rule_instructions =
        [ "Facts can express relationships between multiple things. This child demonstrates declaration of mother-child relationships."
        ]
      ; rules = 
        [ "MotherOf(Sally, Bob)."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Janice, Malcom)."
        ]
      ; queries = 
        [ ("MotherOf(Sally, ?childOfSally)", Comment "This query will find all children of Sally in the database.")
        ; ("MotherOf(?motherOfBob, Bob)", Comment "This query will find the mother (or mothers) of Bob. NOTE: We have now seen that variables can be put in any place. That is a powerful concept we will explore later.")
        ; ("MotherOf(?mother, ?child)", Comment "In fact, we can use variables for both locations to get all mother-child solutions in the database.")
        ]
      }
    ; { name = "Implication (Rules)"
      ; rule_instructions =
        [ {j|While Facts are uncondtionally true, a RULE specifies a _conclusion_ whose truth is dependent upon one or more conditions. For example, someone is a parent of someone else if 
        we can prove that they are the mother or father. Parenthood follows from motherhood and fatherhood.|j}
        ]
      ; rules = 
        [ "ParentOf(?parent, ?child) when MotherOf(?parent, ?child)."
        ; "ParentOf(?parent, ?child) when FatherOf(?parent, ?child)."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Janice, Malcom)."
        ; "FatherOf(Roberto, Janice)."
        ]
      ; queries = 
        [ ("ParentOf(Sally, Janice)", Comment "Here we will simply ask the database if it can prove that Sally is the parent of Janice. NOTE: The database does not explicitly declare Sally is the parent of Janice. The logic system deduced the fact from the rules given.")
        ; ("ParentOf(?parent, Janice)", Comment "We can also use variables in the query to find all parents of Janice.")
        ; ("ParentOf(Sally, ?child)", Comment "Or find all the children of Sally.")
        ]
      }
    ; { name = "Unification: Part 1"
      ; rule_instructions =
        [ {j|In this next example consider the definition of Siblings. Note that the variable ?parent is found in two sub-queries of ParentOf. 
        This means that the Siblings rule can only be proven true when a ParentOf can be proven for the first sibling and for the second and
        that the parent must be able to be unified (in this case the same). This is an example of unification and it is one of most interesting powers 
        in logic programming because it can accomplish a lot work in a very subtle and succinct way.|j}
        ]
      ; rules = 
        [ "ParentOf(?parent, ?child) when MotherOf(?parent, ?child)."
        ; "Siblings(?firstSibling, ?secondSibling) when ParentOf(?parent, ?firstSibling) and ParentOf(?parent, ?secondSibling)."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Sally, Malcom)."
        ]
      ; queries = 
        [ ("Siblings(Janice, Debrah)", Comment "A yes/no style query that just asks the system to deduce whether Janice and Debrah are siblings.")
        ; ("Siblings(?sibling, Debrah)", Comment "Here we ask about the siblings of Debrah. OBSERVE: Debrah is her own sibling! Weird. We will explain and fix this behavior in the next Chapter.")
        ]
      }
    ; { name = "Unification: Part 2"
      ; rule_instructions =
        [ {j|In the last chapter we saw that our definition of sibling was such that it would report that a person was their own sibling. This was because
        we defined sibling as ANY other term in the database that has the same parent. We did not explicitly ask not to be informed when both terms were the same.|j}
        ]
      ; rules = 
        [ "ParentOf(?parent, ?child) when MotherOf(?parent, ?child)."
        ; "Siblings(?firstSibling, ?secondSibling) when ParentOf(?parent, ?firstSibling) and ParentOf(?parent, ?secondSibling) and <?firstSibling /= ?secondSibling>."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Sally, Malcom)."
        ]
      ; queries = 
        [ ("Siblings(?sibling, Debrah)", Comment "Now we should only get other terms that have the same parent but which are not Debrah herself.")
        ]
      }
    ; { name = "Recursion (Genealogy)"
      ; rule_instructions = 
        [ {j|A rule can depend upon itself recursively! This chapter demonstrates a recursive declaration for proving that something is an ancestor of another.|j}
        ; {j|As is always the case with recursion, BEWARE to always have a terminating base case. Observe that the recursive specification of AncestorOf has a ParentOf 
        sub-query which is not a reference to AncestorOf. When the ParentOf sub-query in the body of the AncestorOf rule fails the recursion terminates.|j}
        ]
      ; rules = 
        [ "ParentOf(?Mother, ?Child) when MotherOf(?Mother, ?Child)."
        ; "AncestorOf(?Ancestor, ?Descendant) when ParentOf(?Ancestor, ?Descendant)."
        ; "AncestorOf(?Ancestor, ?Descendant) when ParentOf(?ParentOfDescendant, ?Descendant) and AncestorOf(?Ancestor, ?ParentOfDescendant)."
        
        ; "MotherOf(Erica, Sally)."
        ; "MotherOf(Sally, Jane)."
        ; "MotherOf(Jane, Maria)."
        ; "MotherOf(Maria, Roberta)."
        ]
      ; queries = 
        [ ("AncestorOf(Erica, Sally)", Comment "Here Erica is just Sally's mother so we don't even need to use recursion")
        ; ("AncestorOf(Erica, Jane)" , Comment "Note that there is ONE application of the recursive rule.")
        ; ("AncestorOf(Erica, Roberta)" , Comment "Observe that there are THREE applications of the recursive rule.")
        ; ("AncestorOf(?ancestor, Roberta)" , Comment "Demonstrating a variable to ask for ALL ancestors of Roberta.")
        ; ("AncestorOf(Erica, ?descendant)" , Comment "Demonstrating a variable to ask for ALL descendants of Erica.")
        ]
      }
      ; { name = "Linked List: Append"
        ; rule_instructions = 
          [ {j|So far we have covered use cases that probably seem relatively natural to a database system. We are now going to
          explore patterns that approximate general purpose programming but using an entirely declarative information based approach.|j}
          ; {j|We begin with appending two linked lists together. In this example, the N relation defines a linked-list node (abbreviated to N for reasons that become quickly apparent.)|j}
          ; {j|A node in a linked list has a value and a pointer to the next item in the list. The last node in the list typically has a null pointer in most imperative programming languages.|j}
          ; {j|Here we represent the terminating value as Empty. So an empty list is just Empty.|j}
          ; {j|A list of a single item would be N(FirstItem, Empty).|j}
          ; {j|A list of two items N(FirstItem, N(SecondItem, Empty))|j}
          ; {j|...and so on. Obviously this is a tedious way to write lists but it is still pretty amazing to consider it is possible to define list behavior with two rules.|j}
          ; {j|The AMAZING property is that this append operation can be queried from any direction just like every other query we have seen. In other languages the 
          append operation takes two INPUTs and yields an OUTPUT. In a logic programming language there are NO inputs or outputs in the specification of rules and facts. The author
          of the query determines what is given and what is requested.|j}
          ]
        ; rules = 
        [ "Append(Empty, ?List, ?List)."
        ; "Append(N(?Head, ?Tail), ?RightList, N(?Head, ?Result)) when Append(?Tail, ?RightList, ?Result)."
        ]
        ; queries = 
        [ ("Append(N(a, N(b, N(c, Empty))), N(one, N(two, N(three, Empty))), ?Result)", Comment "Appends a list of [a, b, c] and a list of [one, two, three].")
        ; ("Append(N(a, N(b, Empty)), ?right, N(a, N(b, N(c, N(d, Empty)))))", Comment "AMAZING!!! We are asking what list would we have to add to [a, b] to get [a, b, c, d].")
        ; ("Append(?left, ?right, N(a, N(b, N(c, N(d, Empty)))))", Comment "This is even crazier. We are now asking for all combinations of input that might produce the output.")
        ]
      }
      ; { name = "Linked List: Remove"
        ; rule_instructions = 
          [ {j|This chapter illustrates how one might implement removal of all instances of an element from a list.|j}
          ; {j|The technique involves complex pattern matching, unification, recursion, and not-unifies.|j}
          ; {j|It is entirely OK if this seems hard. This example is included only to demonstrate the extent to which the declarative paradigm 
          can be stretched to implement |j}

          ]
        ; rules = 
        [ "Remove(?Item, Empty, Empty)."
        ; "Remove(?Item, N(?Item, ?Tail), ?RecursiveTail) when Remove(?Item, ?Tail, ?RecursiveTail)." 
        ; "Remove(?Item, N(?Head, ?Tail), N(?Head, ?RecursiveTail)) when <?Item /= ?Head> and Remove(?Item, ?Tail, ?RecursiveTail)." 
        ]
        ; queries = 
        [ ("Remove(a, Empty, ?result)", Comment "")
        ; ("Remove(a, N(a, Empty), ?result)", Comment "")
        ; ("Remove(a, N(b, Empty), ?result)", Comment "")
        ; ("Remove(b, N(a, N(b, N(a, Empty))), ?result)", Comment "")
        ; ("Remove(cherry, N(apple, N(banana, N(cherry, N(date, N(elderberry, Empty))))), ?result)", Comment "")
        ; ("Remove(x, N(x, N(o, N(x, N(o, N(x, Empty))))), ?result)"     , Comment "")
        ; ("Remove(?whatWouldIRemove, N(x, N(o, N(x, N(o, N(x, Empty))))), N(o, N(o, Empty)))"     , Comment "")
        ]
      }
      ; { name = "Numbers: Summation"
        ; rule_instructions = 
          [ "Peano numbers" ]
        ; rules = 
          [ "SumOf(Zero, ?Number, ?Number)."
          ; "SumOf(Succ(?InnerLeft), ?Right, Succ(?SumOfRightAndInnerLeft)) when SumOf(?InnerLeft, ?Right, ?SumOfRightAndInnerLeft)."
          ]
        ; queries = 
          [ ("SumOf(Zero, Zero, ?sum)", Comment "0 + 0")
          ; ("SumOf(Zero, Succ(Succ(Zero)), ?sum)", Comment "0 + 2")
          ; ("SumOf(Succ(Zero), Succ(Succ(Zero)), ?sum)", Comment "1 + 2")
          ; ("SumOf(Succ(Succ(Zero)), Succ(Succ(Zero)), ?sum)", Comment "2 + 2")
          ; ("SumOf(Succ(Succ(Succ(Zero))), Succ(Succ(Zero)), ?sum)", Comment "3 + 2")
          ]
      }
      ; { name = "Numbers: Pretty Summation"
        ; rule_instructions = 
          [ "Using aliasing to clean up summation."]
        ; rules = 
          [ "SumOf(Zero, ?Number, ?Number)."
          ; "SumOf(Succ(?InnerLeft), ?Right, Succ(?SumOfRightAndInnerLeft)) when SumOf(?InnerLeft, ?Right, ?SumOfRightAndInnerLeft)."
          ; "PrettySum(?leftAlias, ?rightAlias, ?prettySum) when Alias(?leftAlias, ?leftStructure) and Alias(?rightAlias, ?rightStructure) and SumOf(?leftStructure, ?rightStructure, ?sumStructure) and Alias(?prettySum, ?sumStructure)."
          ; "Alias(Zero, Zero)."
          ; "Alias(One, Succ(Zero))."
          ; "Alias(Two, Succ(Succ(Zero)))."
          ; "Alias(Three, Succ(?twoStructure)) when Alias(Two, ?twoStructure)."
          ; "Alias(Four, Succ(?threeStructure)) when Alias(Three, ?threeStructure)."
          ; "Alias(Five, Succ(?fourStructure)) when Alias(Four, ?fourStructure)."
          ; "Alias(Six, Succ(?fiveStructure)) when Alias(Five, ?fiveStructure)."
          ; "Alias(Seven, Succ(?sixStructure)) when Alias(Six, ?sixStructure)."
          ; "Alias(Eight, Succ(?sevenStructure)) when Alias(Seven, ?sevenStructure)."
          ; "Alias(Nine, Succ(?eightStructure)) when Alias(Eight, ?eightStructure)."
          ]
        ; queries = 
          [ ("PrettySum(Two, Three, ?prettySum)", Comment "")
          ; ("PrettySum(Three, Five, ?prettySum)", Comment "")
          ; ("PrettySum(One, Seven, ?prettySum)", Comment "")
          ; ("PrettySum(Four, Five, ?prettySum)", Comment "")
          ]
      }
    ]

let next_chapter chapter = 
    Utils.ListEx.next_or_this_item chapter chapters