import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import middleware from './middleware';

import {
    CLIENT_DEVELOPMENT,
    CLIENT_PRODUCTION
} from './constants';

// Initialize App
const app = express();

const {
    env: {
        IS_DEVELOPMENT,
        PORT
    }
} = process;

const origin = IS_DEVELOPMENT === 'true' ? CLIENT_DEVELOPMENT : CLIENT_PRODUCTION;

// App Configurations
app.disable('x-powered-by');
app.set('trust-proxy'); // Required for Heroku + rate limiting.
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(middleware);

// Start Server
const server = app.listen(PORT || 3100, () => {
    console.log(`Server started on port: ${server.address().port}.`);
});
