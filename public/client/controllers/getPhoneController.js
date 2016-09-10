angular.module('appModule')
.controller('getPhoneController', function($scope, $http, $location, $cookieStore){

  $scope.focused = false;

  $scope.toggleFocus = function(){
    $scope.focused = !$scope.focused;
  };

  $scope.sendPhoneNumToServer = function() {
    $http({
      method: "POST",
      url: "/updatephone",
      data: {
        uid: $cookieStore.get('uid'),
        phone: $scope.userPhoneNum
      }
    }).success(function() {
      $cookieStore.remove('uid');
      $cookieStore.remove('status');
      $location.path('/');
    }).error(function(err) {
      console.log('failed to post to server');
      $scope.err = { 
        reason: err
      }
    })
  }
});