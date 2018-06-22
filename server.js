var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  buildSchema
} = require('graphql');

var port = process.env.PORT || 8080;
var fakeDataBase = {};

var schema = buildSchema(`
  input UserInput {
    name: String
    email: String
  }

  type User {
    id: ID!
    name: String
    email: String
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
`);

class User {
  constructor(id, {name, email}) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  createUser({input}) {
    var id = require('crypto').randomBytes(10).toString('hex');
    fakeDatabase[id] = input;

    return new User(id, input);
  }

  updateUser({id, input}) {
    if (!fakeDataBase[id]) {
      throw new Error('No user exists with id ' + id);
    }
    fakeDatabase[id] = input;
    return new User(id, input);
  }

  getUser({id}) {
    if (!fakeDataBase[id]) {
      throw new Error('No user exists with id ' + id);
    }
    return new User(id, fakeDataBase[id]);
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
