;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .config(function ($stateProvider) {
            $stateProvider
                .state('main', {
                    abstract: true,
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'vm',
                    authenticate: true
                })
        })
})()
