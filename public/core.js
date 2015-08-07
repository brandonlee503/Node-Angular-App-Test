var brandonTodo = angular.module('brandonTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // When landing on the page, get all todos and show them
  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // When submitting the add form, send text to node API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
      .success(function(data) {

        // Clear the form for user
        $scope.formData = {};
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  // Delete a todo after selecting checkbox
  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}
