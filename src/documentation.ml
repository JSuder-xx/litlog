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
        [ ("SoccerBallsAreSpherical", Comment "This query just asks whether the fact is found in the database.")
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
        ; {j|To introduce a little abstraction we need variables which act as wildcards or placeholders for any value. Variables are written in LitLog with a ? prefix.|j}
        ; {j|When a query includes a variable, the solution to the query will display the variable "binding" which satisfies the query.|j}
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
            2) there are now MULTIPLE solutions which can be requested by clicking Next Solution. Logic programming environments
            require user to explicitly ask for the Next Solution because logic programming supports INFINITE solution spaces!!!|j}
        )
        ]
      }
    ; { name = "Relationships"
      ; rule_instructions =
        [ {j|In the last chapter we saw a relationship with a single term but Facts can express relationships between many terms. This ability to
        express complex relationships allows us to encode surprisingly complex information. For now we will start by demonstrating a simple mother-child relationship.|j}
        ]
      ; rules = 
        [ "MotherOf(Sally, Bob)."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Janice, Malcom)."
        ]
      ; queries = 
        [ ("MotherOf(Sally, Debrah)", Comment "This query without any variables simply asks if the fact can be found in the database; not very interesting.")
        ; ("MotherOf(Sally, ?childOfSally)", Comment "This query will find all children of Sally in the database by fixing Sally in the Mother position and asking what variable bindings in the Child position would enable a match with a known fact in the database..")
        ; ("MotherOf(?motherOfBob, Bob)", Comment "Here we fix the Child and instead ask for variable bindings in the Mother position. This query will find the mother (or mothers) of Bob. NOTE: We have now seen that variables can be put in any place. That is a powerful concept we will explore later.")
        ; ("MotherOf(?mother, ?child)", Comment "In fact, we can use variables for both locations to get all mother-child solutions in the database.")
        ]
      }
    ; { name = "Unification in Queries"
      ; rule_instructions =
        [ "In the last chapter two chapters we saw how variables can be used to both look for matches and also return information about what the variable values might allow a query term to match a known fact."
        (** TODO: More documentation *)
        ]
      ; rules = 
        [ "MotherOf(Sally, Bob)."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Janice, Malcom)."
        ]
      ; queries = 
        [ ("MotherOf(?mother, ?siblingOne) and MotherOf(?mother, ?siblingTwo)", Comment "Match on all mother/child pairs where the SAME mother is common to both. This happens because we are using the same ?mother variable in each MotherOf sub-query. When running this query you will observe that a person is their own sibling.")
        ; ("MotherOf(?motherOne, ?siblingOne) and MotherOf(?motherTwo, ?siblingTwo) and <?motherOne = ?motherTwo>", Comment "In the query above we get the work done of ensuring the common mother by simply using the same variable name. This query shows the long-hand version by introducing the <left = right> syntax which expresses that left 'unifies' with right.")
        ; ("MotherOf(?mother, ?siblingOne) and MotherOf(?mother, ?siblingTwo) and <?siblingOne /= ?siblingTwo>", Comment "In addition to expressing that two terms must unify we can also express that two terms must NOT unify. For example, to filter out cases where siblingOne and siblingTwo are the same person we use the /= operator which stands for 'does not unify'.")
        ; ("MotherOf(?motherOne, ?notSiblingOne) and MotherOf(?motherTwo, ?notSiblingTwo) and <?motherOne /= ?motherTwo> and <?notSiblingOne /= ?notSiblingTwo>", Comment "This query finds all people who are NOT siblings of one another.")
        ]
      }
    ; { name = "Unification: Database"
      ; rule_instructions =
        [ {j|Facts, Relations, Variables, and Unification clearly provide enough descriptive and querying power to support a common database use cases.|j}
        ; {j|The facts below describe employees in a fictitious software company. The Job relation associates an employee with a job role. 
        The Salary relation associates an employee with their level of pay (unrelated to performance as is often the case). Finally there are two sets of which employees may or may not be members: Smart and GetsThingsDone.|j}
        ; {j|By using unification we will be able to do work similar to a JOIN in a SQL database (in fact, the commonality should start to become obvious).|j}
        ]
      ; rules = 
        [ "Job(Cindy, QAEngineer)."
        ; "Smart(Cindy)."
        ; "GetsThingsDone(Cindy)."
        ; "Salary(Cindy, Moderate)."

        ; "Job(Swathi, QAEngineer)."
        ; "Smart(Swathi)."
        ; "GetsThingsDone(Swathi)."
        ; "Salary(Swathi, High)."        

        ; "Job(William, QAEngineer)."
        ; "GetsThingsDone(William)."
        ; "Salary(William, Low)."        

        ; "Job(Janet, QAEngineer)."
        ; "Smart(Janet)."
        ; "Salary(Janet, Low)."        

        ; "Job(Alice, SoftwareEngineer)."
        ; "Smart(Alice)."
        ; "GetsThingsDone(Alice)."
        ; "Salary(Alice, Low)."

        ; "Job(Beatrice, Marketing)."
        ; "Smart(Beatrice)."
        ; "GetsThingsDone(Beatrice)."
        ; "Salary(Beatrice, High)."
        ]
      ; queries = 
        [ ("Job(?person, QAEngineer)", Comment "Simply find all the persons who are quality engineers.")
        ; ("Job(?person, QAEngineer) and Smart(?person) and GetsThingsDone(?person)", Comment "Now find all the quality engineers who are both smart and get things done.")
        ; ("Job(?person, QAEngineer) and Salary(?person, High)", Comment "Find all the highly paid QA Engineers.")
        ; ("Job(?person, QAEngineer) and Salary(?person, ?salary)", Comment "This is where things get fun!!! Here we ask for all persons who are QA Engineers and then use the SAME ?person variable in the Salary sub-query in order to join to the Salary relation and get the salary level for said person. Take a moment to reflect on the implications.")
        ; ("Smart(?person) and GetsThingsDone(?person) and Job(?person, ?jobRole)", Comment "Here is another way of looking at a join: We first find the smart people who are also industrious and then finally use the Job relation to query that person's role.")
        ; ("Job(?person, QAEngineer) and Smart(?person) and GetsThingsDone(?person) and Salary(?person, ?salary) and <?salary /= High>", Comment "As a final example, find all the smart, industrious quality engineers who do not get paid a high salary.")
        ]
      }
    ; { name = "Implication (Rules)"
      ; rule_instructions =
        [ {j| |j}
        ; {j|While Facts are uncondtionally true, a RULE specifies a _conclusion_ whose truth is dependent upon one or more conditions.|j}
        ; {j|Rules are written This when That (Consequent <-- Antecedent) but can be _thought_ from the other direction as Antecedent --> Consequent.|j}
        ; {j|For example, someone is a parent of someone else if we can prove that they are the mother or father. Parenthood follows from motherhood and fatherhood (Parenthood <-- Fatherhood). 
        Stated the other direction, Fatherhood implies Parenthood (Fatherhood --> Parenthood).|j}
        ; {j|Rules also serve a function (pun intended) similar to functions in other languages in that they are a named abstraction / generalization with a body where the body represents the "work" that is done.|j}
        ; {j|The body of a rule is the list of all the sub-queries which must be satisfied in order for the rule to hold true.|j}
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
    ; { name = "Unification in Rules"
      ; rule_instructions =
        [ {j|A few chapters earlier we QUERIED for siblings by using the same variable to represent the mother of two individuals. All of the interesting "work" was done in the query itself.|j}
        ; {j|In this chapter we are going to use Rules as an abstraction mechanism (like functions in other languages) to put the work inside the rule. Further, we are going to base our sibling
        definition off of the more general ParentOf relation rather than the specific subset relation MotherOf.|j}
        ]
      ; rules = 
        [ "ParentOf(?parent, ?child) when MotherOf(?parent, ?child)."
        ; "Siblings(?firstSibling, ?secondSibling) when ParentOf(?parent, ?firstSibling) and ParentOf(?parent, ?secondSibling) and <?firstSibling /= ?secondSibling>."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Sally, Malcom)."
        ]
      ; queries = 
        [ ("Siblings(Janice, Debrah)", Comment "A yes/no style query that just asks the system to deduce whether Janice and Debrah are siblings.")
        ; ("Siblings(?sibling, Debrah)", Comment "Here we ask about the siblings of Debrah. OBSERVE: Debrah is her own sibling! Weird. We will explain and fix this behavior in the next Chapter.")
        ]
      }
    ; { name = "Recursion in Rules (Genealogy Example)"
      ; rule_instructions = 
        [ {j|A rule can depend upon itself recursively! This chapter demonstrates a recursive declaration for proving that something is an ancestor of another.|j}
        ; {j|As is always the case with recursion, BEWARE to always have a terminating base case. Observe that the recursive specification of AncestorOf has a ParentOf 
        sub-query which is not a reference to AncestorOf. When the ParentOf sub-query in the body of the AncestorOf rule fails the recursion terminates.|j}
        ; {j|You will also observe that we define the AncestorOf relation TWICE!!! Relations can be declared multiple times where each succeeding declaration adds another pattern that can
        match for the relation. In other words, when a relation is defined a second time the second does not override or replace the first but rather adds a new way the relation can match.|j}
        ; {j|Observe that the simplest case of Ancestor is immediate Parentage. If someone is your parent they are your ancestor full-stop. This is a base case.|j}
        ; {j|In the second, recursive, definition of AncestorOf the ParentOf sub-query comes first as a simple base case which, only if it succeeds, then leads the logic engine to recursively search AncestorOf.|j}
        ; {j|From this explanation you can see that... the ORDER OF QUERIES MATTERS!!!|j}
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
      ; { name = "Pattern Matching and Recursion (Linked List: Append)"
        ; rule_instructions = 
          [ {j|So far we have covered use cases that probably seem relatively natural to a database system. We are now going to
          explore patterns that approximate general purpose programming but using an entirely declarative information based approach.|j}
          ; {j|We begin with appending two linked lists together. In this example, the Node relation defines a linked-list node.|j}
          ; {j|A node in a linked list has a value in the first position while the second position holds the next Node in the list.|j}
          ; {j|The last node in the list typically has a null pointer in most imperative programming languages. Here we represent the terminating value as EmptyList. In other words, an empty list is just EmptyList.|j}
          ; {j|A list of a single item would be Node(FirstItem, EmptyList).|j}
          ; {j|A list of two items Node(FirstItem, Node(SecondItem, EmptyList))|j}
          ; {j|A list of three items Node(FirstItem, Node(SecondItem, Node(ThirdItem, EmptyList)))|j}
          ; {j|...and so on.|j}
          ; {j|This is a tedious way to write lists but it is still pretty amazing to consider it is possible to define list behavior with two rules.|j}
          ; {j|The AMAZING property is that this append operation can be queried from any direction just like every other query we have seen. In other languages the 
          append operation takes two INPUTs and yields an OUTPUT. In a logic programming language there are NO inputs or outputs in the specification of rules and facts. The author
          of the query determines what is given and what must be solved (variables).|j}
          ]
        ; rules = 
        [ "Append(EmptyList, ?List, ?List)."
        ; "Append(Node(?HeadValue, ?Tail), ?RightLinkedList, Node(?HeadValue, ?Result)) when Append(?Tail, ?RightLinkedList, ?Result)."
        ]
        ; queries = 
        [ ("Append(Node(a, Node(b, Node(c, EmptyList))), Node(one, Node(two, Node(three, EmptyList))), ?Result)", Comment "Appends a list of [a, b, c] and a list of [one, two, three].")
        ; ("Append(Node(a, Node(b, EmptyList)), ?right, Node(a, Node(b, Node(c, Node(d, EmptyList)))))", Comment "AMAZING!!! We are asking what list would we have to add to [a, b] to get [a, b, c, d].")
        ; ("Append(?left, ?right, Node(a, Node(b, Node(c, Node(d, EmptyList)))))", Comment "This is even crazier. We are now asking for all combinations of input that might produce the output.")
        ]
      }
      ; { name = "Accumulators in Recursion (Linked List: Reverse)"
        ; rule_instructions = 
          []
        ; rules = 
          [ {j|ReverseList(EmptyList, EmptyList).|j}
          ; {j|ReverseListWithAccumulator(?accumulator, EmptyList, ?accumulator).|j}
          ; {j|ReverseListWithAccumulator(?accumulator, Node(?head, ?tail), ?reversed) when ReverseListWithAccumulator(Node(?head, ?accumulator), ?tail, ?reversed).|j}
          ; {j|ReverseList(?List, ?ReversedList) when ReverseListWithAccumulator(EmptyList, ?List, ?ReversedList).|j}
          ]
        ; queries = 
          [ ("ReverseList(Node(a, Node(b, Node(c, Node(d, EmptyList)))), ?reversed)", Comment "")
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
        [ "Remove(?Item, EmptyList, EmptyList)."
        ; "Remove(?Item, Node(?Item, ?Tail), ?RecursiveTail) when Remove(?Item, ?Tail, ?RecursiveTail)." 
        ; "Remove(?Item, Node(?HeadValue, ?Tail), Node(?HeadValue, ?RecursiveTail)) when <?Item /= ?HeadValue> and Remove(?Item, ?Tail, ?RecursiveTail)." 
        ]
        ; queries = 
        [ ("Remove(a, EmptyList, ?result)", Comment "")
        ; ("Remove(a, Node(a, EmptyList), ?result)", Comment "")
        ; ("Remove(a, Node(b, EmptyList), ?result)", Comment "")
        ; ("Remove(b, Node(a, Node(b, Node(a, EmptyList))), ?result)", Comment "")
        ; ("Remove(cherry, Node(apple, Node(banana, Node(cherry, Node(date, Node(elderberry, EmptyList))))), ?result)", Comment "")
        ; ("Remove(x, Node(x, Node(o, Node(x, Node(o, Node(x, EmptyList))))), ?result)"     , Comment "")
        ; ("Remove(?whatWouldIRemove, Node(x, Node(o, Node(x, Node(o, Node(x, EmptyList))))), Node(o, Node(o, EmptyList)))"     , Comment "")
        ]
      }
      ; { name = "Rules and Recursion #2 (Natural Number Summation)"
        ; rule_instructions = 
          [ {j|Real Prolog natively understands how to work with numbers. LitLog does not. HOWEVER, there is enough expressive power in pattern matching, unification and recursive rules
          to define numbers and numeric behaviors for cardinal numbers (counting numbers).|j}
          ; {j|The representation in the example is based off the Peano Axioms (internet search). It is based on Zero and a Succ(?number) operation which simply means Successor or ?number + 1.|j}
          ; {j|In this system, Zero is... well Zero. The number one is represented by simply taking the successor of Zero so Succ(Zero). Naturally, two is the successor or one so Succ(Succ(Zero)). 
          This technique should feel very similar to what we did in the Linked List example.|j}
          ; {j|In fact, the SumOf operation looks a lot like Appending two linked lists and so the Append operations are included here for comparison.|j}
          ]
        ; rules = 
          [ "SumOf(Zero, ?Number, ?Number)."
          ; "SumOf(Succ(?InnerLeft), ?Right, Succ(?SumOfRightAndInnerLeft)) when SumOf(?InnerLeft, ?Right, ?SumOfRightAndInnerLeft)."
          ; "Append(EmptyList, ?List, ?List)."
          ; "Append(Node(?HeadValue, ?Tail), ?RightLinkedList, Node(?HeadValue, ?Result)) when Append(?Tail, ?RightLinkedList, ?Result)."
          ]          
        ; queries = 
          [ ("SumOf(Zero, Zero, ?sum)", Comment "Query for the result of 0 + 0")
          ; ("SumOf(Zero, Succ(Succ(Zero)), ?sum)", Comment "0 + 2")
          ; ("SumOf(Succ(Zero), Succ(Succ(Zero)), ?sum)", Comment "1 + 2")
          ; ("SumOf(Succ(Succ(Zero)), Succ(Succ(Zero)), ?sum)", Comment "2 + 2")
          ; ("SumOf(Succ(Succ(Succ(Zero))), Succ(Succ(Zero)), ?sum)", Comment "3 + 2. Not only is this tedious to write but it is also difficult to decipher the output. We will clean that up in the next Chapter.")
          ]
        }
      ; { name = "Mapping Structure to Readable Aliases (Pretty Summation)"
        ; rule_instructions = 
          [ "The SumOf operation works by pattern matching on the structure of Succ. Therefore, the nesting structure, which is so difficult to read, as at the heart of what makes it works. We have to keep the nesting structure."
          ; "However, we can alias the structured representation of numbers and define a pretty sum that relates terms at the level of the aliases."
          ; "Observe that the code defines aliases for zero thru ten."
          ; "It then defines SumOf identical to the definition from the prior chapter."
          ; "PrettySum works by 1) solving for the structured representation of the left number, 2) solving for the structured representation of the right number, 3) solving for the structure representation of the sum, and 4) finally solves for the alias of the structured sum."
          ]
        ; rules = 
          [ "Alias(Zero, Zero)."
          ; "Alias(One, Succ(Zero))."
          ; "Alias(Two, Succ(Succ(Zero)))."
          ; "Alias(Three, Succ(?twoStructure)) when Alias(Two, ?twoStructure)."
          ; "Alias(Four, Succ(?threeStructure)) when Alias(Three, ?threeStructure)."
          ; "Alias(Five, Succ(?fourStructure)) when Alias(Four, ?fourStructure)."
          ; "Alias(Six, Succ(?fiveStructure)) when Alias(Five, ?fiveStructure)."
          ; "Alias(Seven, Succ(?sixStructure)) when Alias(Six, ?sixStructure)."
          ; "Alias(Eight, Succ(?sevenStructure)) when Alias(Seven, ?sevenStructure)."
          ; "Alias(Nine, Succ(?eightStructure)) when Alias(Eight, ?eightStructure)."
          ; "Alias(Ten, Succ(?nineStructure)) when Alias(Nine, ?nineStructure)."
          ; "SumOf(Zero, ?Number, ?Number)."
          ; "SumOf(Succ(?InnerLeft), ?Right, Succ(?SumOfRightAndInnerLeft)) when SumOf(?InnerLeft, ?Right, ?SumOfRightAndInnerLeft)."
          ; "PrettySum(?leftAlias, ?rightAlias, ?prettySum) when Alias(?leftAlias, ?leftStructure) and Alias(?rightAlias, ?rightStructure) and SumOf(?leftStructure, ?rightStructure, ?sumStructure) and Alias(?prettySum, ?sumStructure)."
          ; "PrettyDifference(?leftAlias, ?rightAlias, ?result) when PrettySum(?rightAlias, ?result, ?leftAlias)."
          ]
        ; queries = 
          [ ("PrettySum(Two, Three, ?prettySum)", Comment "Execute this query and breath a sigh of relief. The answer is displayed as a very clear Five.")
          ; ("PrettySum(Three, Five, ?prettySum)", Comment "")
          ; ("PrettySum(Four, Five, ?prettySum)", Comment "")
          ; ("PrettySum(?left, Three, Ten)", Comment "Discover what can be added to Three to equal Ten.")
          ; ("PrettySum(?left, ?right, Five)", Comment "Find all the ways to add numbers to achieve Five")
          ; ("PrettySum(?half, ?half, ?num)", Comment "Find all the pairs of numbers and their half.")
          ]
      }
      ; { name = "Algorithmic Problem Solving (Towers of Hanoi)"
        ; rule_instructions = 
          []
        ; rules = 
          [ "Alias(Zero, Zero)."
          ; "Alias(One, Succ(Zero))."
          ; "Alias(Two, Succ(Succ(Zero)))."
          ; "Alias(Three, Succ(?twoStructure)) when Alias(Two, ?twoStructure)."
          ; "Alias(Four, Succ(?threeStructure)) when Alias(Three, ?threeStructure)."
          ; "Alias(Five, Succ(?fourStructure)) when Alias(Four, ?fourStructure)."
          ; "Alias(Six, Succ(?fiveStructure)) when Alias(Five, ?fiveStructure)."
          ; "Alias(Seven, Succ(?sixStructure)) when Alias(Six, ?sixStructure)."
          ; "Alias(Eight, Succ(?sevenStructure)) when Alias(Seven, ?sevenStructure)."
          ; "Alias(Nine, Succ(?eightStructure)) when Alias(Eight, ?eightStructure)."

          ; {j|ReverseList(EmptyList, EmptyList).|j}
          ; {j|ReverseListWithAccumulator(?accumulator, EmptyList, ?accumulator).|j}
          ; {j|ReverseListWithAccumulator(?accumulator, Node(?head, ?tail), ?reversed) when ReverseListWithAccumulator(Node(?head, ?accumulator), ?tail, ?reversed).|j}
          ; {j|ReverseList(?List, ?ReversedList) when ReverseListWithAccumulator(EmptyList, ?List, ?ReversedList).|j}

          ; {j|Move(Zero, ?X, ?Y, ?dontCare, ?PriorMoves, Node(MoveTopDiskFrom(?X, ?Y), ?PriorMoves)).|j}
          ; {j|Move(Succ(?M), ?X, ?Y, ?Z, ?PriorMoves, ?FinalMoves) 
                when Move(?M, ?X, ?Z, ?Y, ?PriorMoves, ?MovesAfterFirst) 
                and Move(Zero, ?X, ?Y, ?_, ?MovesAfterFirst, ?MovesAfterZero) 
                and Move(?M, ?Z, ?Y, ?X, ?MovesAfterZero, ?FinalMoves).
          |j}         
          ; {j|TowerOfHanoiWithDiscs(?numberOfDiscs, ?resultingMoves)
                when Alias(?numberOfDiscs, Succ(?zeroBasedStructure))
                and Move(?zeroBasedStructure, Left, Right, Center, EmptyList, ?resultingMovesReversed)
                and ReverseList(?resultingMovesReversed, ?resultingMoves).
          |j}
          ]
        ; queries = 
          [ ("TowerOfHanoiWithDiscs(One, ?solution)", Comment "")
          ; ("TowerOfHanoiWithDiscs(Two, ?solution)", Comment "")
          ; ("TowerOfHanoiWithDiscs(Three, ?solution)", Comment "")
          ; ("TowerOfHanoiWithDiscs(Four, ?solution)", Comment "")
          ; ("TowerOfHanoiWithDiscs(Five, ?solution)", Comment "")
          ]
      }
      ; { name = "Finite State Automata"
      ; rule_instructions = []
      ; rules = 
        [ "_Recognize(?Node, EmptyList) when FinalState(?Node)."
        ; "_Recognize(?OriginalNode, ?InputList) when TransitionFromToWithInput(?OriginalNode, ?NextNode, ?Label) and _Traverse(?Label, ?InputList, ?NewInputList) and _Recognize(?NextNode, ?NewInputList)."
        ; "_Traverse(?Label, Node(?Label, ?Remaining), ?Remaining)."
        ; "Recognize(?InputList) when InitialState(?StartingState) and _Recognize(?StartingState, ?InputList)."
        ; "InitialState(AcceptingApplesOrDone)."
        ; "FinalState(Finished)."
        ; "TransitionFromToWithInput(AcceptingApplesOrDone, Finished, Done)."
        ; "TransitionFromToWithInput(AcceptingApplesOrDone, AcceptingApplesOrDone, Apples)."
        ; "TransitionFromToWithInput(AcceptingApplesOrDone, AcceptingOranges, Apples)."
        ; "TransitionFromToWithInput(AcceptingOranges, AcceptingApplesOrDone, Oranges)."
        ]
      ; queries = 
        [ ("Recognize(Node(Apples, Node(Oranges, Node(Done, EmptyList))))", Comment "")
        ; ("Recognize(Node(Apples, Node(Oranges, Node(Apples, Node(Oranges, Node(Done, EmptyList))))))", Comment "")
        ; ("Recognize(Node(Apples, Node(Oranges, Node(Apples, Node(Oranges, Node(Apples, Node(Oranges, Node(Done, EmptyList))))))))", Comment "")
        ; ("Recognize(Node(Apples, Done))", Comment "")
        ; ("Recognize(?Inputs)", Comment "")
        ]
      }
    ]

let next_chapter chapter = 
    Utils.ListEx.next_or_this_item chapter chapters