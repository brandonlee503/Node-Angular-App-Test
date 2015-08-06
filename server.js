// server.js

//jscs:disable requireTrailingComma, disallowQuotedKeysInObjects, requireCamelCaseOrUpperCaseIdentifiers

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
  text: String
});

// =============================================================================
// Define Routes

// GET all todos
app.get('api/todo', function(req, res) {
  Todo.find(function(err, todo) {
    if (err) {

      // Nothing after res.send(err) will execute
      res.send(err);
    }

    // Return all todos in JSON
    res.json(todo);
  });
});

// CREATE a todo
app.post('api/todo', function(req, res) {

  // Info comes from AJAX request in Angular
  Todo.create({
    text: req.body.text,
    done: false
  }, function(err, todo) {
    if (err) {
      res.send(err);
    }

    // Get/return all todos after you create one
    Todo.find(function(err, todo) {
      if (err) {
        res.send(err);
      }

      res.json(todo);
    });
  });
});

// DELETE a todo
app.delete('/api/todo/:todo_id', function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err, todo) {
    if (err) {
      res.send(err);
    }

    // Get/return all todos after you delete one
    Todo.find(function(err, todo) {
      if (err) {
        res.send(err);
      }

      res.json(todo);
    });
  });
});

// =============================================================================
// Initilize app
app.listen(8080);
console.log('App is running on port 8080');
