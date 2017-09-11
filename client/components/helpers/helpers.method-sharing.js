;(function (_, angular) {
    'use strict'

    angular
        .module('scaffold.app')
        .factory('MethodSharing', Service)

    function Service () {

        var sharingScopes = []

        var service = {
            get:get,
            set:set,
            remove:remove,
            removeAll:removeAll
        }

        return service

        ////////////////////////////////

        function get(id){
            return _.findWhere(sharingScopes,{id:id})
        }

        function set(obj) {
            if(typeof obj.scope === "object") {
                sharingScopes.push(obj)
            }else if (typeof obj.data === "object") {
                _.each(sharingScopes, function (sharingScope) {
                    if(sharingScope.id === obj.id) {
                        _.merge(sharingScope.scope, obj.data)
                    }
                })
            }
        }

        function remove(id) {
            sharingScopes = _.without(sharingScopes, {id:id})
        }

        function removeAll() {
            sharingScopes = []
        }

    }
})(window._, window.angular)
