// core.js

'use strict';

// Declare module
const brandonTodo = angular.module('brandonTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // When landing on the page, get all todos and display them
  $http.get('/api/todo')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // When submitting the add form, send text to node API
  $scope.createTodo = function() {
    $http.post('/api/todo', $scope.formData)
      .success(function(data) {

        // Clear the form so user can enter another
        $scope.formData = {};

        $scope.todo = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Delete todo after selecting checkbox
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todo' + id)
      .success(function(data) {
        $scope.todo = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}
