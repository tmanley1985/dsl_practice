const ASTNode = require("./ASTNode")

class ComparisonOperatorNode extends ASTNode {
  constructor(operator) {
    super("ComparisonOperator")
    this.operator = operator
  }
}

module.exports = ComparisonOperatorNode
