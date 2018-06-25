const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/data/schema');
const jwt = require('express-jwt');
const mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();

// create our express app
const app = express();

const PORT = process.env.PORT || 8080;

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

app.use(cors());

// graphql endpoint
app.use(
  '/api',
  bodyParser.json(),
  auth,
  graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
      user: req.user
    }
  }))
);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL);

app.listen(PORT, () => {
  console.log(`The server is running on {url}:${PORT}/api`)
});
