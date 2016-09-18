(function () {
    'use strict';

    angular.module('Assignment1NgApp', [])
    .controller('Assignment1Controller', Assignment1Controller);

    Assignment1Controller.$inject = ['$scope'];
    function Assignment1Controller($scope) {
        $scope.menu = '';
        $scope.message = '';

        $scope.check = function () {
            if (!$scope.menu) {
                $scope.message = 'Please enter data first.';
            }
            else {
                var menu = $scope.menu;
                menu = menu.split(' ').join('');
                var length = menu.split(',').length;

                if (3 < length) $scope.message = 'Too much!';
                else $scope.message = 'Enjoy!';
            }
        };
    }
})();