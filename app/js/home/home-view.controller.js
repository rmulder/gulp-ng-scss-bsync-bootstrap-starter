(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name HomeViewController
     * @description Home view controller
     * # HomeViewController
     *
     */
    angular.module('mgAppHome')
        .controller('HomeViewController', homeController);
    homeController.$inject = ['$scope', '$q'];

    function homeController() {
        var vm = this;

        vm.appHomeTitle = 'Application home title';

    }
})();
