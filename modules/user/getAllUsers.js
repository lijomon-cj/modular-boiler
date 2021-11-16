const User = require("../../models/user")

const messages = require('@constants/messages')

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    return res.status(200).json({
        success: true,
        message: messages.user.user_details_found,
        data: users
    })
}