;(function () {
    'use strict'

    var angular = window.angular
    var _ = window._

    angular
        .module('scaffold.app')
        .factory('HelpersDummyData', Service)

    function Service (moment) {

        var service = {
            pushDummyData: pushDummyData,
            rand: rand
        }

        return service

        ////////////////////////////////


        function pushDummyData(timeOpts,valOpts, count) {
            var feeds = [], timeArr = [], valueArr = []

            count = count || 200

            for(var i = 0; i < count; i++){
                timeArr.push(moment(randomTime(timeOpts.start, timeOpts.end)).valueOf())
                valueArr.push(parseFloat(rand(valOpts.min, valOpts.max, valOpts.interval).toFixed(2)))
            }

            timeArr = sortData(timeArr)
            feeds = fillData(feeds,valueArr, timeArr, count)
            return feeds
        }

        function randomTime(start, end) {
            var diff =  end.getTime() - start.getTime();
            var new_diff = diff * Math.random();
            var date = new Date(start.getTime() + new_diff);
            return date;
        }

        function rand(min,max,interval) {
            if (typeof(interval)==='undefined'){
                interval = 1
            }
            var r = Math.floor(Math.random()*(max-min+interval)/interval)
            return r*interval+min
        }

        function sortData(times) {
            var sortedTimes = []
            sortedTimes = times.sort(function (x, y) {
                return y - x;
            });
            return sortedTimes
        }

        function fillData(_feeds, valueArr, sortedTimes, count) {
            for(var j=0; j < count; j++) {
                _feeds.push({v:valueArr[j], t:sortedTimes[j]})
            }
            return _feeds
        }

    }
})()
