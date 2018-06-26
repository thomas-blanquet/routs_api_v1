const mongoose = require('mongoose');
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
      type:String
      required:true
    },
});

UserSchema.static('findByEmail', function (email, callback) {
  return this.findOne({ email: email }, callback);
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
