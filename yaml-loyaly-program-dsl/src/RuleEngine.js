const Rule = require("./rules/Rule")

class RuleEngine {
  constructor() {
    this.rules = [] // This will hold Rule objects
  }

  static fromParsedYaml(yaml) {
    const ruleEngine = new this()

    for (const rule of yaml.loyalty_rules) {
      ruleEngine.addRule(new Rule(rule.name, rule.conditions, rule.actions))
    }

    return ruleEngine
  }

  addRule(rule) {
    this.rules.push(rule)
  }
}

module.exports = RuleEngine
