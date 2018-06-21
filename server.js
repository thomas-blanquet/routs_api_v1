var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: (name) => {
    return 'Hello !';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql:true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
