const { User } = require("models");

module.exports = async (email) => {
    try {
        const userData = await User.findOne({email});
        return userData
    } catch (error) {
        return false
    }
}