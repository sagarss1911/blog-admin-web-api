'use strict';

const HTTP_STATUS = require('./modules/constants/httpStatus');
const authMiddleware = require("./modules/middleware/authValidation");

module.exports = app => {
    app.get('/', (req, res, next) => {
        return res.status(200).send("Api is Alive V0.1");
    });

    app.use('/api/v1/auth', require('./modules/routes/authentication'));

    app.use('/api/place', require('./modules/routes/place'));

    app.use('/api/subscriber', require('./modules/routes/subscriber'));

    app.use('/api/category', require('./modules/routes/category'));



    app.use((req, res, next) => {
        console.log("Request", req.url)
        next();
    });






    app.use((req, res, next) => {
        if (res._headerSent) {
            return next();
        }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'This route doesn\'t exist' });
    });
};