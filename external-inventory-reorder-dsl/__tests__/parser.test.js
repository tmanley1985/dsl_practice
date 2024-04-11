const fs = require("fs")
const Lexer = require("../src/Lexer")
const Parser = require("../src/Parser")

test("it should correctly parse the dsl when given valid tokens", () => {
  const tokens = [
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

  const ast = new Parser(tokens).parse()

  expect(ast.length).toBe(1)
  expect(ast[0].type).toBe("ReorderRule")
})
