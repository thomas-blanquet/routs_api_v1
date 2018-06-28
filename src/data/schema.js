const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const User = require('./user/schema');
const Simulation = require('./simulation/schema');

// Define our schema using the GraphQL schema language
const Query =
`type Query {
  me: User
  simulations: [Simulation]!
}`;

const Mutation =
`type Mutation {
  signup (username: String!, email: String!, password: String!): String
  login (email: String!, password: String!): String
  create_simulation (duration: Float!): Simulation!
}`;

module.exports = makeExecutableSchema({
  typeDefs: [User, Simulation, Query, Mutation],
  resolvers: resolvers
})
