class Condition {
  // Maybe `value` is actually values because you may be comparing multiple things
  // and each condition knows how to evaluate itself?
  constructor(attribute, operation, values) {
    this.attribute = attribute
    this.operation = operation
    this.value = value
  }

  evaluate(customerData) {
    throw new Error("Must implement")
  }
}

export default Condition
