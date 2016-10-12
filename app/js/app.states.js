(function () {
  'use strict';
  angular.module('portalApp').config(configureAppStates);

  configureAppStates.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function configureAppStates($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({enabled: false, requireBase: false});
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.when('/', '/portal/login');
    $stateProvider.state('portal', {
      abstract: true,
      url: '/portal/',
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
    }).state('portal.login', {
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
    .state('portal.home', {
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
    .state('portal.details', {
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
