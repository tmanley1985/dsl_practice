const fs = require("fs")
const YAML = require("yaml")
const Interpreter = require("../src/Interpreter.js")
const RuleEngine = require("../src/RuleEngine.js")

test("it should update a customers points if checking out within a valid date range", () => {
  const file = fs.readFileSync("__tests__/stubs/loyalty_rules.yml", "utf8")

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

  // We're assuming that each dollar spent is equivalent to one point.
  // So the customer starts with 100 points from previous orders
  // he checks out for 100 bucks which SHOULD be another 100 points but hold
  // on now, he checked out within a period defined by the DSL as a double points period.
  // So those 100 points turns to 200, and you add that to the original amount and get 300.
  expect(customer.points).toBe(300)
})
