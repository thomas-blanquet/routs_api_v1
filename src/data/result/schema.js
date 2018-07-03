const Result =`
extend type Query {
    results (simulation: String!): [Result]!
}

extend type Mutation {
  create_result (simulation: String!): Result!
}

type Result {
  id: String!
  duration: Float
}`

module.exports = Result;
