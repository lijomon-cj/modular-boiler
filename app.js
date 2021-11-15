const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan =  require('morgan')
const dotenv = require('dotenv').config('./.env')

const loggerUtil = require('./utils/logger');
const routes = require('./routes')

const app = express();
const server = http.createServer(app);
app.use(cors())
app.use(
    express.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 1000000,
    })
);
app.use(express.json({ limit: '50mb' }));
app.use(morgan('combined'));

app.use(routes)

const PORT = process.env.PORT;

server.listen(PORT, (err) => {
    if (err) {
        loggerUtil.error({
            message: `Server error - ${error.toString()}`,
            level: 'error',
          });
    } else {
        require('./utils/dbConnection');
        loggerUtil.log({
            message: `Server listening at port ${PORT} in ${process.env.NODE_ENV} mode`,
            level: 'info',
          });
    }
})