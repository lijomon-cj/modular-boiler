const { User } = require("models");

module.exports = async (id) => {
    try {
        const userData = await User.findById({_id: id});
        return userData
    } catch (error) {
        return false
    }
}