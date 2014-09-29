'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

var xmlUtil = require('./node_modules/angular-point-xml-parser/index.js');
var pkg = require('package.json');

module.exports = function (grunt) {


    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: {
            // configurable paths
            app: 'app',
            dist: 'dist',
            test: 'test'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                    '{.tmp,<%= config.app %>}/scripts/{,*/}*.js'
                ],
                tasks: [],
//                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: []
//                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{.tmp,<%= config.app %>}/{dev,scripts,modules,views}/**/*.{js,html,xml}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
//                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= config.app %>',
                        '<%= config.test %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= config.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= config.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/*',
                            '!<%= config.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },


        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= config.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
//                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: [
                '<%= config.dist %>/{,*/}*.html',
                '<%= config.dist %>/scripts/**/*.html'
            ],
            css: ['<%= config.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= config.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
//    imagemin: {
//      dist: {
//        files: [
//          {
//            expand: true,
//            cwd: '<%= config.app %>/images',
//            src: '{,*/}*.{png,jpg,jpeg,gif}',
//            dest: '<%= config.dist %>/images'
//          }
//        ]
//      }
//    },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngAnnotate: {
            dist: {
                files: [
                    {src: 'dist/scripts/scripts.js'}
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            //HTML
                            '*.html',

                            //PROJECT SPECIFIC RESOURCES
                            '*.{ico,png,txt}',
                            'images/{,*/}*.{png,jpg,gif}',

                            //FONT AWESOME
                            'bower_components/font-awesome/css/**',
                            'bower_components/font-awesome/fonts/**',

                            //IE SHIM
                            'bower_components/angular-point-ie-safe/dist/angular-point-ie-safe.min.js',

                            //Glyph Icons
                            'bower_components/bootstrap/fonts/**'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= config.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    },
                    //Select2
                    {
                        expand: true,
                        dest: '<%= config.dist %>/styles/css/',
                        flatten: true,
                        src: ['<%= config.app %>/bower_components/select2/*.{png,gif}']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'svgmin'
            ]
        },

        ngtemplates: {
            app: {
                options: {
                    module: pkg.module,
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                },
                cwd: '<%= config.app %>',
                src: [
                    'views/*.html',
                    'modules/**/*.html',
                    'scripts/**/*.html'
                ],
                dest: '<%= config.dist %>/scripts/templates.js'
            }
        },

        uncss: {
            dist: {
                files: {
                    'dist/styles/css/tidy.css': ['<%= config.app %>/**.html', '!<%= config.app %>/bower_components/']
                }
            }
        },

        uglify: {
            dist: {
                files: [
                    {
                        '<%= config.dist %>/scripts/vendor.js': [
                            '<%= config.dist %>/scripts/vendor.js'
                        ]
                    },
                    {
                        '<%= config.dist %>/scripts/templates.js': [
                            '<%= config.dist %>/scripts/templates.js'
                        ]
                    },
                    {
                        '<%= config.dist %>/scripts/scripts.js': [
                            '<%= config.dist %>/scripts/scripts.js'
                        ]
                    }
                ]
            }
        },

        // Test settings
        karma: {
            options: {
                browsers: ['Chrome', 'PhantomJS'],
                configFile: 'karma.conf.js'
            },
            unit: {
                autoWatch: false,
                singleRun: true,
                browsers: ['PhantomJS']
            },
            continuous: {
                autoWatch: true,
                singleRun: false,
                browsers: ['PhantomJS']
            },
            coverage: {
                singleRun: true,
                browsers: ['Chrome'],
                preprocessors: {
                    'src/services/*.js': ['coverage'],
                    'src/factories/*.js': ['coverage']
                }
            },
            debug: {
                browsers: ['Chrome'],
                singleRun: false,
                autoWatch: true
            }
        },

        ngdocs: {
            options: {
                dest: 'docs',
                scripts: [
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular.js',
                    '//ajax.googleapis.com/ajax/libs/angularjs/1.2.20/angular-animate.min.js'
                ],
                html5Mode: false,
                analytics: {
                    account: 'UA-51195298-1',
                    domainName: 'scatcher.github.io'
                },
//                startPage: '/api',
                title: pkg.name
            },
            api: {
                src: [
                    '<%= config.app %>/scripts/**/*.js',
                    '<%= config.app %>/modules/**/*.js'
                ],
                title: 'App Documentation',
                api: false
            }
        },
        'gh-pages': {
            options: {
                base: 'docs'
            },
            src: ['**']
        },
        'bump': {
            options: {
                files: ['package.json', 'bower.json'],
                commit: false,
                createTag: false,
                push: false
            }
        },
        cdnify: {
            options: {
                cdn: require('google-cdn-data')
            },
            dist: {
                html: ['<%= config.dist %>/index.html']
            }
        }


    });

    grunt.registerTask('parse-xml', function () {
        xmlUtil.createJSON({
            dest: 'app/dev',
            fileName: 'parsedXML.js',
            constantName: 'apCachedXML',
            src: ['app/bower_components/angular-point/test/mock/xml/', 'app/dev/']
        });
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'parse-xml',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        //'concurrent:test',
        //'autoprefixer',
        //'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('coverage', [
        'karma:coverage'
    ]);

    grunt.registerTask('debugtest', [
        'karma:debug'
    ]);

    grunt.registerTask('autotest', [
        'karma:continuous'
    ]);

    grunt.registerTask('build', [
        'bump',
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cdnify',
        'cssmin',
        'ngtemplates',
        'uglify',
//        'rev',
        'usemin',
        'doc'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('doc', [
//        'clean:docs',
        'ngdocs'
    ]);

    grunt.registerTask('build-docs', [
        'doc',
        'gh-pages'
    ]);

};
