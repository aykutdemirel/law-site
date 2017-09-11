;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .controller('ForgotCtrl', Controller)

    function Controller ($window, $location, $stateParams, Auth, Notificator) {
        var vm = this
        var title = 'Şifremi Unuttum | Scaffold'
        var from = $stateParams.from || undefined

        vm.email = ''
        vm.loader = {}
        vm.forgot = []

        vm.reset = reset

        activate()

        // //////////////////////////////

        function activate () {
            $window.document.title = title
        }

        function reset (form) {
            if (form.$invalid) { return vm.loader.error() }
            Auth.requestResetPassword(vm.forgot)
            vm.loader.success()
            $location.url(from || '/admin/login')
            Notificator.resetPassword.request(vm.forgot.body.mail)
        }
    }
})()
