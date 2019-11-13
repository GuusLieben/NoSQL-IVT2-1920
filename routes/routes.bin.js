const indexRouter = require('./index');

module.exports.app = (app) => {
    app.use('/', indexRouter);
};
