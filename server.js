// server.js

//jscs:disable requireTrailingComma, disallowQuotedKeysInObjects

'use strict';

const express        = require('express');
const app            = express();
const mongoose       = require('mongoose');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');     // Pull info from HTML POST
const methodOverride = require('method-override'); // Simulate DELETE and PUT
const argv           = require('yargs');

// =============================================================================
// Configuration

// TODO: Fix Mongo DB connnection
// TODO: Learn up on these libs

// DB Config
/*
const MONGO_URL = process.env.MONGO_URL;
console.log('MONGO_URL is: ' + MONGO_URL);

//const DB_URL = argv.db || process.env.DATABASE_URL;
mongoose.connect(MONGO_URL);

// mongoose.connect('mongodb://ds059672.mongolab.com:59672/angular-test');
*/

const MONGO_URL = 'mongodb://localhost/angularApp';
mongoose.connect(MONGO_URL);

// Set static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// Log every request to the console
app.use(morgan('dev'));

// Parse application/x-www-form-unlencoded, JSON, and vnd.api+json as JSON
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(methodOverride());

// =============================================================================
// Define model
const Todo = mongoose.model('Todo', {
  text:String
});

// =============================================================================
// Initilize app
app.listen(8080);
console.log('App is running on port 8080');
