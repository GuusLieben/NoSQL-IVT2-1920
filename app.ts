import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

import * as express from 'express';
import {Application} from 'express';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

// Initiate app and pass it to router management
require('./routes/routes.bin').app(app);

const port = 3000;

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
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Error handlers
app.use((err: any, req: any, res: any, next: any) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    res.json({error: err})
});

// Verbose logging on start
app.listen(port, () => console.log('Application started on port ' + port));

export default {
    app: app,
    log: logger,

};
