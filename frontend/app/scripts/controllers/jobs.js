'use strict';

/**
 * @ngdoc function
 * @name jwtApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the jwtApp
 */
angular.module('jwtApp')
  .controller('JobsCtrl', function ($scope, $http, API_URL, alert) {

    $http.get(API_URL + "jobs")
      .success(function(jobs){
        $scope.jobs = jobs;
        console.log("scope:" + $scope.jobs);
      })
      .error(function(err){
        alert('warning', "Unable to get jobs",err.message);
      });
  });
