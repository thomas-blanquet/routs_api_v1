var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var port = process.env.PORT || 8080;

var schema = buildSchema(`
  type Query {
    hello: String
    quote: String
    random: Float!
    rollDices(numDices: Int!, numSides: Int): [Int]
  }
`);

var root = {
    hello: () => {
	return 'Hello !';
    },
    quote: () => {
	return Math.random() > 0.5 ? "It is what it is" : "Shit happens";
    },
    random: () => {
	return Math.random();
    },
    rollDices: function ({numDices, numSides}) {
	var output = [];
	for (var i = 0; i < numDices; i++) {
	    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
	}
	return output;
    },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql:true,
}));

app.listen(port);
console.log('Running a GraphQL API server at ' + port);
