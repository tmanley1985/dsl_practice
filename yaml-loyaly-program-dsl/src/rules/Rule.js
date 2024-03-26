const Action = require("../actions/Action.js")
const ActionFactory = require("../actions/ActionFactory.js")
const ConditionFactory = require("../conditions/ConditionFactory.js")

class Rule {
  constructor(name, conditions, actions) {
    this.name = name
    this.conditions = conditions.map(condition =>
      ConditionFactory.make(
        condition.type,
        condition.attribute,
        condition.entity,
        condition.operation,
        condition.parameters
      )
    )
    this.actions = actions.map(action =>
      // TODO: Maybe it makes sense to just pass the entire context object in here?
      ActionFactory.make(action.type, action.parameters)
    )
  }

  // Evaluate and execute the rule against a set of customer data
  // Question: Mutation probably shouldn't happen here except to tinker at first
  // because we may not want one rule to interfere with another?
  interpret(checkout) {
    if (this.conditions.every(condition => condition.interpret(checkout))) {
      // TODO: Should I implement a command bus or use an event based system here instead?
      // It may be nice to return a list of commands and make this lazy. This would improve testing.
      this.actions.forEach(action => action.interpret(checkout))
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
