const { prettyPrint } = require("./utils/helpers.js")
class Interpreter {
  static interpret(program, checkout) {
    prettyPrint(program)
    program.run(checkout)
  }
}

module.exports = Interpreter
