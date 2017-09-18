;(function (angular, $, _) {
    'use strict'

    var injector = angular.injector(['ng', 'LocalStorageModule'])
    var $http = injector.get('$http')

    var localStorage = injector.get('localStorageService')

    // do
    var settings = {
        url:'/api/',
        tokenName:'hukukbook'
    }

    settings.user = localStorage.get(settings.tokenName+"-user")

    function bootstrap () {
        angular.module('scaffold.settings', []).constant('Settings', settings)
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['scaffold.app'])
        })
        stringHelper()
    }

    function stringHelper(){

        if (!String.prototype.format) {
            String.prototype.format = function() {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function(match, number) {
                    return typeof args[number] !== 'undefined' ? args[number] : match
                });
            };
        }

        String.prototype.replaceAll = function( token, newToken, ignoreCase ) {
            var _token;
            var str = this + "";
            var i = -1;

            if ( typeof token === "string" ) {

                if ( ignoreCase ) {

                    _token = token.toLowerCase();

                    while( (
                        i = str.toLowerCase().indexOf(
                            _token, i >= 0 ? i + newToken.length : 0
                        ) ) !== -1
                        ) {
                        str = str.substring( 0, i ) +
                            newToken +
                            str.substring( i + token.length )
                    }

                } else {
                    return this.split( token ).join( newToken )
                }

            }
            return str;
        };

    }


    bootstrap()

})(window.angular, window.$, window._)