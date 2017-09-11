;(function () {
  'use strict';

  // TODO: add unit tests
  angular
    .module('scaffold.app')
    .filter('truncate', Filter);

  function Filter() {
    return function (value, max, ending) {
      if(!value) { return ''; }

      ending = ending || '...';
      max = parseInt(max);
      if(!max) { return value; }
      if(value.length <= max) { return value; }

      value = value.substr(0, max - ending.length);

      return value + ending;
    };
  }
})();