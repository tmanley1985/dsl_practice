const ASTNode = require("./ASTNode")

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

module.exports = QuantityExpressionNode
