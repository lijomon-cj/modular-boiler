const User = require('../../models/user');

const { messages } = require('configs');
const { response, errorResponse } = require('utilities');

exports.signup = async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		return response.successResponse(res, messages.auth.signup_success, user);
	} catch (error) {
		return next(new errorResponse('Invalid payload', 400));
	}
};
