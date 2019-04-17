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

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://thymecloq.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://thymecloq.auth0.com/api/v2/',
    issuer: `https://thymecloq.auth0.com/`,
    algorithms: ['RS256']
  });
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

app.use('/members',checkJwt, memberRoutes);
app.use('/groups',checkJwt, groupRoutes);
app.use('/sessions',checkJwt, sessionRoutes);
app.use('/partners',checkJwt, partnerRoutes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
  });
  
  // This route need authentication
  app.get('/api/private', checkJwt, function(req, res) {
    res.json({
      message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
  });

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