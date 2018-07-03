const User = require('../../models/user')
const Messages = require('../../messages');
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    // fetch the profile of currenly athenticated user
    async me(_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error(Messages.not_authorized);
      }

      var test = await User.findById(user.id);
      if (!test) {
        throw new Error(Messages.account_problem);
      }

      return test;
    },
  },

  Mutation: {
    // Handle user signup
    async signup(_, { username, email, password }) {
      const userExist = await User.findByEmail(email);

      if (userExist) {
        throw new Error(Messages.already_exists);
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
        throw new Error(Messages.no_user_email);
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error(Messages.incorrect_password);
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
