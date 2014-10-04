'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var hintableAndBeautiable = [
        'lib/**/*.js',
        'test/**/*.js',
        'index.js',
        'gruntfile.js'
    ];

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: hintableAndBeautiable
        },
        jsbeautifier: {
            files: hintableAndBeautiable,
            options: {
                config: './.jsbeautifyrc'
            }
        },
        mochaTest: {
            BDD: {
                options: {
                    reporter: 'spec',
                    require: 'coverage/blanket'
                },
                src: [
                    'test/**/*.js'
                ]
            },
            coverageHTML: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'coverage/coverage.html'
                },
                src: [
                    'test/**/*.js'
                ]
            },
            coverageJSON: {
                options: {
                    reporter: 'json-cov',
                    quiet: true,
                    captureFile: 'coverage/coverage.json'
                },
                src: [
                    'test/**/*.js'
                ]
            }
        },
        env: {
            options: {},
            dev: {
                NODE_ENV: 'development'
            },
            test: {
                NODE_ENV: 'test'
            },
            production: {
                NODE_ENV: 'production'
            }
        },
        watch: {
            test: {
                files: [
                    'lib/**/*.js',
                    'test/**/*.js',
                    '.jsbeautifyrc',
                    '.jshintrc',
                    'gruntfile.js'
                ],
                tasks: [
                    'test'
                ]
            }
        },
        shell: {}
    });

    grunt.registerTask('test', [
        'jshint',
        'jsbeautifier',
        'env:test',
        'mochaTest:BDD',
        'mochaTest:coverageHTML',
        'mochaTest:coverageJSON'
    ]);

    grunt.registerTask('default', [
        'test',
        'watch:test'
    ]);
};
