// Dependencies
const passport = require('passport');
// Local modules
const { response, errorResponse, redis } = require('utilities');
const { messages } = require('configs');
/**
 * USER LOGIN FUNC
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @returns 
 */
module.exports = async (req, res, next) => {
  try {
    // Authenticate with passport
    passport.authenticate('local', async function (_err, user) {
      if (!user) return response.notFound(res, messages.auth.invalid_login);
      const token = await user.generateToken(); // Generate token
      // Create a redis session
      await redis.createSession(
        token,
        {
          id: user.id,
        },
        false
      );
      return response.success(res, messages.auth.logged_in, {
        userId: user._id,
        token
      });
    })(req, res, next);
  } catch (error) {
    return next(new errorResponse('Error fetching user details', 500)); // Error response
  }
};
