require('module-alias/register');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

const { logger, errorHandler } = require('utilities');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(
	express.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 1000000,
	})
);
app.use(express.json({ limit: '50mb' }));
app.use(morgan('combined'));

app.use(routes);

app.use(errorHandler);

const PORT = process.env.PORT;

server.listen(PORT, (err) => {
	if (err) {
		logger.error({
			message: `Server error - ${error.toString()}`,
			level: 'error',
		});
	} else {
		require('utilities').dbConnection();
		logger.log({
			message: `Server listening at port ${PORT} in ${process.env.NODE_ENV} mode`,
			level: 'info',
		});
	}
});

// Close server on getting Error: UnhandledPromiseRejection
process.on('unhandledRejection', (err, promise) => {
	logger.error({
		message: `Server error - ${err.toString()}`,
		level: 'error',
	});

	// Close server
	server.close(() => process.exit(1));
});
