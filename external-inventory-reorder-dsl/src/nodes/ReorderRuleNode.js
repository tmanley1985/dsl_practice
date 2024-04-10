const ASTNode = require("./ASTNode")

class ReorderRuleNode extends ASTNode {
  constructor(sku, condition, quantityExpression) {
    super("ReorderRule")
    this.sku = sku
    this.condition = condition
    this.quantityExpression = quantityExpression
  }
}

module.exports = ReorderRuleNode
