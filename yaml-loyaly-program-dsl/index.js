import fs from "fs"
import YAML from "yaml"
import Rule from "./src/rules/Rule.js"

const file = fs.readFileSync("./stubs/loyalty_rules.yml", "utf8")

const parsed = YAML.parse(file)

const customerData = {
  id: 1,
  orders: [
    {
      id: 1,
      amount: 100.0,
      is_refunded: false,
    },
  ],
}

class RuleEngine {
  constructor() {
    this.rules = [] // This will hold Rule objects
  }

  addRule(rule) {
    this.rules.push(rule)
  }
}

const buildProgram = parsedYaml => {
  const ruleEngine = new RuleEngine()

  for (const rule of parsedYaml.loyalty_rules) {
    console.log(rule)
    ruleEngine.addRule(new Rule(rule.name, rule.conditions, rule.actions))
  }
}

class Interpreter {
  static interpret(program, customer) {
    console.log(program)
  }
}

Interpreter.interpret(buildProgram(parsed), customerData)
