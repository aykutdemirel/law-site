'use strict'

var config = require('../../config/environment')

exports.index = function (req, res) {
    res.json({
        currentYear: new Date().getFullYear(),

        tokenName: config.tokenName,

        api: {
            public: config.apis.public,
            local: { url: '/api' },
            mock: { url: '/mock-api' }
        },
        composer: config.composer,
        website: config.website,

        environment: config.env,
        version: config.version
    })
}