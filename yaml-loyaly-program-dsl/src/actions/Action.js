class Action {
  constructor(parameters) {
    this.parameters = parameters
  }

  // Execute this action for the given customer data
  interpret(customerData) {
    throw new Error("Must implement")
  }
}

module.exports = Action
