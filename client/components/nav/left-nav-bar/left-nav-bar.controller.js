;(function () {
    'use strict'

    var angular = window.angular

    angular
        .module('scaffold.app')
        .controller('leftNavBarCtrl', Controller)

    function Controller (Menu, Auth) {

        var vm = this
        vm.menu = getMenu()
        vm.active = Menu.active

        activate()

        ////////////////////////////////


        function activate () {

        }


        function getMenu () {
            return [
                { title: 'Ana Sayfa', link: '/dashboard', route: '/dashboard'}
            ]
        }

    }

})()
