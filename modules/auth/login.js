const { response, errorResponse, logger } = require('utilities');
const User = require('../../models/user');
const { messages } = require('configs');

exports.login = async (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return next(new errorResponse('Username, Password mandatory', 400));
	}

	try {
		const user = await User.findOne({
			email: username,
		});

		if (!user) {
			return next(new errorResponse('User details not found', 404));
		}

		const isMatch = await user.matchPassword(password);

		response.successResponse(res, messages.user.user_details_found, user);
	} catch (error) {
		console.log(error);
		return next(new errorResponse('Error fetching user details', 500));
	}
};
