;(function () {
    'use strict'

    var angular = window.angular
    var is = window.is

    angular
        .module('scaffold.app')
        .factory('Menu', Service)

    function Service ($location) {
        var service = {
            active: active,
            startsWith: startsWith
        }

        return service

        // //////////////////////////////

        function active (route) {
            return $location.path().indexOf(route) !== -1
        }

        function startsWith (route) {
            return is.startWith($location.path(), route)
        }
    }
})()
