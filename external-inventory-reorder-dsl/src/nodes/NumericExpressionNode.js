const ASTNode = require("./ASTNode")

class NumericExpressionNode extends ASTNode {
  constructor(value) {
    super("NumericExpression")
    this.value = value
  }
}

module.exports = NumericExpressionNode
