const User = require("../../models/user");

const { messages } = require('consts')
const { response } = require('utilities')

exports.signup = async (req, res, next) => {
    const {firstName, lastName = '', email, password} = req.body;
    try {
        const user = await User.create(req.body);
        return response.successResponse(res, messages.auth.signup_success);
    } catch (error) {
        return response.serverErrorResponse(res, error);
    }
}