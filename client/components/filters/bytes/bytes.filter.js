'use strict';

angular.module('scaffold.app')
.filter('bytes', function () {
    return function(bytes, precision) {
        if (isNaN(parseFloat(bytes)) || !isFinite(bytes)){return ''};
        if (typeof precision === 'undefined'){precision = 2};
        var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
            number = Math.floor(Math.log(bytes) / Math.log(1024));
        return parseFloat((bytes / Math.pow(1024, Math.floor(number))).toFixed(precision)) +  ' ' + ( bytes === 1 ? 'byte' : units[number]);
    }
});
