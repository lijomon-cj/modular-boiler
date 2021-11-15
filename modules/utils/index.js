const { dbConnection } = require("./dbConnection");
const logger = require("./logger");

module.exports = {
    dbConnection: dbConnection,
    logger: logger
}