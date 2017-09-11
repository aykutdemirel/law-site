;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .config(Config)

    function Config ($stateProvider) {
        $stateProvider
            .state('others', {
                abstract: true,
                templateUrl: 'app/others/others.html',
                controller: 'OthersCtrl'
            })
            .state('others.token-expired', {
                url: '/admin/others/token-expired',
                templateUrl: 'app/others/token/token-expired.html',
                controller: 'TokenExpiredCtrl',
                controllerAs: 'vm'
            })
            .state('others.errors', {
                url: '/error',
                templateUrl: 'app/others/errors/errors.html',
                controller: 'SiteAccessErrorsCtrl',
                controllerAs: 'vm'
            })
            .state('others.user-locked', {
                url: '/admin/others/user-locked',
                templateUrl: 'app/others/user-locked/user-locked.html',
                controller: 'UserLockedCtrl',
                controllerAs: 'vm'
            })
        }
})()
