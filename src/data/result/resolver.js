const User = require('../../models/user');
const Simulation = require('../../models/simulation');
const { Result } = require('../../models/result');
const Messages = require('../../messages');
require('dotenv').config();

const resolvers = {
  Query: {
    async results(_, { simulation_id }, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var owner = await User.findById(user.id);
      if (!owner) {
        throw new Error(Messages.account_problem);
      }

      var simulation = owner.simulations.id(simulation_id);
      if (!simulation) {
        throw new Error(Messages.no_simulation_id);
      }

      return simulation.results;
    },
  },

  Mutation: {
    async create_result(_, { simulation_id }, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var owner = await User.findById(user.id);
      if (!owner) {
        throw new Error(Messages.account_problem);
      }

      var simulation = owner.simulations.id(simulation_id);
      if (!simulation) {
        throw new Error(Messages.no_simulation_id);
      }

      var result = new Result();

      simulation.results.push(result);
      owner.save();
      return result;
    },

    async set_duration(_, { simulation_id, result_id, duration}, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var owner = await User.findById(user.id);
      if (!owner) {
        throw new Error(Messages.account_problem);
      }

      var simulation = owner.simulations.id(simulation_id);
      if (!simulation) {
        throw new Error(Messages.no_simulation_id);
      }

      var result = simulation.results.id(result_id);
      if (!result) {
        throw new Error(Messages.no_result_id);
      }

      result.duration = duration;
      owner.save();

      return result;
    },
  }
};

module.exports = resolvers;
