const User = require("../../models/user")

const { messages } = require('@constants')
const { response } = require('@utils')

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    return response.successResponse(
        res, 
        messages.user.user_details_found,
        users
    )
}