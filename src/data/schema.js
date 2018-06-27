const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
      type Simulation {
        id: String!
        duration: Float
      }

      type User {
        id: String!
        username: String!
        email: String!
        simulations: [Simulation]!
      }

      type Query {
        me: User
        simulations: [Simulation]!
      }

      type Mutation {
        signup (username: String!, email: String!, password: String!): String
        login (email: String!, password: String!): String
        create_simulation (duration: Float!): Simulation!
      }
    `
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
