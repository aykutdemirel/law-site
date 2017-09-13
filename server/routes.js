/**
 * Main application routes
 */

'use strict'

var errors = require('./components/errors')

var jwt = require('express-jwt');

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

module.exports = function (app) {

    app.use('/api/settings', require('./api/settings'))
    app.use('/api/devices', require('./api/devices'))
    app.use('/api/authentication', require('./api/authentication'))

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|components|app|bower_components|external_components|assets|files)/*').get(errors[404])

    app.route('/*').get(function (req, res) {
        res.sendFile('/index.html', {
            root: app.get('appPath')
        })
    })

}