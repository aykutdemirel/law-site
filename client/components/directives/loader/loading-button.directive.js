;(function () {
  'use strict'

  var angular = window.angular

  angular
    .module('scaffold.app')
    .directive('loadingButton', Directive)

  function Directive ($timeout) {
    function link (scope, element, attrs) {
      var progressEl = element.find('.loading-button__inner-progress')
      var interval

      element.addClass('loading-button')

      scope.caption = scope.text

      scope.loader = scope.loader || {}
      scope.loader.start = function () {
        element.attr('disabled', 'disabled')
        clearInterval(interval)
        progressEl.css('opacity', 1)

        var progress = 0
        interval = setInterval(function () {
          progress = Math.min(progress + Math.random() * 0.1, 1)
          progressEl.css('width', progress * 100 + '%')

          if (progress === 1) {
            progress = 0
          }
        }, 200)
      }

      scope.loader.stop = function () {
        element.removeAttr('disabled')
        clearInterval(interval)
        progressEl.css('opacity', 0)
        progressEl.css('width', '0%')
      }

      scope.loader.success = function () {
        scope.loader.stop()
        element.addClass('state-success')
        $timeout(function () {
          element.removeClass('state-success')
        }, 2000)
      }

      scope.loader.error = function () {
        scope.loader.stop()
        element.addClass('state-error')
        $timeout(function () {
          element.removeClass('state-error')
        }, 2000)
      }
    }

    return {
      restrict: 'A',
      scope: {
        text: '=',
        loader: '='
      },
      template: ['<span class="loading-button__content">{{ caption }}</span>',
        '<span class="loading-button__progress">',
        '  <span class="loading-button__inner-progress"></span>',
        '</span>'
      ].join(''),
      link: link
    }
  }
})()
