const Action = require("./Action.js")

class AdjustPoints extends Action {
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
