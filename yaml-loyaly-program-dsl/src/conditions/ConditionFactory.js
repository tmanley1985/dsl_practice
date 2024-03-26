const DateRangeCondition = require("./DateRangeCondition.js")

class ConditionFactory {
  static make(type, attribute, entity, operation, parameters) {
    switch (type) {
      case "date_range":
        return new DateRangeCondition(attribute, entity, operation, parameters)
      default:
        throw new Error(`Unknown condition type: ${type}`)
    }
  }
}

module.exports = ConditionFactory
