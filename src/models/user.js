const mongoose = require('mongoose');
const { SimulationSchema } = require('./simulation');
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
    username: {
      type:String,
      default:""
    },
    email: {
      type:String,
      required:true
    },
    password: {
      type:String,
      required:true
    },
    simulations: [SimulationSchema],
});

UserSchema.static('findByEmail', function (email, callback) {
  return this.findOne({ email: email }, callback);
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
