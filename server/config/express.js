/**
 * Express configuration
 */

'use strict'

var express = require('express')
var favicon = require('serve-favicon')
var morgan = require('morgan')
var compress = require('compression')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')
var csrf = require('csurf')
var errorHandler = require('errorhandler')
var busboy = require('connect-busboy')
var useragent = require('express-useragent')
var path = require('path')
var config = require('./environment')

module.exports = function (app) {
    var env = app.get('env')

    var views = config.root

    if(env === 'development' || env === 'test'){
        views += '/client'
    }else if(env === 'PRODUCTION'){
        views += '/dist/public'
    }

    app.set('views', views)
    app.engine('html', require('ejs').renderFile)
    app.set('view engine', 'html')
    app.use(compress())
    app.use(useragent.express())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    //upload img
    app.use(busboy())

    app.use(methodOverride())

    app.use(cookieParser(config.secrets.cookie))
    app.use(cookieSession({
        name: 'session',
        secret: config.secrets.session,
        cookie: {
            maxAge: 2678400000 // 31 days
        }
    }))


    // this part is about security
    app.use(csrf())

    // error handler for CSRF
    app.use(function (err, req, res, next) {
        if (err.code !== 'EBADCSRFTOKEN') return next(err)

        res.status(403).send({ message: 'Invalid CSRF token.' })
    })

    app.use(function (req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        next()
    })

    if (env === 'PRODUCTION') {
        //app.use(favicon(path.join(config.root, 'public', 'favicon.png')))
        app.use(express.static(path.join(config.root, '/dist/public')))
        app.set('appPath', config.root + '/dist/public')
    }

    if (env === 'development' || env === 'test') {
        app.use(require('connect-livereload')())
        app.use(express.static(path.join(config.root, '.tmp')))
        app.use(express.static(path.join(config.root, 'client')))
        app.set('appPath', config.root + '/client')

        app.use(morgan('dev'))
        app.use(errorHandler()) // error handler has to be last
    }

    // TODO: move to a separate npm package
    app.use(function (req, res, next) {
        if (!isSupportedBrowser(req.useragent)) {
            res.render('unsupported', {
                layout: false,
                currentYear: new Date().getFullYear()
            })
        } else {
            next()
        }
    })

    function isSupportedBrowser (userAgent) {
        var version = parseInt(userAgent.version, 10)
        if (userAgent.isDesktop) {
            if ((userAgent.isChrome && version < 11) ||
                (userAgent.isFirefox && version < 22) ||
                (userAgent.isIE && version < 10)) {
                return false
            }
        }

        return true
    }
}