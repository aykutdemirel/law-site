;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .controller('SignupCtrl', Controller)

    function Controller ($window, $log, $location, Auth, Settings, FormatChecker) {

        var vm = this
        var title = 'Sign Up | Scaffold'

        vm.user = {}
        vm.errors = {
            organization: false,
            email: false
        }

        vm.loader = {}

        vm.signup = signup
        vm.checkOrganizationFormat = FormatChecker.checkOrganization
        vm.resetErrors = resetErrors

        activate()

        // //////////////////////////////

        function activate () {
            $window.document.title = title
        }

        function signup (form) {
            if (form.$invalid) { return vm.loader.error() }

            vm.resetErrors()
            vm.loader.start()
            // TODO: move login to signup, need backend
            Auth.signup(vm.user)
                .then(function (data) {
                    $log.info(data)
                    // Auth.login({  email: vm.account.email, password: vm.account.password })
                    //     .then(function () {
                    //         vm.loader.success()
                    //         $location.url('/admin/apps')
                    //     })
                    //     .catch(function (err) {
                    //         vm.loader.error()
                    //         handleError(err)
                    //     })
                })
                .catch(function (err) {
                    vm.loader.error()
                    handleError(err)
                })
        }

        function handleError (err) {
            if (err === 'duplicateEmail') {
                vm.errors.email = true
            } else if (err === 'duplicateOrganization') {
                vm.errors.organization = true
            }
        }

        function resetErrors () {
            vm.errors = {
                organization: false,
                email: false
            }
        }
    }
})()
