// main.js

angular.module('todoController', [])
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // When landing on the page, get all todos and show them
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
      });

    // When submitting the add form, send text to node API
    $scope.createTodo = function() {
      if ($scope.formData.text != undefined) {
        Todos.create($scope.formData)
          .success(function(data) {

            // Clear the form for user
            $scope.formData = {};
            $scope.todos = data;
          });
      }
    };

    // Delete a todo after selecting checkbox
    $scope.deleteTodo = function(id) {
      Todos.delete(id)
        .success(function(data) {
          $scope.todos = data;
        });
    };
  });
