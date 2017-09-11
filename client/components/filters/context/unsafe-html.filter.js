'use strict';

angular.module('scaffold.app')
    .filter('to_trusted', function ($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        }
    });
