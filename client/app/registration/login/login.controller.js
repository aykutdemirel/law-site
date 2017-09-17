;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .controller('LoginCtrl', Controller)

    function Controller ($window, $location, $stateParams, Auth) {

        var vm = this
        var title = 'Login | Scaffold'

        vm.credentials = { body : { email:'',password:''} }

        vm.error = false

        vm.loader = {}

        vm.login = login
        vm.reset = reset

        activate()

        // //////////////////////////////

        function activate () {
            $window.document.title = title
            vm.credentials.body.email = $stateParams.email || ''
        }

        function login (form) {

            if (form.$invalid) {
                if (!form.email.$error.required && !form.password.$error.required) {
                    handleError()

                }
                return vm.loader.error()
            }

            vm.loader.start()
            Auth
                .login(vm.credentials.body)
                .then(function (data) {
                    vm.loader.success()
                    $location.path('/admin/dashboard')
                })
                .catch(function (err) {
                    vm.loader.error()
                     handleError(err)
                })
        }


        function handleError () {
            vm.error = true
            vm.credentials.password = ''
        }

        function reset () {
            vm.error = false
        }
    }
})()
