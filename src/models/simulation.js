const mongoose = require('mongoose');
const { ResultSchema } = require('./result');
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;

const SimulationSchema = new Schema({
    parameters: {
      type: String,
      default: "",
    },
    results: [ ResultSchema ],
});

var Simulation = mongoose.model('Simulation', SimulationSchema);
module.exports = {
  SimulationSchema: SimulationSchema,
  Simulation: Simulation
};
