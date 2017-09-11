;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .config(Config)

    function Config ($stateProvider) {
        $stateProvider
            .state('registration', {
                abstract: true,
                templateUrl: 'app/registration/registration.html',
                controller: 'RegistrationCtrl'
            })
            .state('registration.login', {
                url: '/admin/login',
                templateUrl: 'app/registration/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            })
            .state('registration.signup', {
                url: '/admin/signup',
                templateUrl: 'app/registration/signup/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'vm'
            })
            .state('registration.forgot', {
                url: '/admin/forgot?from',
                templateUrl: 'app/registration/forgot/forgot.html',
                controller: 'ForgotCtrl',
                controllerAs: 'vm'
            })
            .state('registration.change-password', {
                url: '/admin/change-password?token',
                templateUrl: 'app/registration/change-password/change-password.html',
                controller: 'ChangePasswordCtrl',
                controllerAs: 'vm',
                resolve: {
                    user: ['$stateParams', '$location', 'Auth', 'Notificator', function ($stateParams, $location, Auth, Notificator) {
                        var token = $stateParams.token
                        return token;
                        // return Auth
                        //     .findUserByPasswordResetToken(token)
                        //     .then(function (user) {
                        //         user.token = token
                        //         return user
                        //     }, function (err) {
                        //         console.log(err)
                        //         $location.url('/forgot')
                        //         Notificator.resetPassword.error()
                        //     })
                    }]
                }
            })
    }
})()
