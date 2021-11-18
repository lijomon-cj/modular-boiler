const User = require('../../models/user');

const { messages } = require('configs');
const { response } = require('utilities');

exports.getAllUsers = async (req, res, next) => {
	const users = await User.find();
	return response.successResponse(res, messages.user.user_details_found, users);
};
