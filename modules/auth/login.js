const { response } = require('utilities');

exports.login = async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return response.serverErrorResponse(res, "Body empty")
    }

    return response.successResponse(res, null, {})
}