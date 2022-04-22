'use strict';
require('dotenv').config();
const redis = require('redis');
// Import logger
const logger = require('./logger');
// Set up redis client
const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});
// Establish a redis connection
(async () => {
    try {
        await client.connect();
    } catch (ex) {
        logger.error({
            message: "Redis connection failed: " + ex.toString(),
            level: 'error',
        });
    }
})();
// Create new session
exports.createSession = async (key, value, isExpiry) => {
    try {
        isExpiry ?
            await client.set(key, JSON.stringify(value), 'EX', process.env.REDIS_EXP)
        :
            await client.set(key, JSON.stringify(value))
        ;
        return true;
    } catch (ex) {
        logger.error({
            message: ex.toString(),
            level: 'error',
        });
        return false;
    }
};
// Get a session details by key
exports.getSession = async (key) => {
    try {
        const redisData = await client.get(key);
        return JSON.parse(redisData);
    } catch (ex) {
        logger.error({
            message: ex.toString(),
            level: 'error',
        });
        return false;
    }
};
// Delete a session by key
exports.deleteSession = async (key) => {
    try {
        await client.del(key);
        return true;
    } catch (ex) {
        logger.error({
            message: ex.toString(),
            level: 'error',
        });
        return false;
    }
};