const ASTNode = require("./ASTNode")

class PercentageNode extends ASTNode {
  constructor(value) {
    super("Percentage")
    this.value = value
  }
}

module.exports = PercentageNode
