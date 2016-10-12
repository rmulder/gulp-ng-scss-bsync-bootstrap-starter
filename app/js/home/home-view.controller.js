(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name HomeViewController
   * @description Home view controller
   * # HomeViewController
   *
   */
  angular.module('reobeAppHome')
      .controller('HomeViewController', homeController);
  homeController.$inject = ['$scope', '$q'];

  function homeController() {
      var vm = this;
      vm.appHomeTitle = 'Status Portal Home';

      vm.initJS = function () {};
      vm.initJS();
  }
})();
