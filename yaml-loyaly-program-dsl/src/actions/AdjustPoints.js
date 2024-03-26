import Action from "./Action"

class AdjustPoints extends Action {
  constructor(parameters) {
    this.parameters = parameters
  }

  interpret(checkout) {
    const totalPointsForToday = this._getCustomerPointsForToday(
      checkout.customer.cart
    )
    const adjustedPoints = totalPointsForToday * this.parameters.multiplier

    checkout.customer.points += adjustedPoints

    return checkout
  }

  _getCustomerPointsForToday(customerCart) {
    // Each dollar gives you a point. We remove cents here.
    return Math.floor(customerCart.amount)
  }
}

module.exports = AdjustPoints
