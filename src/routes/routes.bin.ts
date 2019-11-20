import {Application} from 'express';

import indexRouter from './index';
import { router as friendsRouter } from "./friends.routes";

export function app(app: Application) {
    app.use('/', indexRouter);
    app.use('/friends/', friendsRouter);
    // app.use('/user/', userRouter);
}
