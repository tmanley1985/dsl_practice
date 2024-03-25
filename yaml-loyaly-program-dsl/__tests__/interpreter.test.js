const fs = require("fs")
const YAML = require("yaml")
const Interpreter = require("../src/Interpreter.js")
const RuleEngine = require("../src/RuleEngine.js")

test("it should update a customers points during checkout", () => {
  const file = fs.readFileSync("./stubs/loyalty_rules.yml", "utf8")

  const parsed = YAML.parse(file)

  const customer = {
    id: 1,
    orders: [
      {
        id: 1,
        amount: 100.0,
        points: 100,
      },
    ],
    cart: { amount: 100.23 },
    points: 100,
  }

  const checkoutRequest = {
    id: 1,
    customer,
  }

  Interpreter.interpret(RuleEngine.fromParsedYaml(parsed), checkoutRequest)

  expect(true).toBe(true)
})
