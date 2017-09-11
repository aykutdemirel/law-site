;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .directive('scaffoldLoadingLayer', Directive)

    function Directive () {

        function link (scope, element, attrs) {

            scope.disconnect = false
            scope.shown = false

            scope.loader = scope.loader || {}

            scope.loader.start = function () {
                scope.shown = true
            }

            scope.loader.stop = function () {
                scope.shown = false
            }

            scope.loader.success = function () {
                scope.loader.stop()
            }

            scope.loader.error = function () {
                scope.loader.stop()
                scope.disconnect = true
            }

            if(scope.autostart===true || scope.autostart==='true') {
                scope.loader.start()
            }

        }

        function controller($scope,$attrs) {

        }

        return {
            restrict: 'E',
            scope: {
                autostart: '@',
                loader:'='
            },
            replace: true,
            template: ['<div class="smart-city-loader" ng-if="shown"><img src="../../assets/img/general/gif-load.gif" class="smart-city-loading-gif" /></div>'].join(''),
            link: link,
            controller:controller
        }
    }
})()
