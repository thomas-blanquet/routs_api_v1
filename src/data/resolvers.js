const { User } = require('../models/user')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()

const resolvers = {
  Query: {
    // fetch the profile of currenly athenticated user
    async me(_, args, { user }) {
      // make sure user is logged in
      if (!user) {
        throw new Error('You are not authenticated!')
      }

      return await User.findById(user.id)
    }
  },

  Mutation: {
    // Handle user signup
    async signup(_, { username, email, password }) {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10)
      })

      if (!user) {
        throw new Error('User with that email already exists')
      }

      // return json web token
      return jsonwebtoken.sign({
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET, {
          expiresIn: '1d'
        }
      )
    },

    // Handles user login
    async login(_, { email, password }) {
      const user = await User.findByEmail(email);

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign({
          id: user.id,
          email: user.email
        },
        process.env.JWT_SECRET, {
          expiresIn: '1d'
        }
      )
    }
  }
}

module.exports = resolvers
