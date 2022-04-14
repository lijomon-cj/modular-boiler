const { httpStatus } = require('configs');
const logger = require('utilities/logger');

exports.successResponse = (res, message, data) => {
  const response = {
    success: true,
    message: message,
  };

  if (data) {
    response.data = data;
  }

  res.status(httpStatus.OK).send(response);
};

exports.serverError = (res, error) => {
  const response = {
    success: false,
    message: messages.serverError,
  };

  if (error) {
    response.error = error.message;

    logger.log({
      message: 'error',
      level: 'error',
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(response);
};

exports.forbidden = (res, message) => {
  res.status(httpStatus.FORBIDDEN).send({
    success: false,
    message: message,
  });
};

exports.badRequest = (res, message, error) => {
  const response = {
    success: false,
    message: message || 'Invalid request',
  };

  if (error) {
    response.error = error;
  }
  res.status(httpStatus.BAD_REQUEST).send(response);
};

exports.notFound = (res, message) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: message || messages.notFound,
  });
};

exports.unauthorized = (res) => {
  res.status(httpStatus.UNAUTHORIZED).send({
    success: false,
    message: messages.unauthorized,
  });
};
