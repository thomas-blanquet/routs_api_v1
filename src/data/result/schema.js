const Result =`
extend type Query {
    results (simulation_id: String!): [Result]!
}

extend type Mutation {
  create_result (simulation_id: String!): Result!
  set_duration(simulation_id: String!, result_id: String!, duration: Float!): Result!
}

type Result {
  id: String!
  duration: Float
}`

module.exports = Result;
