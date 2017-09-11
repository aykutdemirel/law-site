/**
 * Main application routes
 */

'use strict'

var errors = require('./components/errors')

module.exports = function (app) {

    app.use('/api/settings', require('./api/settings'))
    app.use('/api/devices', require('./api/devices'))

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|components|app|bower_components|external_components|assets|files)/*').get(errors[404])

    app.route('/*').get(function (req, res) {
        res.sendFile('/index.html', {
            root: app.get('appPath')
        })
    })

}