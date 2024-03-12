import fs from "fs"
import YAML from "yaml"

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

console.log(parsed)
