const User = require("../../models/user")

const config = require('../../config')

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    return res.status(200).json({
        success: true,
        message: config.messages.user.user_details_found,
        data: users
    })
}