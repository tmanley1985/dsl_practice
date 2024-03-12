class Rule {
  constructor(name, conditions, actions) {
    this.name = name
    this.conditions = conditions.map(
      cond => new Condition(cond.attribute, cond.operation, cond.value)
    )
    this.actions = actions.map(act => new Action(act.action_type, act))
  }

  // Evaluate and execute the rule against a set of customer data
  apply(customerData) {
    if (this.conditions.every(cond => cond.evaluate(customerData))) {
      // TODO: Should I implement a command bus or use an event based system here instead?
      // It may be nice to return a list of commands and make this lazy. This would improve testing.
      this.actions.forEach(act => act.execute(customerData))
      return true // Indicates the rule was applied
    }

    // Maybe it's implicit that it's true or false based on the actions that are returned.
    // For example, if this returned an empty array, then this rule failed.
    // However, it may be nice to know for testing purposes that the rule did infact
    // fail, because if the actions were empty and the rule passed, that would give more info
    // for debugging. Because that shouldn't ever happen.
    return false // Indicates the rule was not applied
  }
}

export default Rule
