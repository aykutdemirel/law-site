'use strict'

module.exports = function (grunt) {
    var localConfig
    try {
        localConfig = require('./server/config/local.env')
    } catch(e) {
        localConfig = {}
    }

    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server',
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        protractor: 'grunt-protractor-runner',
        buildcontrol: 'grunt-build-control',
        sass:'sass',
        browserify:'grunt-browserify'
    })

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt)

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            client: require('./bower.json').appPath || 'client',
            dist: 'dist'
        },
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server/app.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server/app.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
                    '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
                    '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
                    '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    'server/**/*.{js,json}'
                ],
                tasks: ['express:dev', 'wait'],
                options: {
                    livereload: true,
                    nospawn: true // without this option specified express won't be reloaded
                }
            },
            sass:{
                files: [
                    'client/assets/css/*.scss',
                    'client/assets/css/common/*.scss'
                ],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            client:{
                src: [
                    '<%= yeoman.client %>/{app,components}/**/*.js'
                ]
            },
            server: {
                options: {
                    jshintrc: 'server/.jshintrc'
                },
                src: [
                    'server/**/*.js'
                ]
            },
            all: [
                '<%= yeoman.client %>/{app,components}/**/*.js'
            ],
            test: {
                src: []
            }
        },

        //sass to css

        sass: {
            dist: {
                files: {
                    '<%= yeoman.client %>/assets/css/main.css': '<%= yeoman.client %>/assets/css/main.scss',
                    '<%= yeoman.client %>/assets/css/bootstrap.css': '<%= yeoman.client %>/assets/css/bootstrap.scss',
                    '<%= yeoman.client %>/assets/css/open-sans.css': '<%= yeoman.client %>/assets/css/open-sans.scss'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '!<%= yeoman.dist %>/.openshift',
                        '!<%= yeoman.dist %>/Procfile'
                    ]
                }]
            },
            server: '.tmp'
        },

        // add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/'
                }]
            }
        },

        // renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/public/app/{,*/}*.js',
                        '<%= yeoman.dist %>/public/app/{,*/}*.css'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.client %>/index.html'],
            options: {
                dest: '<%= yeoman.dist %>/public'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
            js: ['<%= yeoman.dist %>/public/{,*/}*.js'],
            options: {
                assetsDirs: [
                    // '<%= yeoman.dist %>/public',
                    // '<%= yeoman.dist %>/public/assets/img'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/assets/img',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/public/assets/img'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/assets/img',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/public/assets/img'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: '*/**.js',
                    dest: '.tmp/concat'
                }]
            }
        },

        // Package all the html partials into a single javascript payload
        ngtemplates: {
            options: {
                // This should be the name of your apps angular module
                module: 'smartcity.app',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                usemin: 'app/app.js'
            },
            main: {
                cwd: '<%= yeoman.client %>',
                src: ['{app,components}/**/*.html'],
                dest: '.tmp/templates.js'
            },
            tmp: {
                cwd: '.tmp',
                src: ['{app,components}/**/*.html'],
                dest: '.tmp/tmp-templates.js'
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.client %>',
                    dest: '<%= yeoman.dist %>/public',
                    src: [
                        '*.{ico,png,txt}',
                        'bower_components/**/*',
                        'external_components/**/*',
                        //'assets/images/{,*/}*.{webp}',
                        'assets/img/app-type/**/*',
                        'assets/img/general/**/*',
                        'assets/img/map-markers/**/*',
                        'index.html'
                    ]
                },{
                    expand: true,
                    cwd: '<%= yeoman.client %>/assets/',
                    dest: '<%= yeoman.dist %>/public',
                    src: [
                        'fonts/**/*',
                        'img/icons/**/*',
                        'img/backgrounds/**/*',
                        'img/widget-img/**/*'
                    ]
                }]
            }
        },

        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                connectCommits: false,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            heroku: {
                options: {
                    remote: 'heroku',
                    branch: 'master'
                }
            },
            openshift: {
                options: {
                    remote: 'openshift',
                    branch: 'master'
                }
            }
        },

        // Run some tasks in parallel to speed up the build process
        // concurrent: {
        //     debug:[],
        //     server: [],
        //     dist: [
        //         'imagemin',
        //         'svgmin'
        //     ],
        //     test: []
        // },

        concurrent: {
            debug:[],
            server: [],
            dist: [],
            test: []
        },

        protractor: {
            options: {
                configFile: 'protractor.conf.js'
            },
            chrome: {
                options: {
                    args: {
                        browser: 'chrome'
                    }
                }
            }
        },

        env: {
            test: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            },
            all: localConfig
        }


    })

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...')

        var done = this.async()

        setTimeout(function () {
            grunt.log.writeln('Done waiting!')
            done()
        }, 1500)
    })

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async()
    })

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive'])
        }

        if (target === 'debug') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'concurrent:server',
                'autoprefixer',
                'concurrent:debug'
            ])
        }

        grunt.task.run([
            'clean:server',
            'env:all',
            'concurrent:server',
            'jshint:client',
            'sass',
            'autoprefixer',
            'express:dev',
            'wait',
            'open',
            'watch'
        ])
    })

    grunt.registerTask('test', function (target) {
        if (target === 'server') {
            return grunt.task.run([
                'env:all',
                'env:test',
                'mochaTest'
            ])
        } else if (target === 'client') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'concurrent:test',
                'autoprefixer',
                'karma'
            ])
        } else if (target === 'e2e') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'env:test',
                'concurrent:test',
                'autoprefixer',
                'express:dev',
                'protractor'
            ])
        }

        else grunt.task.run([
                'test:server',
                'test:client'
            ])
    })

    grunt.registerTask('es', [
        'clean:server',
        'env:all',
        'sass',
        'browserify:dist',
        'express:dev',
        'wait',
        'open',
        'watch'
    ])

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'autoprefixer',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'rev',
        'usemin'
    ])

    grunt.registerTask('default', [
        'newer:jshint',
        'test:e2e',
        'build'
    ])
}