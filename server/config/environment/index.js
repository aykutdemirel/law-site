/**
 * Base configuration.
 * All configurations will extend these options
 */

'use strict'

var path = require('path')
var _ = require('lodash')

var all = {
    // App version
    version: require(__dirname + '/../../../package.json').version,

    // Server IP
    ip: process.env.IP || undefined,

    // Node environment
    env: process.env.NODE_ENV,

    // Root path of app
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Secret for session
    secrets: {
        cookie: process.env.COOKIE_SECRET || 'wSy3nk8sIzFOCJVu5YHt5qlt44C0msjA',
        session: process.env.SESSION_SECRET || '13dcE9BKH9R6cmTG5AOe9k736hy5b556'
    },

    // MongoDB connection options
    mongo: {
        options: {
            db: { safe: true }
        }
    },

    // Browser cookie token name
    tokenName: 'scaffold.token',

}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, require('./' + process.env.NODE_ENV + '.js') || {})