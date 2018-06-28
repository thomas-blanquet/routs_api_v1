const Simulation =`
extend type Query {
    simulations: [Simulation]!
}

extend type Mutation {
  create_simulation (duration: Float!): Simulation!
}

type Simulation {
  id: String!
  duration: Float
}`

module.exports = Simulation;
