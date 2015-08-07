// server.js

// =============================================================================
// IMPORTS
'use strict';

const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');     // Pull data from HTML POST
const methodOverride = require('method-override'); // Simulate DELETE and PUT

const port           = process.env.PORT || 8080;
const database       = require('./config/database');

// =============================================================================
// CONFIGURATION
mongoose.connect(database.url);

// Set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Log every request to the console
app.use(morgan('dev'));

// Parse application/x-www-form-urlencoded, JSON, and vnd.api+json as JSON
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// =============================================================================
// ROUTES
require('./app/routes.js')(app);

// =============================================================================
// LISTEN
app.listen(port);
console.log('App is running on port ' + port);
