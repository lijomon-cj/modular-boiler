require('module-alias/register');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
// Dependencies
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
// Local modules
const { logger, errorHandler } = require('utilities');
const passportConfig = require('./configs/passportConfiguration');
const routes = require('./routes');
// Init app
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
// Configure passport module
app.use(passport.initialize());
passportConfig.serializeUser();
passportConfig.deserializeUser();
passportConfig.configureStrategy();
// Mount routes
app.use(routes);
// Error handler (Optional)
app.use(errorHandler);
// Define application port
const PORT = process.env.PORT;
// Start server
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
