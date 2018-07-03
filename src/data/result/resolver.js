const User = require('../../models/user');
const Simulation = require('../../models/simulation');
const { Result } = require('../../models/result');
const Messages = require('../../messages');
require('dotenv').config();

const resolvers = {
  Query: {
    async results(_, { simulation }, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var owner = await User.findById(user.id);
      if (!owner) {
        throw new Error(Messages.account_problem);
      }

      var simulation = owner.simulations.id(simulation);
      if (!simulation) {
        throw new Error(Messages.no_simulation_id);
      }

      return simulation.results;
    },
  },

  Mutation: {
    async create_result(_, { simulation }, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var owner = await User.findById(user.id);
      if (!owner) {
        throw new Error(Messages.account_problem);
      }

      var simulation = owner.simulations.id(simulation);
      if (!simulation) {
        throw new Error(Messages.no_simulation_id);
      }

      var result = new Result();

      simulation.results.push(result);
      owner.save();
      return result;
    },
  }
};

module.exports = resolvers;
