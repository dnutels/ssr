'use strict';

const express = require('express');

const components = require('./assets/');
const middleware = require('./middleware/');

const renderRouter = require('./routers/render');

const {Logger} = require('./tools/');

const {PORT: PORT} = process.env;

const app = express();

app.use(middleware);
app.use('/components', components);
app.use('/render', renderRouter);

app.listen(PORT, (err) => {
    if (!err) {
        Logger.info(`Listening on ${PORT}`);
    } else {
        Logger.error(`Failed to start server on ${PORT}`);
        Logger.error(err);
    }
});
