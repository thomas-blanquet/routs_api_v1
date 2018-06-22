var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');

var port = process.env.PORT || 8080;

var schema = buildSchema(`
  type Dice {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!) : [Int]
  }

  type Query {
    getDice(numSides: Int): Dice
  }
`);

class Dice {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(1 + Math.floor(Math.random() * this.numSides));
    }
    return output;
  }
}

var root = {
  getDice: function({numSides}) {
    return new Dice(numSides || 6);
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port);
console.log('Running a GraphQL API server at ' + port);
