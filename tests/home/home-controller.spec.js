'use strict';

describe('reobeAppHome:HomeViewController', function () {
  beforeEach(module('reobeAppHome'));
  var rootScope, scope, ctrl, $q;

  describe('HomeViewController', function () {
    beforeEach(inject(function (_$rootScope_, _$q_) {
      rootScope = _$rootScope_;
      scope = rootScope.$new();
      $q = _$q_;
    }));

    it('initialise HomeController ', inject(function ($controller) {
      ctrl = $controller('HomeViewController', {$scope: scope});
      expect(ctrl.appHomeTitle).toBeDefined();
      expect(ctrl.appHomeTitle).toBe('REOBE Home');
    }));
  });
});
