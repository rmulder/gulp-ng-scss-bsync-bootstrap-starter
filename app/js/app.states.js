(function () {
    'use strict';
    angular.module('mgApp')
        .config(configureAppStates);

    configureAppStates.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
    
    function configureAppStates($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({enabled: false, requireBase: false});
        
        $urlRouterProvider.when('', '/');
        
        $urlRouterProvider.when('/', '/mg/home');
        
        $stateProvider.state('mg', {
            abstract: true,
            url: '/mg/',
            resolve: {},
            views: {
                'header': {
                    templateUrl: 'views/layout/header.html',
                    controller: 'HeaderFooterController as vm',
                },
                'footer': {
                    templateUrl: 'views/layout/footer.html',
                    controller: 'HeaderFooterController as vm',
                }
            },
            onEnter: function () {
                console.log('state : app : Enter.....');
            }
        }).state('mg.home', {
            url: 'home',
            views: {
                'content@': {
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeViewController as vm',
                }
            },
            onEnter: function () {
                console.log('state : app->home : Enter.....');
            }
        });

    }

})();
