const User = require('../../models/user');
const { Simulation } = require('../../models/simulation');

const resolvers = {
  Query: {
    async simulations(_, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      try {
        var user_db = await User.findById(user.id);
        var simulations = user_db.simulations;
      } catch (_) {
        throw new Error('Error occured with your account, retry or report to support service');
      }
      return simulations;
    },
  },

  Mutation: {
    async create_simulation(_, { duration }, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      const simulation = new Simulation({
        duration,
      });

      var owner = await User.findById(user.id);

      try {
        owner.simulations.push(simulation);
        owner.save();
      } catch(_) {
        throw new Error('Error occured with your account, retry or report to support service');
      }
      return simulation;
    },
  }
};

module.exports = resolvers;
