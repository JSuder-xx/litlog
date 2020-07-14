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
        ; {j|The syntax of a relationship is the relation name followed by a comma delimitted list of related things in parenthesis:|j}
        ; "FACTNAME(RELATED_THING_1, RELATED_THING_2, ...RELATED_THING_N)"
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
        [ {j|The queries in the prior chapters were pretty lame because they could only ask if very _specific_ facts were present in the database exactly as stated.|j}
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
        ; "This chapter demonstrates using a single variable in multiple locations to indicate that one item must match in multiple places. It seems obvious but it is deceptively powerful. "
        ]
      ; rules = 
        [ "MotherOf(Sally, Bob)."
        ; "MotherOf(Sally, Janice)."
        ; "MotherOf(Sally, Debrah)."
        ; "MotherOf(Janice, Malcom)."
        ]
      ; queries = 
        [ ("MotherOf(?mother, ?siblingOne) and MotherOf(?mother, ?siblingTwo)", Comment "Match on all mother/child pairs where the SAME mother is common to both. This happens because we are using the same ?mother variable in each MotherOf sub-query. When running this query you will observe that a person is their own sibling.")
        ; ("MotherOf(?motherOne, ?siblingOne) and MotherOf(?motherTwo, ?siblingTwo) and <?motherOne = ?motherTwo>", Comment "In the prior query we get the work done of ensuring the common mother by simply using the same variable name. This query shows the long-hand version by introducing the <left = right> syntax which expresses that left 'unifies' with right. Where possible we want to use the first form shown i.e. explicitly stating that two terms unify should only be done where necessary.")
        ; ("MotherOf(?mother, ?siblingOne) and MotherOf(?mother, ?siblingTwo) and <?siblingOne /= ?siblingTwo>", Comment "In addition to expressing that two terms must unify we can also express that two terms must NOT unify. For example, to filter out cases where siblingOne and siblingTwo are the same person we use the /= operator which stands for 'does not unify'.")
        ; ("MotherOf(?motherOne, ?notSiblingOne) and MotherOf(?motherTwo, ?notSiblingTwo) and <?motherOne /= ?motherTwo> and <?notSiblingOne /= ?notSiblingTwo>", Comment "This query finds all people who are NOT siblings of one another.")
        ]
      }
    ; { name = "Unification: Database"
      ; rule_instructions =
        [ {j|Facts, Relations, Variables, and Unification clearly provide enough descriptive and querying power to support common database use cases.|j}
        ; {j|The facts below describe employees in a fictitious software company. The Job relation associates an employee with a job role. 
        The Salary relation associates an employee with their level of pay (unrelated to performance as is often the case). Finally there are two sets of which employees may or may not be members: Smart and GetsThingsDone.|j}
        ; {j|By using unification we will be able to do work similar to a JOIN in a SQL database (in fact, the commonality should start to become obvious as you work through the example queries).|j}
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
    ; { name = "Using Relations like Functions"
      ; rule_instructions = 
        [ "Relations are more general than functions but they can be used to achieve Function-like behavior."
        ; "This chapter demonstrates a Mirror relation which relates two Pair relations. The definition of Mirror declares that the first Pair is the reverse of the second Pair."
        ; "This declaration of structure can then be used in a Query to provide a value on one side of the relation and get a value out of the other side by using a variable. The amazing thing about relations is that it does not matter which side you put the value in."
        ]
      ; rules = 
        [ "Mirror(Pair(?first, ?second), Pair(?second, ?first))."
        ]
      ; queries = 
        [ ("Mirror(Pair(Hello, Goodbye), ?mirrorPair)", Comment "We provide a Pair in the first position and get out a swapped Pair in the second position.")
        ; ("Mirror(?mirrorPair, Pair(Open, Close))", Comment "Here we provide a Pair in the second position and get the swapped Pair in the first position.")
        ; ("Mirror(Pair(Hello, Goodbye), Pair(?x, ?y))", Comment "In this example we place variables inside the swapped Pair in order to extract the information individually.")
        ; ("Mirror(Pair(Job(Beatrice, Marketing), Job(Alice, SoftwareEngineer)), Pair(?x, ?y))", Comment "This query demonstrates that the values that are matched inside the pair can themselves be relations.")
        ; ("Mirror(Widget(A), ?mirrorPair)", Comment "This query FAILS because the first position passed to Mirror does not match the expected structure of Pair.")
        ]
    }
    ; { name = "Implication (Rules)"
      ; rule_instructions =
        [ {j|So far we have gotten a lot of work done with Facts, both simple facts and relations, and Variables.|j}
        ; {j|While Facts are uncondtionally true, a RULE specifies a _conclusion_ whose truth is dependent upon one or more conditions.|j}
        ; {j|Rules are written: Consequent when AntecedentCondition|j}
        ; {j|but can be _thought_ from the other direction as: Given AntecedentCondition then Consequent|j}
        ; {j|For example, someone is a parent of someone else if we can prove that they are the mother or father. Parenthood follows from motherhood and fatherhood (Parenthood <-- Fatherhood). 
        Stated the other direction, Fatherhood implies Parenthood (Fatherhood --> Parenthood).|j}
        ; {j|Rules also serve a function (pun intended) similar to functions in other languages in that they are a named abstraction or generalization with a body where the body may hold implementation details.|j}
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
        [ {j|A rule can depend upon itself recursively! This chapter demonstrates a recursive declaration for proving that someone  is an ancestor of another.|j}
        ; {j|As is always the case with recursion, BEWARE to always have a terminating base case. Observe that the recursive specification of AncestorOf has a ParentOf 
        sub-query which is not a reference to AncestorOf. When that ParentOf sub-query in the body of the AncestorOf rule fails the rule fails and recursion terminates.|j}
        ; {j|You will also observe that we define the AncestorOf relation TWICE!!! Relations can be declared multiple times where each succeeding declaration adds another pattern that can
        match for the relation. In other words, when a relation is defined a second time the second does not override or replace the first but rather adds a new way the relation can match.|j}
        ; {j|IMPORTANT: Rules are matched in the order they are entered in the database. The ordering of rules is part of the program specification and changing rule order changes program behavior.|j}
        ; {j|Observe that the simplest case of Ancestor is immediate Parentage. If someone is your parent they are your ancestor full-stop. This is a base case.|j}
        ; {j|In the second, recursive, definition of AncestorOf the ParentOf sub-query comes first as a simple base case which, only if it succeeds, then leads the logic engine to recursively search AncestorOf.|j}
        ; {j|The order of sub-queries in a rule body control the flow and meaning of the rule. Order matters!!!|j}
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
      ; { name = "Pattern Matching & Recursion (Linked List: Append)"
        ; rule_instructions = 
          [ {j|So far we have covered use cases that probably seem relatively natural to a database system. We are now going to
          explore patterns that approximate general purpose programming but using an entirely declarative information based approach.|j}
          ; {j|We begin with appending two linked lists together. In this example, the Node relation defines a kind of linked-list node (in functional programming circles we would call this Cons).|j}
          ; {j|A node in a linked list has a value in the first position while the second position holds the next Node in the list.|j}
          ; {j|Here we represent a list with no elements as EmptyList. As such, since every Node must have a value and the next list, the last node in a list has EmptyList as the next list.|j}
          ; {j|A list of a zeros items is EmptyList.|j}
          ; {j|A list of a single item might be Node(FirstItem, EmptyList).|j}
          ; {j|A list of two items Node(FirstItem, Node(SecondItem, EmptyList))|j}
          ; {j|A list of three items Node(FirstItem, Node(SecondItem, Node(ThirdItem, EmptyList)))|j}
          ; {j|...and so on.|j}
          ; {j|This is a tedious way to write lists but it is still pretty amazing to consider it is possible to define list behavior with two facts. 
          Prolog actually has special syntax to simplify writing and reading lists but it is only sugar for exactly what we are doing here.|j}
          ; {j|Now we are going to look at how to implement Append which has a list in the first and second positions and defines that the list in the third position is the result of appending the
          first two lists together.|j}
          ; {j|The first definition of Append is the  base case: Appending an empty list to any other list yields the same list. The base case definition is not even a Rule with a body. 
          All of the work is done in the declaration of the relation for the case where the first list is the EmptyList.|j}
          ; {j|The second definition for Append is a Rule which may take a little time to understand. Some of the "work" being done in the consequent of the Rule and some of the work is being done
          in the rule body and the two are highly interrelated.|j}
          ; {j|In the first position we have Node(?LeftHeadValue, ?LeftRemainingList) which means that this version of Append will only match non-empty lists (Empty lists in the first position will be matched by the base case definition of Append).
          As such, this pattern in the first position both ensures non-empty lists and also "unpacks" the structure of the non-empty list to give us the value of the head item in the left list in ?LeftHeadValue and 
          the remaining part of the list after head in ?LeftRemainingList. You can think of this as unpacking the fields of the Node structure into variables. In functional languages this unpacking is called destructuring.|j}
          ; {j|In the second position we match on any kind of list (empty or non-empty). Actually we match on anything at all because it is only a variable.|j}
          ; {j|The third position is where we define the result of appending a left and right list together. We use Node to build a new Linked List Node and we always include the head value from the left list. The rest of
          the list is going to be the result of Appending what remains of the left list after removing head with the right list. The recursive work of getting that appended list is done in the body of the rule.|j}
          ; {j|The body of the rule is simple: It recursively calls Append using what was remaining in the left list and what was given in the right list. IMPORTANT: This is safe precisely because the very
          definition of this version of Append involves unpacking the left list which means that we are, by definition, making the left list smaller. It is important to make the input smaller when
          working with recursion to guarantee termination.|j}
          ; {j|INTERESTING: The Append operation can be queried from any direction just like every other query we have seen. In other languages the 
          append operation takes two INPUTs and yields an OUTPUT. In a logic programming language there are NO inputs or outputs in the specification of rules and facts. The author
          of the query determines what is given and what must be solved (variables). Check out the example queries!|j}
          ]
        ; rules = 
        [ "Append(EmptyList, ?List, ?List)."
        ; "Append(Node(?LeftHeadValue, ?LeftRemainingList), ?RightList, Node(?LeftHeadValue, ?AppendOfLeftRemainingAndRightList)) when Append(?LeftRemainingList, ?RightList, ?AppendOfLeftRemainingAndRightList)."
        ]
        ; queries = 
        [ ("Append(Node(a, Node(b, Node(c, EmptyList))), Node(one, Node(two, Node(three, EmptyList))), ?Result)", Comment "Appends a list of [a, b, c] and a list of [one, two, three].")
        ; ("Append(Node(a, Node(b, EmptyList)), ?right, Node(a, Node(b, Node(c, Node(d, EmptyList)))))", Comment "AMAZING!!! We are asking what list would we have to add to [a, b] to get [a, b, c, d].")
        ; ("Append(?left, ?right, Node(a, Node(b, Node(c, Node(d, EmptyList)))))", Comment "This is even crazier. We are now asking for all combinations of input that might produce the output.")
        ]
      }
      ; { name = "Recursion & Result Construction (Linked List: Zip)"
        ; rule_instructions = 
          [ {j|This chapter demonstrates the implementation of a Zip function which takes two lists of equal length and combines them together to form a list of equal length of Pairs.
          For each Pair, the first item of the pair comes from an item in the first list and the second item of the pair comes from the corresponding element in the second list." |j}
          ; "For example, zipping a list of A, B, C and a list of One, Two, Three yields a list of Pair(A, One), Pair(B, Two), Pair(C, Three)."
          ; "The base case definition of zip is that the zip of two empty lists is an empty list."
          ; {j|The next definition of zip only matches when the first and second lists are non-empty. The pattern Node(?leftItem, ?leftRemainingList) unpacks (destructures) the head item and remaining list 
          of the left list into variables which can be used in other terms.
          The pattern Node(?rightItem, ?rightRemainingList) does the same thing for the right list.|j}
          ; {j|The third position of Zip, which defines the resulting zipped list, uses Node to build a new node and makes a Pair as the value of that node where the Pair is the left and right items. The 
          tail of that node is zippedRemainingList which is recursively built in the body of the rule by using what remains of the left and right lists.|j}
          ; {j|From these definitions we can see that Zip is only defined for the case where the first two lists (left and right) are empty or both are non-empty.|j}
          ; {j|We can also see that the recursion takes place by removing the head or top value from each and recursing on the remainder. That means that, by definition, both the first and second list get smaller at the same rate.|j}
          ; {j|Therefore, by definition, Zip is only defined for when the first two lists have equal lengths.|j}          
          ]
        ; rules = 
          [ "Zip(EmptyList, EmptyList, EmptyList)."
          ; "Zip(Node(?leftItem, ?leftRemainingList), Node(?rightItem, ?rightRemainingList), Node(Pair(?leftItem, ?rightItem), ?zippedRemainingList)) when Zip(?leftRemainingList, ?rightRemainingList, ?zippedRemainingList)."  
          ]
        ; queries = 
          [ (
              "Zip(Node(Small, Node(Medium, Node(Large, EmptyList))), Node(Circle, Node(Square, Node(Triangle, EmptyList))), ?shapesAndSizes)", 
              Comment "[Small, Medium, Large] and [Circle, Square, Triangle] succeeds because both lists are of the same size"
            )
          ; (
              "Zip(Node(Small, Node(Medium, Node(Large, EmptyList))), Node(Circle, Node(Square, EmptyList)), ?shapesAndSizes)", 
              Comment "[Small, Medium, Large] and [Circle, Square] fails because the second list is small than the first"
            )
          ; (
              "Zip(Node(Small, Node(Medium, Node(Large, EmptyList))), ?rightList, Node(Pair(Small, Penguin), Node(Pair(Medium, Dog), Node(Pair(Large, Elephant), EmptyList))))", 
              Comment "[Small, Medium, Large] and ?rightList yields [Pair(Small, Penguin), Pair(Medium, Dog), Pair(Large, Elephant)]. Once again, showing the power of logic programming to ask questions from different directions."
            )
          ; (
              "Zip(Node(?leftOne, Node(Medium, Node(?leftThree, EmptyList))), Node(Penguin, Node(?rightTwo, Node(Elephant, EmptyList))), Node(Pair(Small, Penguin), Node(Pair(Medium, Dog), Node(Pair(Large, Elephant), EmptyList))))", 
              Comment "Here we are pulling out substructure by placing variables inside different relations."
            )
          ]
      }
      ; { name = "Does Not Unify (Linked List: Remove)"
        ; rule_instructions = 
          [ {j|This chapter illustrates how one might implement removal of all instances of a certain element from a list.|j}
          ; {j|The first definition of Remove is a base case relation: Removing an item from an empty list is always the empty list.|j}
          ; {j|The second definition of Remove is a rule that matches when the head of the list is the item to remove. 
          The body of the rule recursively removes from the remaining list and that result is the result of the definition. Note that the head of the list was intentionally discarded.|j}
          ; {j|The third definition of Remove is a rule that matches any time the list is non-empty. Here we ensure the currentItem is not a match for the item being removed. As such it must be retained and
          so we use Node to tack current item onto the head of remainingListWithItemRemoved which was found through recursion.|j}
          ]
        ; rules = 
        [ "Remove(?itemToRemove, EmptyList, EmptyList)."
        ; "Remove(?itemToRemove, Node(?itemToRemove, ?remainingList), ?remainingListWithItemRemoved) when Remove(?itemToRemove, ?remainingList, ?remainingListWithItemRemoved)." 
        ; "Remove(?itemToRemove, Node(?currentItem, ?remainingList), Node(?currentItem, ?remainingListWithItemRemoved)) when <?itemToRemove /= ?currentItem> and Remove(?itemToRemove, ?remainingList, ?remainingListWithItemRemoved)." 
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
      ; { name = "Accumulators (Linked List: Reverse)"
        ; rule_instructions = 
          [ "This chapter demonstrates TWO important techniques: 1. Auxillary (AKA Accessory or Helper) Facts & Rules. 2. Accumulators."
          ; {j|Auxillary items are simply facts and rules which are used as an implementation detail and which you do not expect 
          consumers of your API to ever use directly. If we had a concept of scope we would make these relations private or not exported. The auxillary relations in this example are prefixed with an underscore 
          to denote that they are not part of the public API.|j}
          ; {j|This example has auxillary facts / rules because the implementations that get all of the work done use accumulators and we wish to abtract users of the API away from knowledge of that implementation detail.|j}
          ; {j|The public API we are building here is ReverseList which provides a list in the first position and defines that the list in the second position is the reverse of the first list.|j}
          ; {j|A base case is empty lists: an empty list is its own reverse. As usual the base case, though critically important, is easily stated.|j}
          ; {j|The second definition of the public API for ReverseList immediately delegates to the auxillary _ReverseListWithAccumulator and provides the starting value for the accumulator of an empty list.|j}
          ; {j|All of the real work is done by _ReverseListWithAccumulator which is a three place relation.|j}
          ; {j|The first place of the relation represents an _accumulated_ reversed list. This is the reversed list 
          built up from prior computations at the time the relation is matched.|j}
          ; {j|The second place of _ReverseListWithAccumulator is what _remains_ of the list we are reversing.|j}
          ; {j|The third place of _ReverseListWithAccumulator is the resulting reversed list which is expected to include
          the accumulated results from the first position and the result of reversing the remaining items from the second position.|j}
          ; {j|The base case for _ReverseListWithAccumulator is when the remaining items to reverse (specified in the second position) is the empty list then the resulting reversed list is simply whatever we accumulated.|j}
          ; {j|When the list of items remaining to reverse is non-empty we match on the second definition of _ReverseListWithAccumulator. In the second position of the consequent of the rule, we unpack
          the remaining list to get the current value and what remains of that list. In the body of the rule we recursively call _ReverseListWithAccumulator but observe that we add the current value to the accumulated list 
          in the first position and in the second position we recurse off what remains. Once again, this is safe because we are recursing based off the list which is given in the second position which, by definition, is 
          guaranteed to become smaller.|j}
          ; {j|As with a lot of recursive definitions it is very helpful to write down a concrete example of how this would execute because the operation of Reverse is entirely about execution order.|j}
          ]
        ; rules = 
          [ {j|ReverseList(EmptyList, EmptyList).|j}
          ; {j|ReverseList(?List, ?ReversedList) when _ReverseListWithAccumulator(EmptyList, ?List, ?ReversedList).|j}
          ; {j|_ReverseListWithAccumulator(?accumulatedReversedList, EmptyList, ?accumulatedReversedList).|j}
          ; {j|_ReverseListWithAccumulator(?accumulatedReversedList, Node(?currentValue, ?remainingListToReverse), ?reversedList) when _ReverseListWithAccumulator(Node(?currentValue, ?accumulatedReversedList), ?remainingListToReverse, ?reversedList).|j}
          ]
        ; queries = 
          [ ("ReverseList(Node(a, Node(b, Node(c, EmptyList))), Node(c, Node(b, Node(a, EmptyList))))", Comment "Using ReverseList as a query to determine if [a, b, c] is the reverse of [c, b, a].")
          ; ("ReverseList(Node(a, Node(b, Node(c, Node(d, EmptyList)))), ?reversed)", Comment "Using ReverseList as a function to get the reverse of [a, b, c, d].")
          ]         
      }
      ; { name = "Rules & Recursion #2 (Natural Number Summation)"
        ; rule_instructions = 
          [ {j|Prolog natively understands how to work with numbers. LitLog does not. HOWEVER, there is enough expressive power in pattern matching, unification and recursive rules
          to define numbers and numeric behaviors for cardinal numbers (counting numbers).|j}
          ; {j|The representation in the example is based off the Peano Axioms (internet search). Number are defined in terms of Zero, a base case, and PlusOne(?number) operation which, as the name implies adds one to its number argument.|j}
          ; {j|In this system, Zero is... well Zero. The number one is represented by simply adding one to Zero: PlusOne(Zero). Naturally, two can be found by adding one to that: PlusOne(PlusOne(Zero)). 
          Three is PlusOne(PlusOne(PlusOne(Zero))). This technique should feel __very__ similar to what we did in the Linked List example.|j}
          ; {j|In fact, the SumOf operation looks a lot like Appending two linked lists and so the Append operations are included here for comparison.|j}
          ]
        ; rules = 
          [ "SumOf(Zero, ?Number, ?Number)."
          ; "Append(EmptyList, ?List, ?List)."
          ; "SumOf(PlusOne(?leftMinusOne), ?Right, PlusOne(?sumOfLeftMinusOneAndRight)) when SumOf(?leftMinusOne, ?Right, ?sumOfLeftMinusOneAndRight)."
          ; "Append(Node(?HeadValue, ?Tail), ?RightLinkedList, Node(?HeadValue, ?Result)) when Append(?Tail, ?RightLinkedList, ?Result)."
          ]          
        ; queries = 
          [ ("SumOf(Zero, Zero, ?sum)", Comment "Query for the result of 0 + 0")
          ; ("SumOf(Zero, PlusOne(PlusOne(Zero)), ?sum)", Comment "0 + 2")
          ; ("SumOf(PlusOne(Zero), PlusOne(PlusOne(Zero)), ?sum)", Comment "1 + 2")
          ; ("SumOf(PlusOne(PlusOne(Zero)), PlusOne(PlusOne(Zero)), ?sum)", Comment "2 + 2")
          ; ("SumOf(PlusOne(PlusOne(PlusOne(Zero))), PlusOne(PlusOne(Zero)), ?sum)", Comment "3 + 2. Not only is this tedious to write but it is also difficult to decipher the output. We will clean that up in the next Chapter.")
          ]
        }
      ; { name = "Aliases (Pretty Summation)"
        ; rule_instructions = 
          [ "The SumOf operation works by pattern matching on the structure of PlusOne. Therefore, the nesting structure, which is so difficult to read, is at the heart of what makes it work. We have to keep the nesting structure."
          ; "However, we can alias the structured representation of numbers and define a pretty sum that relates terms at the level of the aliases."
          ; "Observe that the code defines aliases for zero thru ten."
          ; "It then defines SumOf identical to the definition from the prior chapter."
          ; "PrettySum works by 1) solving for the structured representation of the left number, 2) solving for the structured representation of the right number, 3) solving for the structure representation of the sum, and 4) finally solves for the alias of the structured sum."
          ]
        ; rules = 
          [ "Alias(Zero, Zero)."
          ; "Alias(One, PlusOne(Zero))."
          ; "Alias(Two, PlusOne(PlusOne(Zero)))."
          ; "Alias(Three, PlusOne(?twoStructure)) when Alias(Two, ?twoStructure)."
          ; "Alias(Four, PlusOne(?threeStructure)) when Alias(Three, ?threeStructure)."
          ; "Alias(Five, PlusOne(?fourStructure)) when Alias(Four, ?fourStructure)."
          ; "Alias(Six, PlusOne(?fiveStructure)) when Alias(Five, ?fiveStructure)."
          ; "Alias(Seven, PlusOne(?sixStructure)) when Alias(Six, ?sixStructure)."
          ; "Alias(Eight, PlusOne(?sevenStructure)) when Alias(Seven, ?sevenStructure)."
          ; "Alias(Nine, PlusOne(?eightStructure)) when Alias(Eight, ?eightStructure)."
          ; "Alias(Ten, PlusOne(?nineStructure)) when Alias(Nine, ?nineStructure)."
          ; "SumOf(Zero, ?Number, ?Number)."
          ; "SumOf(PlusOne(?InnerLeft), ?Right, PlusOne(?SumOfRightAndInnerLeft)) when SumOf(?InnerLeft, ?Right, ?SumOfRightAndInnerLeft)."
          ; "PrettySum(?leftAlias, ?rightAlias, ?prettySum) when Alias(?leftAlias, ?leftStructure) and Alias(?rightAlias, ?rightStructure) and SumOf(?leftStructure, ?rightStructure, ?sumStructure) and Alias(?prettySum, ?sumStructure)."
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
      ; { name = "Difference, Product, and Quotient"
        ; rule_instructions = 
          [ "In the prior chapters we defined a Sum operation for the counting numbers and developed a method for providing readable aliases for those numbers."
          ; "This chapter rounds out the proof that pattern matching and rules are sufficient to define rudimentary math operations of sum, difference, product, and quotient."
          ; "First up is PrettyDifference which can be defined entirely in terms of PrettySum. That was easy."
          ; "Product is a little trickier."
          ; "We have two base cases for multiplication by zero which always yields zero i.e. n * 0 = 0 and 0 * n = 0."
          ; "We also define two bases for multiplication where one of the terms is one which always yields the value of the other term i.e. n * 1 = n and 1 * n = n."
          ; {j|Finally, we define the recursive work horse rule for _ProductOf which only matches when the right number is greater than zero. The body of the rule states that the product is: left + (left * (right - 1).
          As is the case with recursion, we are defining product in terms of product but this is guaranteed to terminate because we defined base cases for 0 and 1 AND because the very definition of the rule 
          consistently makes the right number smaller by one.|j}
          ; {j|We define Quotient in terms of Product. ATTENTION: Defining Quotient this was causes a failure when there is any remainder!!! |j}

          ]
        ; rules = 
          [ "_SumOf(Zero, ?Number, ?Number)."
          ; "_SumOf(PlusOne(?InnerLeft), ?Right, PlusOne(?SumOfRightAndInnerLeft)) when _SumOf(?InnerLeft, ?Right, ?SumOfRightAndInnerLeft)."
          ; "PrettySum(?leftAlias, ?rightAlias, ?prettySum) when Alias(?leftAlias, ?leftStructure) and Alias(?rightAlias, ?rightStructure) and _SumOf(?leftStructure, ?rightStructure, ?sumStructure) and Alias(?prettySum, ?sumStructure)."
          ; "PrettyDifference(?minuend, ?subtrahend, ?difference) when PrettySum(?subtrahend, ?difference, ?minuend)."
          ; "_ProductOf(Zero, ?anything, Zero)."
          ; "_ProductOf(?anything, Zero, Zero)."
          ; "_ProductOf(PlusOne(Zero), ?anything, ?anything)."
          ; "_ProductOf(?anything, PlusOne(Zero), ?anything)."
          ; "_ProductOf(?left, PlusOne(?rightMinusOne), ?product) when _ProductOf(?left, ?rightMinusOne, ?leftTimesRightMinusOne) and _SumOf(?left, ?leftTimesRightMinusOne, ?product)."
          ; "PrettyProduct(?leftAlias, ?rightAlias, ?prettyProduct) when Alias(?leftAlias, ?leftStructure) and Alias(?rightAlias, ?rightStructure) and _ProductOf(?leftStructure, ?rightStructure, ?productStructure) and Alias(?prettyProduct, ?productStructure)."
          ; "PrettyQuotient(?dividend, ?divisor, ?quotient) when PrettyProduct(?quotient, ?divisor, ?dividend)."
          ; "Alias(Zero, Zero)."
          ; "Alias(One, PlusOne(Zero))."
          ; "Alias(Two, PlusOne(PlusOne(Zero)))."
          ; "Alias(Three, PlusOne(?prev)) when Alias(Two, ?prev)."
          ; "Alias(Four, PlusOne(?prev)) when Alias(Three, ?prev)."
          ; "Alias(Five, PlusOne(?prev)) when Alias(Four, ?prev)."
          ; "Alias(Six, PlusOne(?prev)) when Alias(Five, ?prev)."
          ; "Alias(Seven, PlusOne(?prev)) when Alias(Six, ?prev)."
          ; "Alias(Eight, PlusOne(?prev)) when Alias(Seven, ?prev)."
          ; "Alias(Nine, PlusOne(?prev)) when Alias(Eight, ?prev)."
          ; "Alias(Ten, PlusOne(?prev)) when Alias(Nine, ?prev)."          
          ; "Alias(Eleven, PlusOne(?prev)) when Alias(Ten, ?prev)."          
          ; "Alias(Twelve, PlusOne(?prev)) when Alias(Eleven, ?prev)."          
          ; "Alias(Thirteen, PlusOne(?prev)) when Alias(Twelve, ?prev)."          
          ; "Alias(Fourteen, PlusOne(?prev)) when Alias(Thirteen, ?prev)."          
          ; "Alias(Fifteen, PlusOne(?prev)) when Alias(Fourteen, ?prev)."          
          ]
        ; queries = 
          [ ("PrettyDifference(Eight, Three, ?num)", Comment "8 - 3 = ?num")
          ; ("PrettyDifference(Eight, ?what, Four)", Comment "8 - ?what = 4")
          ; ("PrettyDifference(?left, ?right, Four)", Comment "?left - ?right = 4")
          ; ("PrettyProduct(Two, Five, ?result)", Comment "2 * 5 = ?")
          ; ("PrettyProduct(Five, Two, ?result)", Comment "5 * 2 = ?")
          ; ("PrettyProduct(Three, ?right, Nine)", Comment "3 * n = 9")
          ; ("PrettyQuotient(Six, Three, ?result)", Comment "6 / 3 = ?")
          ; ("PrettyQuotient(Twelve, Three, ?result)", Comment "12 / 2 = ?")
          ; ("PrettyQuotient(Fourteen, Seven, ?result)", Comment "14 / 7 = ?")
          ]
      }
      ; { name = "Algorithmic Problem Solving (Towers of Hanoi)"
        ; rule_instructions = 
          [ ]
        ; rules = 
          [ "Alias(Zero, Zero)."
          ; "Alias(One, PlusOne(Zero))."
          ; "Alias(Two, PlusOne(PlusOne(Zero)))."
          ; "Alias(Three, PlusOne(?twoStructure)) when Alias(Two, ?twoStructure)."
          ; "Alias(Four, PlusOne(?threeStructure)) when Alias(Three, ?threeStructure)."
          ; "Alias(Five, PlusOne(?fourStructure)) when Alias(Four, ?fourStructure)."
          ; "Alias(Six, PlusOne(?fiveStructure)) when Alias(Five, ?fiveStructure)."
          ; "Alias(Seven, PlusOne(?sixStructure)) when Alias(Six, ?sixStructure)."
          ; "Alias(Eight, PlusOne(?sevenStructure)) when Alias(Seven, ?sevenStructure)."
          ; "Alias(Nine, PlusOne(?eightStructure)) when Alias(Eight, ?eightStructure)."

          ; {j|ReverseList(EmptyList, EmptyList).|j}
          ; {j|ReverseListWithAccumulator(?accumulator, EmptyList, ?accumulator).|j}
          ; {j|ReverseListWithAccumulator(?accumulator, Node(?head, ?tail), ?reversed) when ReverseListWithAccumulator(Node(?head, ?accumulator), ?tail, ?reversed).|j}
          ; {j|ReverseList(?List, ?ReversedList) when ReverseListWithAccumulator(EmptyList, ?List, ?ReversedList).|j}

          ; {j|Move(Zero, ?X, ?Y, ?dontCare, ?PriorMoves, Node(MoveTopDiskFrom(?X, ?Y), ?PriorMoves)).|j}
          ; {j|Move(PlusOne(?M), ?X, ?Y, ?Z, ?PriorMoves, ?FinalMoves) 
                when Move(?M, ?X, ?Z, ?Y, ?PriorMoves, ?MovesAfterFirst) 
                and Move(Zero, ?X, ?Y, ?_, ?MovesAfterFirst, ?MovesAfterZero) 
                and Move(?M, ?Z, ?Y, ?X, ?MovesAfterZero, ?FinalMoves).
          |j}         
          ; {j|TowerOfHanoiWithDiscs(?numberOfDiscs, ?resultingMoves)
                when Alias(?numberOfDiscs, PlusOne(?zeroBasedStructure))
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