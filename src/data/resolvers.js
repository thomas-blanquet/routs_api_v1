const User = require('./user/resolver');
const Simulation = require('./simulation/resolver');
const Result = require('./result/resolver');
const { merge } = require('lodash');

module.exports = merge(Simulation, User, Result);
