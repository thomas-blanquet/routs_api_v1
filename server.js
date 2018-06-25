const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/data/schema');
const jwt = require('express-jwt');
const Sequelize = require('sequelize');
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

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`The server is running on {url}:${PORT}/api`)
});
