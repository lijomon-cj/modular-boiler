const { dbConnection } = require("./dbConnection");
const logger = require("./logger");
const password = require("./password");

module.exports = {
    dbConnection: dbConnection,
    logger: logger,
    password: password
}