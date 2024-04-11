const ASTNode = require("./ASTNode")

class SKUNode extends ASTNode {
  constructor(value) {
    super("SKU")
    this.value = value
  }
}

module.exports = SKUNode
