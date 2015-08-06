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
}
