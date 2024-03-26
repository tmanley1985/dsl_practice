class Condition {
  // Maybe `value` is actually values because you may be comparing multiple things
  // and each condition knows how to evaluate itself?
  constructor(attribute, entity, operation, parameters) {
    this.attribute = attribute
    this.entity = entity
    this.operation = operation
    this.parameters = parameters
  }

  interpret(customerData) {
    throw new Error("Must implement")
  }
}

module.exports = Condition
