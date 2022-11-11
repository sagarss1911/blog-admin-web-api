'use strict';

const HTTP_STATUS = require('./modules/constants/httpStatus');
const authMiddleware = require("./modules/middleware/authValidation");

module.exports = app => {
    app.get('/', (req, res, next) => {
        return res.status(200).send("Api is Alive V0.1");
    });
    app.use('/api/common', require('./modules/routes/common'));
    app.use('/api/place', require('./modules/routes/place'));
    app.use('/api/subscriber', require('./modules/routes/subscriber'));
    app.use('/api/admin-user', require('./modules/routes/admin-users'));
    app.use('/api/blogs', require('./modules/routes/blogs'));
    ////
    app.use('/api/product', require('./modules/routes/product'));

    app.use((req, res, next) => {
        console.log("Request", req.url)
        next();
    });
    app.use('/api/v1/auth', require('./modules/routes/authentication'));

    app.use('/api/category', require('./modules/routes/category'));

    app.use('/api/common_settings', require('./modules/routes/common_settings'));

    app.use('/api/collection', require('./modules/routes/collection'));

    app.use('/api/product_category', require('./modules/routes/product_category'));

    app.use('/api/product_options', require('./modules/routes/product_options'));

    app.use('/api/privacy_policy', require('./modules/routes/privacy_policy'));

    app.use('/api/term_conditions', require('./modules/routes/term_conditions'));

    app.use('/api/footer_website_data', require('./modules/routes/footer_website_data'));

    app.use((req, res, next) => {
        if (res._headerSent) {
            return next();
        }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'This route doesn\'t exist' });
    });
};