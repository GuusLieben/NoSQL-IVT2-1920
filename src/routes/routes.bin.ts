import {Application} from 'express';

import indexRouter from './index';
import { router as friendsRouter } from "./friends.routes";
import { router as userRouter } from "./user.routes";
import { router as commentRouter } from "./comment.routes";
import { router as threadRouter } from "./thread.routes";

export function app(app: Application) {
    app.use('/', indexRouter);
    app.use('/friends/', friendsRouter);
    app.use('/user/', userRouter);
    app.use('/comment/', commentRouter);
    app.use('/thread/', threadRouter);
}
