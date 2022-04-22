'use strict';
// Dependencies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Local modules
const userActions = require('user');
const loggerUtil = require('../utilities/logger');
// Serialize func
exports.serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
};
// Deserialize func
exports.deserializeUser = () => {
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userActions.getUserById(id);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      loggerUtil.log({
        level: 'error',
        message: error.toString(),
      });

      return done(error, false);
    }
  });
};
// Passport strategy
exports.configureStrategy = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userActions.getUserByEmail(username);
        if (!user) {
          return done(null, false);
        }

        const comparePassword = await user.matchPassword(password);
        if (!comparePassword) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        loggerUtil.log({
          level: 'error',
          message: error.toString(),
        });

        return done(error, false);
      }
    })
  );
};
