'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('RegisterCtrl', function ($scope, alert, $auth) {
    $scope.submit = function(){
      $auth.signup({email:$scope.email, password:$scope.password})
          .then(function(res){
            alert('success', 'Account Created', 'Welcome, ' + res.data.user.email + ' ! Please activate account check your mail');
          })
          .catch(function(err){
            alert('warning', 'Something went wrong :(', err.message);
          });
    };
  });

