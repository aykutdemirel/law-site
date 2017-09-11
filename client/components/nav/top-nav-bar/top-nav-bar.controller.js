;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .controller('NavCtrl', Controller)

    function Controller (Menu, Auth, localStorageService, Settings) {

        var vm = this
        vm.active = Menu.active
        vm.logout = logout

        vm.name = ""
        vm.userName = ""


        activate()

        ////////////////////////////////

        function activate () {

            var _user = localStorageService.get(Settings.tokenName+"-user")
            if(_user){
                vm.name = _user.name+ " " + _user.surname
                vm.userName = _user.username
            }
        }

        function logout () {
            Auth.logout()
        }

        $('.leftSideBtn').on('click', function () {
            $(this).toggleClass("active")
            $(".left-sidenav").toggleClass("active-menu")
            $(".sidenav-content").toggleClass("active-menu")
            /*
            var el = $(this).find('i')
            if (el.hasClass('fa-bars')) {
                el.removeClass('fa-bars').addClass('fa-times')
            } else {
                el.removeClass('fa-times').addClass('fa-bars')
            }
            */
        });

        $('.leftSideCloseBtn').on('click', function () {
            $('.leftSideBtn').toggleClass("active")
            $(".left-sidenav").toggleClass("active-menu")
            $(".sidenav-content").toggleClass("active-menu")
        })
    }

})()
