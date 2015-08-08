// todos.js

angular.module('todoService', [])

  // Each function returns a promise object
  .factory("Todos", function($http) {
    return {
      get: function() {
        return $http.get('/api/todos');
      },

      create: function() {
        return $http.post('/api/todos');
      },

      delete: function(id) {
        return $http.delete('/api/todos/' + id);
      }
    }
  });
