const fs = require("fs")
const Lexer = require("../src/Lexer")

test("it should correctly lex the dsl", () => {
  const inputText = `
    ReorderRule for: SKU 12345
    When: StockLevel < MinStockLevel
    OrderQuantity: 3 weeks sales velocity + 15%

    Description: Ignored content - Some long description that may be a lot of text and contains numbers such as 5 and operators like *.
    `

  const expectedTokens = [
    { type: "KEYWORD", value: "ReorderRule for:" },
    { type: "SKU", value: "SKU 12345" },
    { type: "KEYWORD", value: "When:" },
    { type: "KEYWORD", value: "StockLevel" },
    { type: "COMPARISON_OPERATOR", value: "<" },
    { type: "KEYWORD", value: "MinStockLevel" },
    { type: "KEYWORD", value: "OrderQuantity:" },
    { type: "NUMERIC_LITERAL", value: "3" },
    { type: "VELOCITY_METRIC", value: "weeks sales velocity" },
    { type: "ARITHMETIC_OPERATOR", value: "+" },
    { type: "NUMERIC_LITERAL", value: "15%" },
    { type: "EOF", value: "<EOF>" },
  ]

  const tokens = new Lexer(inputText).lex()

  expect(tokens).toEqual(expectedTokens)
})

test("it should parse multiple rules in the same file", () => {})
