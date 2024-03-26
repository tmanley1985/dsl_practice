const AdjustPoints = require("./AdjustPoints.js")

class ActionFactory {
  static make(type, parameters) {
    switch (type) {
      case "adjust_points":
        return new AdjustPoints(parameters)
      default:
        throw new Error(`Unknown condition type: ${type}`)
    }
  }
}

module.exports = ActionFactory
