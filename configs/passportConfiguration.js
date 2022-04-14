'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userActions = require('user');
const loggerUtil = require('../utilities/logger');

exports.serializeUser = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
};

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

exports.configureStrategy = () => {
    console.log('here 1');
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await userActions.getUserByEmail(username);
        console.log(user);
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
