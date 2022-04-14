const authentication = require("./authentication");
const validateRequest = require("./validateRequest");

module.exports = {
    authentication: authentication,
    validate: validateRequest
}