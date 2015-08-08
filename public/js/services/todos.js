// todos.js

/*
 * This service is meant to interact with our Node API.
 * We want to have all the code to get, create, or delete a to-do inside our service.
 * This ensures that we can test this code separate of our overall application.
 */
angular.module('todoService', [])

  // Each function returns a promise object
  .factory('Todos', function($http) {
    return {
      get: function() {
        return $http.get('/api/todos');
      },

      create: function(todoData) {
        return $http.post('/api/todos', todoData);
      },

      delete: function(id) {
        return $http.delete('/api/todos/' + id);
      }
    }
  });
