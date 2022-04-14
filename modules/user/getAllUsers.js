const { User } = require('models');

const { messages } = require('configs');
const { response } = require('utilities');

module.exports = async (req, res, next) => {
  const users = await User.find();
  return response.successResponse(res, messages.user.user_details_found, users);
};
