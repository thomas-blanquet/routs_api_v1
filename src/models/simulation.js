const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;

const SimulationSchema = new Schema({
    duration: {
      type: Number,
      default: 0.0,
    }
});

SimulationSchema.pre('save', function (next) {
  if (this.seconds < 0) {
    return next(new Error('Duration of a simulation can\'t be negative'));
  }
  next();
});

var Simulation = mongoose.model('Simulation', SimulationSchema);
module.exports = {
  SimulationSchema: SimulationSchema,
  Simulation: Simulation
};
