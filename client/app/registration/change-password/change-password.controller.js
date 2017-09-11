;(function (angular) {
    'use strict'

    angular
        .module('scaffold.app')
        .controller('ChangePasswordCtrl', Controller)

    function Controller ($window, $location, $stateParams, Auth, Notificator, user) {

        var vm = this
        var title = 'Şifre Değiştime | Scaffold'
        var from = $stateParams.from || undefined


        vm.password = {}
        vm.user = user
        vm.newPassword = ''
        vm.confirmPassword = ''

        vm.loader = {}

        vm.changePassword = changePassword
        vm.checkPasswordsMatch = checkPasswordsMatch

        activate()

        ////////////////////////////////

        function activate () {
            $window.document.title = title
        }

        function changePassword (form) {

            vm.password.body.passwordResetUuid = $location.search().token

            if (form.$invalid) { return vm.loader.error() }

            vm.loader.start()
            Auth.resetPassword(vm.password)
                .then(function () {
                    vm.loader.success()
                    $location.url('/admin/login')
                    Notificator.resetPassword.success()
                })
                .catch(function (err) {
                    console.log(err)
                    vm.loader.error()
                })
        }


        function checkPasswordsMatch (newPassword) {
            return vm.user.newPassword === newPassword
        }
    }
})(window.angular)
