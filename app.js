const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const memberRoutes = require('./api/routes/members');
const groupRoutes = require('./api/routes/groups');
const sessionRoutes = require('./api/routes/sessions');
const partnerRoutes = require('./api/routes/partners');
//test
mongoose.connect('mongodb+srv://admin:' +
    process.env.MONGO_PW +
    '@node-rest-tutorial-xomfd.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/members', memberRoutes);
app.use('/groups', groupRoutes);
app.use('/sessions', sessionRoutes);
app.use('/partners', partnerRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;