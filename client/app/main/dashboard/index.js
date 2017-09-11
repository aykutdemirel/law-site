;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .config(Config)

    function Config ($stateProvider) {
        $stateProvider
            .state('main.dashboard', {
                url: '/admin/dashboard',
                templateUrl: 'app/main/dashboard/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm',
                authenticate: true
            })
    }
})()
