import {Application} from 'express';

import indexRouter from './index';

export function app(app: Application) {
    app.use('/', indexRouter);
    // app.use('/user/', userRouter);
}
