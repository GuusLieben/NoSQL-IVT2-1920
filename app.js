const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Initiate app and pass it to router management
const app = express();
require('./routes/routes.bin').app(app);

const port = process.env.PORT || 3000;

// General configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Request filters
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Error handlers
app.use((req, res, next) => {
    res.json({error: next})
});

// Verbose logging on start
app.listen(port, () => console.log('Application started on port ' + port));

module.exports = {
    app: app,
    log: logger,

};
