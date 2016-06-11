(function () {
    'use strict';

    /**
     * @ngdoc HeaderFooterController
     * @name HeaderFooterController
     * @description A slick common header footer controller
     *
     */
    angular.module('mgAppCore')
        .controller('HeaderFooterController', headerFooterController);
    
    headerFooterController.$inject = ['$scope', '$q'];

    function headerFooterController() {
        var vm = this;

        vm.appHomeTitle = 'Application home title';

    }
})();
