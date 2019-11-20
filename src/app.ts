import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import * as express from 'express';
import {Application} from 'express';
import * as bodyParser from 'body-parser';

export const logger = require('node-color-log');

// Exports
export const app: Application = express();
export let prod = true;
export function setProduction(stat: boolean) {
    prod = stat;
}

// General configuration
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Initiate app and pass it to router management
require('./routes/routes.bin').app(app);

// Request filters
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.all('*', (req, res) => {
    logger.color('yellow').italic().log('User requested ' + req.path + ' but it was not found on the server');
   res.status(404).json({error: 'Endpoint unavailable'});
});

// Error handlers
app.use((err: any, req: any, res: any, next: any) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    logger.error('Error : ' + JSON.stringify(err));
    res.json({global_error: err})
});

// Initiate database and application services
const service = require('./services/service');
service.init();

export const testable = app;