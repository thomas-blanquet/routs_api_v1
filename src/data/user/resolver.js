const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    // fetch the profile of currenly athenticated user
    async me(_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      var test = await User.findById(user.id);
      if (!test) {
        throw new Error('Error occured with your account, retry or report to support service');
      }

      return test;
    },
  },

  Mutation: {
    // Handle user signup
    async signup(_, { username, email, password }) {
      const userExist = await User.findByEmail(email);

      if (userExist) {
          throw new Error('User with that email already exists');
      }

      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10)
      });
      const newUser = user.save();

      // return json web token
      return jsonwebtoken.sign({
          id: newUser.id,
          email: newUser.email
        },
        process.env.JWT_SECRET, {
          expiresIn: '1d'
        });
    },

    // Handles user login
    async login(_, { email, password }) {
      const user = await User.findByEmail(email);

      if (!user) {
        throw new Error('No user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      // return json web token
      return jsonwebtoken.sign({
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET, {
          expiresIn: '1d'
        });
    },
  }
};

module.exports = resolvers;
