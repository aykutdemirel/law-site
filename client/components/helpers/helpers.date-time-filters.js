;(function () {
    'use strict'

    var angular = window.angular
    var _ = window._

    angular
        .module('scaffold.app')
        .factory('HelpersDateTimeFilters', Service)

    function Service (moment) {

        var service = {
            timeStamp: timeStamp
        }

        return service

        ////////////////////////////////

        function timeStamp(filters, dateTimeColumns) {
            _.each(filters,function(filter) {
                _.each(dateTimeColumns,function (dateTimeColumn) {
                    if(dateTimeColumn.clientType === 'date' && filter.field === dateTimeColumn.field) {
                        filter.value = moment(filter.value).unix()
                    }
                })
            })
            return filters
        }

    }
})()
