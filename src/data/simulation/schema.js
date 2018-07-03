const Simulation =`
extend type Query {
    simulations: [Simulation]!
}

extend type Mutation {
  create_simulation: Simulation!
  set_parameters(id: String!, parameters: String!): Simulation!
}

type Simulation {
  id: String!
  parameters: String
  results: [Result]!
}`

module.exports = Simulation;
