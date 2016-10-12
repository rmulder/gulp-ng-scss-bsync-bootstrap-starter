(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name LoginViewController
   * @description Login view controller
   * # LoginViewController
   *
   */
  angular.module('portalAppHome')
      .controller('LoginViewController', loginController);
  loginController.$inject = ['$scope', '$q'];

  function loginController() {
    var vm = this;

    vm.appHomeTitle = 'Login';
  }
})();
