const indexRouter = require('./index');
const userRouter = require('./user.routes');

module.exports.app = (app) => {
    app.use('/', indexRouter);
    app.use('/user/', userRouter);
};
