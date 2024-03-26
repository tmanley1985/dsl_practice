const prettyPrint = value => {
  console.log(JSON.stringify(value, null, 2))
}

module.exports = {
  prettyPrint,
}
