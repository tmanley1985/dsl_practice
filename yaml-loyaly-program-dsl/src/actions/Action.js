class Action {
  constructor(type, details) {
    this.type = type
    this.details = details
  }

  // Execute this action for the given customer data
  execute(customerData) {
    throw new Error("Must implement")
  }
}
