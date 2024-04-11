const Parser = require("./src/Parser")
const Lexer = require("./src/Lexer")

const inputText = `
ReorderRule for: SKU 12345
When: StockLevel < MinStockLevel
OrderQuantity: 3 weeks sales velocity + 15%

Description: Ignored content - Some long description that may be a lot of text and contains numbers such as 5 and operators like *.

ReorderRule for: SKU 12346
When: StockLevel < MinStockLevel
OrderQuantity: 3 weeks sales velocity + 15%

Description: Ignored content - Some long description that may be a lot of text and contains numbers such as 5 and operators like *.
`

const tokens = new Lexer(inputText).lex()

const ast = new Parser(tokens).parse()

console.log(ast)
