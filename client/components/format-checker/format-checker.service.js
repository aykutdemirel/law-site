;(function () {
  'use strict'

  var angular = window.angular
  var XRegExp = window.XRegExp

  angular
    .module('scaffold.app')
    .factory('FormatChecker', FormatChecker)

  function FormatChecker () {
    var service = {
      checkName: checkName,
      checkOrganization: checkOrganization
    }

    return service

    // //////////////////////////////

    function checkName (name) {
      var expression = new XRegExp('^\\p{L}[-._\\p{L}0-9]*$')
      return expression.test(name)
    }

    function checkOrganization (organization) {
      var expression = /^[a-z][-._a-z0-9\s]*$/i
      return expression.test(organization)
    }
  }
})()
