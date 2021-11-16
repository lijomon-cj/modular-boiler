const User = require("../../models/user");

exports.signup = async (req, res, next) => {
    const {firstName, lastName = '', email, password} = req.body;
    try {
        const user = await User.create(req.body);
        return res.status(200).json({
            success: true,

        })
    } catch (error) {
        
    }
}