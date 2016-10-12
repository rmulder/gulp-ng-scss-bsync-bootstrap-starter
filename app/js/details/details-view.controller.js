(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name PropertyViewController
   * @description Property view controller
   * # PropertyViewController
   *
   */
  angular.module('reobeAppHome')
      .controller('DetailsViewController', detailsController);
  detailsController.$inject = ['$scope', '$q'];

  function detailsController() {
    var vm = this;

    vm.appHomeTitle = 'Details';
  }
})();
