; (function (angular, pluralize) {
    'use strict'

    angular
      .module('scaffold.app')
      .factory('Notificator', Notificator)

    function Notificator(growl, truncateFilter) {

        var max = 20

        var service = {
            save: {
                domain: save,
                alarm: save,
                action: save,
                role: save,
                rule: save,
                authorization: save,
                appType: save,
                app: save,
                locations: save,
                widget: widgetSave,
                widgetDef: save,
                page: save,
                contact: save,
                user: save
            },
            update: {
            },
            remove: {
                domain: remove,
                alarm: remove,
                action: remove,
                notification: remove,
                role: remove,
                rule: remove,
                authorization: remove,
                appType: remove,
                app: remove,
                locations: remove,
                widgetDef: remove,
                page: remove,
                contact: remove,
                user: remove
            },
            deviceSelection:{
                max: maxFunc
            },
            invitations: {
                create: createInvitations,
                cancel: cancelInvitations,
                resend: resendInvitations
            },
            errors: {
                server: serverError
            },
            resetPassword: {
                request: resetPasswordRequest,
                error: resetPasswordError,
                success: resetPasswordSuccess
            },
            acceptInvitation: {
                error: acceptInvitationError,
                success: acceptInvitationSuccess
            },
            clientStorage:{
                error: push_err_notification
            },
            generic: {
                push_err_notification: push_err_notification
            },
            alarm:alarm
        }

        return service

        // //////////////////////////////

        // function createAlert(name){
        //   create('Alert', name)
        // }

        // function removeAlert() {
        //   remove('Alert')
        // }

        function alarm(data) {
            growl.error('<strong>' + data.message.action + '</strong><br /><p>domainId = '+ data.domainId +'</p>')
        }

        function push_err_notification(text) {
            growl.error(text);
        }

        function update(entity, name) {
            name = truncateFilter(name, max)
            growl.success(entity + ' <strong>' + name + '</strong> is updated.')
        }

        function widgetSave(entity) {
            var name = truncateFilter(entity.type, max)
            growl.success('<strong>' + name + '</strong> is saved.')
        }

        function save(entity, name) {
            name = truncateFilter(name, max)
            growl.success(entity + ' <strong>' + name + '</strong> is saved.')
        }

        function maxFunc(entity, name) {
            name = truncateFilter(name, max)
            growl.error(entity + ' <strong>' + name + '</strong> reached max count.')
        }

        function create(entity, name) {
            name = truncateFilter(name, max)
            growl.success(entity + ' <strong>' + name + '</strong> is created.')
        }

        function remove(entity, name) {
            name = truncateFilter(name, max)
            growl.success(entity + ' <strong>' + name + '</strong> is deleted.')
        }

        function createInvitations(length) {
            growl.success(pluralize('user', length, true) + ' invited.')
        }

        function cancelInvitations(name) {
            growl.success('Invitation for <strong>' + name + '</strong> is canceled.')
        }

        function resendInvitations(name) {
            growl.success('Invitation for <strong>' + name + '</strong> is successfully resent.')
        }

        function serverError() {
            growl.error('Something went wrong with our server. Please try again.')
        }

        function resetPasswordRequest(email) {
            growl.success('An email has been sent to <strong>' + email + '</strong> with further instructions.')
        }

        function resetPasswordError() {
            growl.error('<strong>Whoops...</strong> That reset key has expired or invalid.')
        }

        function resetPasswordSuccess() {
            growl.success('<strong>Yay!</strong> You successfully changed your password.')
        }

        function acceptInvitationError() {
            growl.error('<strong>Whoops...</strong> That invitation key has expired or invalid.')
        }

        function acceptInvitationSuccess(team) {
            growl.success('<strong>Yay!</strong> You successfully joined ' + team + ' team. Please login to continue.')
        }

    }
})(window.angular, window.pluralize)
