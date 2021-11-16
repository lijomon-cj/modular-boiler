
const config = require('../../config');
const logger = require('@utils/logger');
const { messages } = require('@constants');

exports.successResponse = (res, message, data) => {
  const response = {
    success: true,
    message: message,
  };

  if (data) {
    response.data = data;
  }

  logger.log({
    message: 'error',
    level: 'error',
  });

  res.status(config.HTTP_STATUS_CODES.OK)
    .send(response);
};

exports.serverErrorResponse = (res, error) => {
  logger.error({
    message: error.stack,
    level: 'error',
  });
  res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
    .send({
      success: false,
      message: messages.server_error,
    });
};