class Action {
  constructor(type, details) {
    this.type = type
    this.details = details
  }

  // Execute this action for the given customer data
  interpret(customerData) {
    throw new Error("Must implement")
  }
}

module.exports = Action
