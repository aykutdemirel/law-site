;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .controller('LoginCtrl', Controller)

    function Controller ($window, $location, $stateParams, Auth) {
        var vm = this
        var title = 'Login | Scaffold'

        //vm.credentials = { body : { username:'',password:'',domainRef:''} }
        vm.credentials = { body : { username:'',password:''} }

        //vm.credentials.body = {"domainRef":"9423f65d-e8e6-4d6b-b757-d62a282dd374"}
        //vm.credentials.body = {"domainRef":"1baf094a-a388-4ad4-905c-03fecc7216a0"}

        vm.domains = []

        vm.error = false

        vm.loader = {}

        vm.login = login
        vm.reset = reset

        activate()

        // //////////////////////////////

        function activate () {
            $window.document.title = title
            vm.credentials.body.username = $stateParams.username || ''
        }

        function login (form) {

            if (form.$invalid) {
                if (!form.username.$error.required && !form.password.$error.required) {
                    handleError()

                }
                return vm.loader.error()
            }

            vm.loader.start()
            Auth
                .login(vm.credentials)
                .then(function (data) {
                    vm.loader.success()

                    checkMultipleDomain(data)

                    if(data.data.success && data.data.result !==undefined && data.data.result.token !==undefined) {
                        Auth.setCredentials(data,vm.credentials.body.domainRef ? vm.credentials.body.domainRef : data.data.result.domainRef)
                        $location.path('/admin/dashboard')
                    } else {
                        handleError()
                    }
                })
                .catch(function (err) {
                    vm.loader.error()
                     handleError(err)
                })
        }

        function checkMultipleDomain(data) {

            if( data.data.result!==undefined && data.data.result.length>1) {
                vm.domains = data.data.result
            }

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
