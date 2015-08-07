// routes.js

var Todo = require('./models/todo');

module.exports = function(app) {

  // GET all todos
  app.get('/api/todos', function(req, res) {

    // Use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

      // Nothing after res.send(err) will execute
      if (err)
				res.send(err);

      // Return all todos in JSON format
      res.json(todos);
    });
  });

  // POST todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

    // Information comes from AJAX request from Angular
    Todo.create({
      text: req.body.text,
      done: false
    }, function(err, todo) {
      if (err)
				res.send(err);

      Todo.find(function(err, todos) {
        if (err)
          res.send(err);
        res.json(todos);
      });
    });
  });

  // DELETE a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      Todo.find(function(err, todos) {
        if (err)
          res.send(err);
        res.json(todos);
      });
    });
  });

  // =============================================================================
  // Angular application - Loads file when we hit localhost:8080
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};
