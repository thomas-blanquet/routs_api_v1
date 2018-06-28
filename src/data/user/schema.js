const User =
`type User {
  id: String!
  username: String!
  email: String!
  simulations: [Simulation]!
}`

module.exports = User;
