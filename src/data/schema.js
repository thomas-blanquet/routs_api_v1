const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const User = require('./user/schema');
const Result = require('./result/schema');
const Simulation = require('./simulation/schema');

const Query = `
type Query {
  _empty: String
}`;

const Mutation =
`type Mutation {
  _empty: String
}`;

module.exports = makeExecutableSchema({
  typeDefs: [Query, Mutation, User, Simulation, Result],
  resolvers: resolvers
})
