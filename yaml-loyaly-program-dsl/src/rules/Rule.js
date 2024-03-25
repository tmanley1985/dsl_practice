const Action = require("../actions/Action.js")
const Condition = require("../conditions/Condition.js")

class Rule {
  constructor(name, conditions, actions) {
    this.name = name
    this.conditions = conditions.map(
      condition =>
        new Condition(
          condition.attribute,
          condition.operation,
          condition.values
        )
    )
    this.actions = actions.map(action => new Action(action.action_type, action))
  }

  // Evaluate and execute the rule against a set of customer data
  // Question: Mutation probably shouldn't happen here except to tinker at first
  // because we may not want one rule to interfere with another?
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

module.exports = Rule
