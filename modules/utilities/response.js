const config = require('../../config');
const logger = require('utilities/logger');
const { messages } = require('configs');

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

	res.status(config.HTTP_STATUS_CODES.OK).send(response);
};
