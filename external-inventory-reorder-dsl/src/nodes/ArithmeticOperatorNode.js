const ASTNode = require("./ASTNode")

class ArithmeticOperatorNode extends ASTNode {
  constructor(operator) {
    super("ArithmeticOperator")
    this.operator = operator
  }
}

module.exports = ArithmeticOperatorNode
