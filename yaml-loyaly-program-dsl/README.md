# YAML Based Loyalty Program DSL

## Description

This is my attempt to create a basic dsl for a domain expert to use that would give them the ability to create rules around a loyalty program.

---

## Possible Features

I'm not sure if I'll get to all of these but it's nice to explore the possibilities. At the very least I'd like to understand the landscape of language when it comes to these types of problems.

- Upgrading the customer's loyalty points based on annual spending
- Validating the dsl: looking for syntax errors, actions that don't exist, etc.
- Writing an interpreter that will apply the rules and execute the actions
- Having certain rules depend on one another

---

## Questions

- How do I represent the ability to combine conditionals?
- Do I care about operator precedence?
- How best should I structure the intermediate representation of the parsed dsl (AST, Composite pattern, etc)?
- Should I have the interpreter return a list of actions to execute? Should I have a command bus for this? Or should I flip this on it's head and use events?

---

## Resources

These are resources I'm using to further my learning

- ChatGPT
- Domain Specific Languages by Martin Fowler
- Various youtube channels
