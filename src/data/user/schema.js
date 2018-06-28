const User = `
extend type Query {
    me: User
}

extend type Mutation {
  signup (username: String!, email: String!, password: String!): String
  login (email: String!, password: String!): String
}

type User {
  id: String!
  username: String!
  email: String!
  simulations: [Simulation]!
}`;

module.exports = User;
