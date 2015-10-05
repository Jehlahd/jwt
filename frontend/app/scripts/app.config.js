'use strict';
/**
 * Created by Vincent on 03/08/2015.
 */
angular.module('jwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL){

    $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })

    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })

    .state('jobs', {
      url: '/jobs',
      templateUrl: '/views/jobs.html',
      controller:'JobsCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller:'LoginCtrl'
    });

    $authProvider.google({
      clientId:"67870011458-lbvn78cj4k88m1r4dsid0aq6n071acbu.apps.googleusercontent.com",
      url: API_URL + 'auth/google'
    });

  $authProvider.facebook({
    clientId:"477457829085053",
    url: API_URL + 'auth/facebook'
  });
    $authProvider.loginUrl = API_URL + "login";
    $authProvider.signupUrl = API_URL + "register";
    //$httpProvider.interceptors.push('authInterceptor');
  })
  .constant('API_URL', 'http://localhost:3000/')
  .run(function($window){
   var params = $window.location.search.substring(1);
   if (params && $window.opener && $window.opener.location.origin === $window.location.origin){
     var pair = params.split('=');
     var code = decodeURI(pair[1]);

     $window.opener.postMessage(code, $window.location.origin);
   }
  });


