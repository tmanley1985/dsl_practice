const ASTNode = require("./nodes/ASTNode")
const ReorderRuleNode = require("./nodes/ReorderRuleNode")
const SKUNode = require("./nodes/SKUNode")
const ConditionNode = require("./nodes/ConditionNode")
const ComparisonOperatorNode = require("./nodes/ComparisonOperatorNode")
const QuantityExpressionNode = require("./nodes/QuantityExpressionNode")
const VelocityMetricNode = require("./nodes/VelocityMetricNode")
const ArithmeticOperatorNode = require("./nodes/ArithmeticOperatorNode")
const PercentageNode = require("./nodes/PercentageNode")
const NumericExpressionNode = require("./nodes/NumericExpressionNode")

class Parser {
  constructor(tokens) {
    this.currentTokenIndex = 0
    this.tokens = tokens
  }

  parse() {
    const rules = []
    while (this.#peek()["type"] !== "EOF") {
      const rule = this.#parseReorderRule()
      rules.push(rule)
    }
    return rules
  }

  #nextToken() {
    if (this.currentTokenIndex < this.tokens.length) {
      // We get the token and also advance.
      return this.tokens[this.currentTokenIndex++]
    }
    return { type: "EOF", value: "<EOF>" }
  }

  #peek() {
    if (this.currentTokenIndex < this.tokens.length) {
      return this.tokens[this.currentTokenIndex]
    }
    return { type: "EOF", value: "<EOF>" }
  }

  #consume(expectedType) {
    const { type, value } = this.#nextToken()

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

  #parseReorderRule() {
    // Notice how we're simply consuming the reorder rule and moving on?
    // We need to get everything after this, but we don't care about this keyword.
    this.#consume("KEYWORD", "ReorderRule for:")
    const sku = this.#parseSKU()
    this.#consume("KEYWORD", "When:")
    const condition = this.#parseCondition()
    this.#consume("KEYWORD", "OrderQuantity:")
    const quantityExpression = this.#parseQuantityExpression()
    return new ReorderRuleNode(sku, condition, quantityExpression)
  }

  #parseSKU() {
    const skuToken = this.#consume("SKU")
    // Assuming the pattern for the IDENTIFIER tokens is 'SKU' followed by one or more digits.
    // Split the token's value based on space, expecting "SKU [number]"
    const parts = skuToken.split(" ")
    if (parts[0] !== "SKU" || parts.length !== 2 || isNaN(parts[1])) {
      throw new Error(`Invalid SKU format: ${skuToken}`)
    }
    // The numeric part of the SKU is parts[1]
    return new SKUNode(parts[1])
  }

  #parseCondition() {
    // TODO: Possibly I need to look at the left and right as expressions
    // that need to be evaluated in the future.
    const left = this.#consume("KEYWORD") // example StockLevel
    const comparisonOperator = this.#parseComparisonOperator()
    const right = this.#consume("KEYWORD") // example MinStockLevel
    return new ConditionNode(left, comparisonOperator, right)
  }

  #parseComparisonOperator() {
    const operator = this.#consume("COMPARISON_OPERATOR")
    return new ComparisonOperatorNode(operator)
  }

  #parseQuantityExpression() {
    const numericExpression = this.#parseNumericExpression()
    const velocityMetric = this.#parseVelocityMetric()
    const arithmeticOperator = this.#parseArithmeticOperator()
    const percentage = this.#parsePercentage()
    return new QuantityExpressionNode(
      numericExpression,
      velocityMetric,
      arithmeticOperator,
      percentage
    )
  }

  #parseVelocityMetric() {
    const metric = this.#consume("VELOCITY_METRIC")
    return new VelocityMetricNode(metric)
  }

  #parseArithmeticOperator() {
    const operator = this.#consume("ARITHMETIC_OPERATOR")
    return new ArithmeticOperatorNode(operator)
  }

  #parsePercentage() {
    const value = this.#consume("NUMERIC_LITERAL")
    if (!value.endsWith("%")) {
      throw new Error("Expected percentage.")
    }
    return new PercentageNode(value)
  }

  #parseNumericExpression() {
    const value = this.#consume("NUMERIC_LITERAL")
    return new NumericExpressionNode(value)
  }
}

module.exports = Parser
