var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var port = process.env.PORT || 8080;

var schema = buildSchema(`
  type Query {
    hello: String
    quote: String
    random: Float!
    rollTreeDices: [Int]
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
    rollThreeDices: () => {
	return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
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
