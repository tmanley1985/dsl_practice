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

class Lexer {
  constructor(inputText) {
    this.inputText = inputText
  }

  lex() {
    let tokens = []
    let match = null

    while (this.inputText.length > 0) {
      let matched = false

      // Check if the current segment starts with "Description:"
      if (/^Description:/.test(this.inputText)) {
        // Find the next newline character to skip the description content
        const nextNewline = this.inputText.indexOf("\n")
        if (nextNewline === -1) {
          // If there's no newline, then we're at the end of the file
          break
        } else {
          // Skip over the description content
          this.inputText = this.inputText.substring(nextNewline)
          continue // Skip the rest of the loop and continue with the next line
        }
      }

      tokenTypes.forEach(tokenType => {
        if (!matched && (match = this.inputText.match(tokenType.pattern))) {
          matched = true
          if (tokenType.type !== "WHITESPACE") {
            tokens.push({
              type: tokenType.type,
              value: match[0].trim(),
            })
          }
          this.inputText = this.inputText.substring(match[0].length)
        }
      })

      if (!matched) {
        throw new Error(`Unexpected token: ${this.inputText}`)
      }
    }

    // If there are no more tokens to parse, we've reached the end of the file.
    tokens.push({ type: "EOF", value: "<EOF>" })

    return tokens
  }
}

module.exports = Lexer
