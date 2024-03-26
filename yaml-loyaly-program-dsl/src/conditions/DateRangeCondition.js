const Condition = require("./Condition")

class DateRangeCondition extends Condition {
  // Todo: Refactor to inject date to check.
  interpret(customerData, dateToCheck = Date.now()) {
    switch (this.operation) {
      case "within_inclusive":
        return this.withinInclusive(dateToCheck)
      default:
        throw new Error("Unrecognized operation for the DateRange condition.")
    }
  }
  withinInclusive(date) {
    const startDate = new Date(this.parameters.start)
    const endDate = new Date(this.parameters.end)
    return date >= startDate && date <= endDate
  }
}

module.exports = DateRangeCondition
