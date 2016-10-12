(function () {
    'use strict';

    /**
     * @ngdoc HeaderFooterController
     * @name HeaderFooterController
     * @description A slick common header footer controller
     *
     */
    angular.module('portalAppCore')
        .controller('HeaderFooterController', headerFooterController);
    
    headerFooterController.$inject = ['$scope', '$q'];

    function headerFooterController($scope, $q) {
        var vm = this;

        vm.appHomeTitle = 'Status Portal Home';
    }
})();
