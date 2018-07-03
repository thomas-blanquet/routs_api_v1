const User = require('../../models/user');
const Messages = require('../../messages');
const { Simulation } = require('../../models/simulation');

const resolvers = {
  Query: {
    async simulations(_, args, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      try {
        var user_db = await User.findById(user.id);
        var simulations = user_db.simulations;
      } catch (_) {
        throw new Error(Messages.account_problem);
      }
      return simulations;
    },
  },

  Mutation: {
    async create_simulation(_, args, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      const simulation = new Simulation();

      var owner = await User.findById(user.id);

      try {
        owner.simulations.push(simulation);
        owner.save();
      } catch(_) {
        throw new Error(Messages.account_problem);
      }
      return simulation;
    },

    async set_parameters(_, { id, parameters }, { user }) {
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var owner = await User.findById(user.id)
      if (!owner) {
        throw new Error(Messages.account_problem);
      }

      var simulation = owner.simulations.id(id);

      if (!simulation) {
        throw new Error(Messages.no_simulation_id);
      }

      if (simulation.results.lenght) {
        throw new Error(Messages.simulation_already_ran);
      }

      simulation.parameters = parameters;
      owner.save()

      return simulation;
    },
  }
};

module.exports = resolvers;
