class ASTNode {
  constructor(type) {
    this.type = type
  }
}

class ReorderRuleNode extends ASTNode {
  constructor(sku, condition, quantityExpression) {
    super("ReorderRule")
    this.sku = sku
    this.condition = condition
    this.quantityExpression = quantityExpression
  }
}

class SKUNode extends ASTNode {
  constructor(value) {
    super("SKU")
    this.value = value
  }
}

class ConditionNode extends ASTNode {
  constructor(left, comparisonOperator, right) {
    super("Condition")
    this.left = left
    this.comparisonOperator = comparisonOperator
    this.right = right
  }
}

class ComparisonOperatorNode extends ASTNode {
  constructor(operator) {
    super("ComparisonOperator")
    this.operator = operator
  }
}

class QuantityExpressionNode extends ASTNode {
  constructor(
    numericExpression,
    velocityMetric,
    arithmeticOperator,
    percentage
  ) {
    super("QuantityExpression")
    this.numericExpression = numericExpression
    this.velocityMetric = velocityMetric
    this.arithmeticOperator = arithmeticOperator
    this.percentage = percentage
  }
}

class VelocityMetricNode extends ASTNode {
  constructor(metric) {
    super("VelocityMetric")
    this.metric = metric
  }
}

class ArithmeticOperatorNode extends ASTNode {
  constructor(operator) {
    super("ArithmeticOperator")
    this.operator = operator
  }
}

class PercentageNode extends ASTNode {
  constructor(value) {
    super("Percentage")
    this.value = value
  }
}

class NumericExpressionNode extends ASTNode {
  constructor(value) {
    super("NumericExpression")
    this.value = value
  }
}

// Parser implementation
function parse(tokens) {
  let currentTokenIndex = 0

  console.log(tokens)

  function nextToken() {
    console.log("GOT IN NEXT TOKEN")
    if (currentTokenIndex < tokens.length) {
      console.log(tokens[currentTokenIndex])
      return tokens[currentTokenIndex++]
    }
    return { type: "EOF", value: "<EOF>" }
  }

  function peek() {
    if (currentTokenIndex < tokens.length) {
      return tokens[currentTokenIndex]
    }
    return { type: "EOF", value: "<EOF>" }
  }

  function consume(expectedType) {
    const { type, value } = nextToken()

    // If you're expecting a certain type and the next token isn't that
    // then of course you need to error. For example for this input string:
    // '(1 + 1)), if we're on the second to last paren, we would NOT expect
    // another paren right?
    if (type !== expectedType) {
      throw new Error(
        `Expected ${expectedType}, found ${type} with value ${value}`
      )
    }
    return value
  }

  function parseReorderRule() {
    // Notice how we're simply consuming the reorder rule and moving on?
    // We need to get everything after this, but we don't care about this keyword.
    consume("KEYWORD", "ReorderRule for:")
    const sku = parseSKU()
    consume("KEYWORD", "When:")
    const condition = parseCondition()
    consume("KEYWORD", "OrderQuantity:")
    const quantityExpression = parseQuantityExpression()
    return new ReorderRuleNode(sku, condition, quantityExpression)
  }

  function parseSKU() {
    const skuToken = consume("SKU")
    // Assuming the pattern for the IDENTIFIER tokens is 'SKU' followed by one or more digits.
    // Split the token's value based on space, expecting "SKU [number]"
    const parts = skuToken.split(" ")
    if (parts[0] !== "SKU" || parts.length !== 2 || isNaN(parts[1])) {
      throw new Error(`Invalid SKU format: ${skuToken}`)
    }
    // The numeric part of the SKU is parts[1]
    return new SKUNode(parts[1])
  }

  function parseCondition() {
    // TODO: Possibly I need to look at the left and right as expressions
    // that need to be evaluated in the future.
    const left = consume("KEYWORD") // example StockLevel
    const comparisonOperator = parseComparisonOperator()
    const right = consume("KEYWORD") // example MinStockLevel
    return new ConditionNode(left, comparisonOperator, right)
  }

  function parseComparisonOperator() {
    const operator = consume("COMPARISON_OPERATOR")
    return new ComparisonOperatorNode(operator)
  }

  function parseQuantityExpression() {
    const numericExpression = parseNumericExpression()
    const velocityMetric = parseVelocityMetric()
    const arithmeticOperator = parseArithmeticOperator()
    const percentage = parsePercentage()
    return new QuantityExpressionNode(
      numericExpression,
      velocityMetric,
      arithmeticOperator,
      percentage
    )
  }

  function parseVelocityMetric() {
    const metric = consume("VELOCITY_METRIC")
    return new VelocityMetricNode(metric)
  }

  function parseArithmeticOperator() {
    const operator = consume("ARITHMETIC_OPERATOR")
    return new ArithmeticOperatorNode(operator)
  }

  function parsePercentage() {
    const value = consume("NUMERIC_LITERAL")
    if (!value.endsWith("%")) {
      throw new Error("Expected percentage.")
    }
    return new PercentageNode(value)
  }

  function parseNumericExpression() {
    const value = consume("NUMERIC_LITERAL")
    return new NumericExpressionNode(value)
  }

  // Assuming multiple ReorderRules can be defined in a single file
  function parseFile() {
    const rules = []
    while (peek()["type"] !== "EOF") {
      const rule = parseReorderRule()
      rules.push(rule)
    }
    return rules
  }

  return parseFile()
}

// Example usage:
// Assume `tokens` is an array of tokens, where each token is a [type, value] pair,
// like [['ReorderRule for', ''], ['SKU', '123'], ...];
// const ast = parse(tokens);
// console.log(ast);

module.exports = parse
