const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
    console.log(err.stack);
    res.render('error', {error: err.message}).status(500);
};

module.exports = errorHandler;