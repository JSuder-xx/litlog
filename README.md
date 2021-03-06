# Overview

LitLog, short for Literate Logic programming, is a subset of Prolog with a simpler syntax and an on-line editor. The goal of LitLog is to offer a path to quickly learning the basics of declarative logic programming in three lunch breaks or less.

[Try it on-line now!](https://litlog.z13.web.core.windows.net/)

When Logic Programming fits the problem space, it beats other programming paradigms by orders of magnitude so it is a helpful tool to have in your mental toolbox (even if an applicable problem may only arise once in a decade). It is also just neat and that alone is worth a few lunch periods.

![LITLOG](logo.jpeg)

# Build

```
npm run build
```

# Watch

```
npm run watch
```

# Development To Do Items

- Provide a validation WARNING (not error) when a rule or query references an atom not in the database.
- Provide a validation WARNING when a variable name appears once unless the variable name starts with an underscore.
