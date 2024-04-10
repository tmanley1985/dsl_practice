const parse = require("./src/Parser")
const lexer = require("./src/Lexer")

const inputText = `
ReorderRule for: SKU 12345
When: StockLevel < MinStockLevel
OrderQuantity: 3 weeks sales velocity + 15%

Description: Ignored content - Some long description that may be a lot of text and contains numbers such as 5 and operators like *.
`

const tokens = lexer(inputText)

const ast = parse(tokens)

console.log(ast)
