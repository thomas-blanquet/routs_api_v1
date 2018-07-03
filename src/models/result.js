const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;

const ResultSchema = new Schema({
    duration: {
      type: Number,
      default: 0.0,
    },
});

var Result = mongoose.model('Result', ResultSchema);
module.exports = {
  ResultSchema: ResultSchema,
  Result: Result
};
