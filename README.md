# Overview

LitLog, short for Literate Logic programming, is a subset of Prolog with a simpler syntax and an on-line editor. The goal of LitLog is to offer a path to quickly learning the basics of declarative logic programming in three lunch breaks or less.

When Logic Programming fits the problem space, it beats other programming paradigms by orders of magnitude so it is a helpful tool to have in your mental toolbox (even if an applicable problem may only arise once in a decade). It is also just neat and that alone is worth a few lunch periods.

# Build

```
npm run build
```

# Watch

```
npm run watch
```

# Development To Do Items

- Recursion check: Do not allow max call stack failures. Fail descriptively before then by limiting recursive solution exploration a depth of N.
- Provide a validation WARNING (not error) when a rule or query references an atom not in the database.
- Provide a validation WARNING when a variable name appears once unless the variable name starts with an underscore.
