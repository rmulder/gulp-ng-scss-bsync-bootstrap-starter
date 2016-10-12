(function () {
  'use strict';
  angular.module('reobeApp').config(configureAppStates);

  configureAppStates.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function configureAppStates($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({enabled: false, requireBase: false});
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.when('/', '/reobe/login');
    $stateProvider.state('reobe', {
      abstract: true,
      url: '/reobe/',
      resolve: {},
      params: {
        headerClass: ''
      },
      views: {
        'home_header': {
          templateUrl: null
        },
        'custom_header': {
          templateUrl: null
        },
        'header': {
          templateUrl: 'views/layout/header.html',
          controller: 'HeaderFooterController as vm'
        },
        'footer': {
          templateUrl: 'views/layout/footer.html',
          controller: 'HeaderFooterController as vm'
        }
      },
      onEnter: function () {
        console.log('state : app : Enter.....');
      }
    }).state('reobe.login', {
      url: 'login',
      params: {
          headerClass: ''
      },
      views: {
          'content@': {
              templateUrl: 'views/login/login.html',
              controller: 'LoginViewController as vm'
          }
      },
      onEnter: function () {
          console.log('state : app->login : Enter.....', this);
      }
    })
    .state('reobe.home', {
      url: 'home',
      params: {
        headerClass: ''
      },
      views: {
        'content@': {
          templateUrl: 'views/home/home.html',
          controller: 'HomeViewController as vm'
        }
      },
      onEnter: function () {
        console.log('state : app->home : Enter.....', this);
      }
    })
    .state('reobe.details', {
      url: 'details',
      params: {
        headerClass: ''
      },
      views: {
        'content@': {
          templateUrl: 'views/details/details.html',
          controller: 'DetailsViewController as vm'
        }
      },
      onEnter: function () {
        console.log('state : app->details : Enter.....', this);
      }
    })
    ;
  }
})();
