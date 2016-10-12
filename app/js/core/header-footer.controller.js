(function () {
    'use strict';

    /**
     * @ngdoc HeaderFooterController
     * @name HeaderFooterController
     * @description A slick common header footer controller
     *
     */
    angular.module('reobeAppCore')
        .controller('HeaderFooterController', headerFooterController);
    
    headerFooterController.$inject = ['$scope', '$q'];

    function headerFooterController($scope, $q) {
        var vm = this;

        vm.appHomeTitle = 'REOBE Home';
    }
})();
