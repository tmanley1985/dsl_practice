const parse = require("./src/Parser")

const tokenTypes = [
  {
    type: "KEYWORD",
    pattern:
      /^(ReorderRule for:|When:|StockLevel|MinStockLevel|OrderQuantity:)/,
  },
  // Because this dsl is really limited, I do not need an identifier here.
  // Maybe for my next dsl I'll add something more generic.
  { type: "SKU", pattern: /^SKU\s[0-9]+/ },
  { type: "NUMERIC_LITERAL", pattern: /^[0-9]+(%?)/ },
  {
    type: "VELOCITY_METRIC",
    pattern: /^(weeks|months)\s(sales|restocking|demand)\svelocity/,
  },
  { type: "ARITHMETIC_OPERATOR", pattern: /^[\+\-]/ },
  { type: "COMPARISON_OPERATOR", pattern: /^(<|>|<=|>=|==)/ },
  { type: "LOGICAL_OPERATOR", pattern: /^(AND|OR)\b/ },
  { type: "STRING_LITERAL", pattern: /^'[^']*'/ },
  { type: "WHITESPACE", pattern: /^\s+/ },
]

function lexer(inputText) {
  let tokens = []
  let match = null

  while (inputText.length > 0) {
    let matched = false

    // Check if the current segment starts with "Description:"
    if (/^Description:/.test(inputText)) {
      // Find the next newline character to skip the description content
      const nextNewline = inputText.indexOf("\n")
      if (nextNewline === -1) {
        // If there's no newline, then we're at the end of the file
        break
      } else {
        // Skip over the description content
        inputText = inputText.substring(nextNewline)
        continue // Skip the rest of the loop and continue with the next line
      }
    }

    tokenTypes.forEach(tokenType => {
      if (!matched && (match = inputText.match(tokenType.pattern))) {
        matched = true
        if (tokenType.type !== "WHITESPACE") {
          tokens.push({
            type: tokenType.type,
            value: match[0].trim(),
          })
        }
        inputText = inputText.substring(match[0].length)
      }
    })

    if (!matched) {
      throw new Error(`Unexpected token: ${inputText}`)
    }
  }

  // If there are no more tokens to parse, we've reached the end of the file.
  tokens.push({ type: "EOF", value: "<EOF>" })

  return tokens
}

const inputText = `
ReorderRule for: SKU 12345
When: StockLevel < MinStockLevel
OrderQuantity: 3 weeks sales velocity + 15%

Description: Ignored content - Some long description that may be a lot of text and contains numbers such as 5 and operators like *.
`

const tokens = lexer(inputText)

const ast = parse(tokens)

console.log(ast)
