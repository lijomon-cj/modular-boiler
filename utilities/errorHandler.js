const ErrorResponse = require('./errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	console.log(err.stack);

	if (err.name === 'CastError') {
		const message = `Resource not found with ID of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	if (err.code === 11000) {
		const message = `Duplicate field value entered`;
		error = new ErrorResponse(message, 400);
	}

	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((val) => val.message);
		error = new ErrorResponse(message, 400);
	}

	let message = '';

	switch (err.statusCode) {
		case 400:
			message = 'Invalid payload';
			break;
		case 404:
			message = 'No matching results found on server';
			break;
		case 500:
			message = 'Internal server error';
			break;
		default:
			message = 'Something went wrong';
			break;
	}

	res.status(error.statusCode || 500).json({
		success: false,
		message: error.message,
		error: {
			code: error.statusCode || 500,
			message: message || 'Something went wrong. Please try agail later.',
		},
	});
};

module.exports = errorHandler;
