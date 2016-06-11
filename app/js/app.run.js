(function () {
    'use strict';

    /**
     * @ngdoc Application run phase 
     * @name Move Guide
     * @description
     *
     * Main module of the application.
     */
    angular.module('mgApp')
        .run(initialiseAppNameSpace)
        .run(registerStateTracker)
        .run(registerGlobalEvents);

    initialiseAppNameSpace.$inject = ['$window', '$rootScope', 'Utilities'];
    function initialiseAppNameSpace() {



    }

    registerStateTracker.$inject = ['$rootScope', '$state', 'Utilities'];

    function registerStateTracker($rootScope, $state) {
        /**
         * function(event, toState, toParams, fromState, fromParams)
         */
        $rootScope.$on('$stateChangeSuccess', function () {
            console.log('$stateChangeSuccess');
            $rootScope.$emit('app:show:loading', false);
        });

        /**
         * function(event, toState, toParams, fromState, fromParams)
         */
        $rootScope.$on('$stateChangeStart', function () {
            console.log('$stateChangeStart');
            $rootScope.$emit('app:show:loading', true);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log(['$stateChangeError']);
            event.preventDefault();
            $rootScope.$emit('app:show:loading', false);
            console.error(error);
            error.date = new Date();
            $state.go('error');
        });

        /**
         * function (event, viewConfig)
         */
        $rootScope.$on('$viewContentLoading', function () {
            //console.log('$viewContentLoading .....');
            //console.log([event, viewConfig]);
            // Access to all the view config properties.
            // and one special property 'targetView'
            // viewConfig.targetView
        });

        /**
         * function (event)
         */
        $rootScope.$on('$viewContentLoaded', function () {
            //console.log('$viewContentLoaded .....');
            //console.log([event]);
        });
    }

    registerGlobalEvents.$inject = ['$window', '$document', '$rootScope', '$timeout', 'Utilities'];

    function registerGlobalEvents($window, $document, $rootScope, $timeout, util){
        var windowEl =  angular.element($window),
            documentEl = angular.element($document);
        
        $window.rootscope = $rootScope; //TODO: to be removed
        windowEl.bind('resize', util._.debounce(function(){
            $timeout(function(){$rootScope.$broadcast('app:window:resize');});
        }, 100));
        
        
        var lastScrollPosition = 0;
        documentEl.bind('scroll', util._.throttle(function(){
            var currentPosition = documentEl.scrollTop();
            var totalScrollHeight = (documentEl.innerHeight() - windowEl.innerHeight());
            $rootScope.cppc.isScrollTopVisible = currentPosition > 0;
            var data = {scrollPercentage : (currentPosition/totalScrollHeight) * 100, scrollingDown : (currentPosition > lastScrollPosition)};
            $timeout(function(){$rootScope.$broadcast('app:window:scroll', data);});
            lastScrollPosition = currentPosition;
        }, 400));

        $rootScope.$on('$destroy', function () {
            windowEl.unbind('resize');
            documentEl.unbind('scroll');
        });

    }



})();
