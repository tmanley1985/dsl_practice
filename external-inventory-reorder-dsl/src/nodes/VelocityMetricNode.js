const ASTNode = require("./ASTNode")

class VelocityMetricNode extends ASTNode {
  constructor(metric) {
    super("VelocityMetric")
    this.metric = metric
  }
}

module.exports = VelocityMetricNode
