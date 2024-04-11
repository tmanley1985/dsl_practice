const ASTNode = require("./ASTNode")

class ConditionNode extends ASTNode {
  constructor(left, comparisonOperator, right) {
    super("Condition")
    this.left = left
    this.comparisonOperator = comparisonOperator
    this.right = right
  }
}

module.exports = ConditionNode
