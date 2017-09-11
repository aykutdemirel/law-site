;(function (angular, _) {
  'use strict'

  angular
    .module('scaffold.app')
    .factory('PublicApi', Service)

  function Service (localStorageService, $location, Restangular, Settings, Notificator, $rootScope, $injector, $timeout, moment) {

    var service = Restangular.withConfig(function (RestangularConfigurer) {

      RestangularConfigurer.setBaseUrl(Settings.url)
      RestangularConfigurer.setDefaultHeaders(defaultHeaders())

        RestangularConfigurer.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {

        if(operation==="post" && element.method && element.method !==""){

          var payload = ""

          switch (element.method.toLowerCase()){
            case "get" :
              payload = "params"
              break;
            case "post":
              payload = "body"
              break;
            case "put":
              payload = "body"
              break;
            default :
              payload = "params"
              break;
          }

          if(payload==="params"){

            var _keys = Object.keys(element[payload] || [])
            var _arr = []

            if(element[payload] && _keys.length > 0) {
              for(var i = 0; i < _keys.length; i++) {
                _arr.push({name:_keys[i],value:element[payload][_keys[i]]})
              }
            }
            element[payload] = _arr
          }

        }

        return {
          element: element,
          params: params,
          headers: headers,
          httpConfig: httpConfig
        }

      });

      RestangularConfigurer.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

        var newResponse = {}
        if (operation === 'getList') {
          if (data.hasOwnProperty('itemCount')) {
            newResponse = data
          }else{
            newResponse = data
          }

        } else {
          newResponse = data
        }

        return newResponse

      })

      RestangularConfigurer.setErrorInterceptor(function (response) {

        var Auth = $injector.get('Auth')

        if (response.status === 401 || response.status === 403) {

          if(response.data.error.errorCode==="ERR-AG-01"){
              Auth.clearCookie()
              $location.path('/admin/others/token-expired')
              return false
          }

        }

        if (response.status >= 500) {
          Notificator.errors.server()
          console.error(response)
        }

        if(response && response.status && response.statusText && response.data && response.data.error && response.config && response.config.url){
          Notificator.generic.push_err_notification(response.status + " - " + response.statusText + " <br/>" + JSON.stringify(response.data.error || '') + "<br />" + "url: "+ response.config.url)
        }else{
          Auth.clearCookie()
          Notificator.errors.server()
          $timeout(function () {
            $location.path('/admin/login')
          },2000)
        }

        return true
      })
    })

    service.refreshHeaders = refreshHeaders
    service.removeHeaders = removeHeaders

    return service

    // //////////////////////////////

    function refreshHeaders () {
      service.setDefaultHeaders(defaultHeaders())
    }

    function removeHeaders () {
      service.setDefaultHeaders({})
    }



    /**
     * Generates default headers based on token
     * @return {Object}
     */
    function defaultHeaders () {
      var token = localStorageService.get(Settings.tokenName)
      var headers = {}

      if (token) {
        headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          'Token': token
        }
      }

      return headers
    }
  }
})(window.angular, window._)
