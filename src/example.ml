type t = 
    { name: string
    ; rules: string list
    ; queries: string list
    }

let examples: t list =
    [ { name = "GreaterThan"
      ; rules = 
        [ "GreaterThan(?first, ?second) when GreaterThan_(?first, ?second)."
        ; "GreaterThan(?first, ?second) when GreaterThan_(?first, ?middle) and GreaterThan(?middle, ?second)."
        ; "GreaterThan_(Seven, Six)."
        ; "GreaterThan_(Six, Five)."
        ; "GreaterThan_(Five, Four)."
        ; "GreaterThan_(Four, Three)."
        ; "GreaterThan_(Three, Two)."
        ; "GreaterThan_(Two, One)."
        ; "GreaterThan_(One, Zero)."
        ]
      ; queries = 
        [ "GreaterThan(Three, Two)"
        ; "GreaterThan(Four, ?LessThanFour)"
        ; "GreaterThan(?GreaterThanOne, Three)"
        ; "GreaterThan(?GreaterThanOne, One)"
        ; "GreaterThan(?Greater, ?Lesser)"
        ]
      }
    ; { name = "Sums"
      ; rules = 
        [ "Sum(?left, ?right, ?result) when Sum_(?left, ?right, ?result)."
        ; "Sum(?left, ?right, ?result) when Sum_(?right, ?left, ?result)."
        ; "Sum_(?left, Zero, ?left)."
        ; "Sum_(One, One, Two)."
        ; "Sum_(One, Two, Three)."
        ; "Sum_(One, Three, Four)."
        ; "Sum_(One, Four, Five)."
        ; "Sum_(One, Five, Six)."
        ; "Sum_(One, Six, Seven)."
        ; "Sum_(Two, Two, Four)."
        ; "Sum_(Two, Three, Five)."
        ; "Sum_(Two, Four, Six)."
        ; "Sum_(Two, Five, Seven)."
        ; "Sum_(Two, Six, Eight)."
        ; "Sum_(Three, Three, Six)."
        ; "Sum_(Three, Four, Seven)."
        ; "Sum_(Three, Five, Eight)."
        ; "Sum_(Three, Six, Nine)."
        ; "Sum_(Four, Four, Eight)."
        ; "Sum_(Four, Five, Nine)."
        ; "Sum_(Four, Six, Ten)."
        ; "Sum_(Five, Five, Ten)."
        ; "Sum_(Five, Six, Eleven)."
        ; "Sum_(Six, Six, Twelve)."
        ]
      ; queries = 
        []
      }
    ; { name = "Genealogy"
      ; rules = 
        [ "ParentOf(?Mother, ?Child) when MotherOf(?Mother, ?Child)."
        ; "ParentOf(?Mother, ?Child) when FatherOf(?Mother, ?Child)."
        ; "Siblings(?One, ?Other) when ParentOf(?Parent, ?One) and ParentOf(?Parent, ?Two)."
        ; "AncestorOf(?Ancestor, ?Descendant) when ParentOf(?Ancestor, ?Descendant)."
        ; "AncestorOf(?Ancestor, ?Descendant) when ParentOf(?ParentOfDescendant, ?Descendant) and AncestorOf(?Ancestor, ?ParentOfDescendant)."
        ; "MotherOf(Erica, Bob)."
        ; "FatherOf(Bob, Jane)."
        ; "FatherOf(Bob, Jim)."
        ; "MotherOf(Sally, Jane)."
        ]
      ; queries = 
        []
      }
    ]
