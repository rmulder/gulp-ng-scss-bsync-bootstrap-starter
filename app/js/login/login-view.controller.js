(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name ListViewController
   * @description List view controller
   * # ListViewController
   *
   */
  angular.module('reobeAppHome')
      .controller('LoginViewController', loginController);
  loginController.$inject = ['$scope', '$q'];

  function loginController() {
    var vm = this;

    vm.appHomeTitle = 'Login';
  }
})();
