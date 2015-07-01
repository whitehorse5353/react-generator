module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    grunt.initConfig({
        port: 7259,
        livereloadPort: 35729,
        folderPrefix: './components/',
        componentToCreate: grunt.option('component'),
        componentToBuild: grunt.option('component'),
        componentToServe: grunt.option('component'),
        splitPath: null,
        "mkdir": {
            all: {
                options: {
                    create: ['components']
                }
            }
        },
        "file-creator": {
            "option": {
                files: [
                    {
                        file: '<%= folderPrefix %><%= componentToCreate %>-component/index.html',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, '<html>\r' +
                                '<head>\r' +
                                '<title>' + grunt.option('component') + ' component sample implementation</title>\r' +
                                '<link rel="stylesheet" href="../../.tmp/' + grunt.option('component') + '-component/styles/style.css" />\r' +
                                '</head>\r' +
                                '<body>\r' +
                                '<div id="' + grunt.option('component') + '"></div>\r' +
                                '<script src="../../.tmp/' + grunt.option('component') + '-component/scripts/app.js"></script>\r' +
                                '</body>\r' +
                                '</html>');
                            done();
                        }
                    },
                    {
                        file: '<%= folderPrefix %><%= componentToCreate %>-component/styles/<%= componentToCreate %>.scss',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, '.' + grunt.option('component') + '{ \r\r }');
                            done();
                        }
                    },
                    {
                        file: '<%= folderPrefix %><%= componentToCreate %>-component/scripts/<%= componentToCreate %>Main.js',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, 'var React = require("react") \r' +
                                'var View = require("./views/' + grunt.option('component') + 'View.jsx") \r' +
                                'React.render( <View />, document.getElementById("' + grunt.option('component') + '"));');
                            done();
                        }
                    },
                    {
                        file: '<%= folderPrefix %><%= componentToCreate %>-component/scripts/actions/<%= componentToCreate %>Action.js',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, ';console.log("action")');
                            done();
                        }
                    },
                    {
                        file: '<%= folderPrefix %><%= componentToCreate %>-component/scripts/stores/<%= componentToCreate %>Store.js',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, ';console.log("store")');
                            done();
                        }
                    },
                    {
                        file: '<%= folderPrefix %><%= componentToCreate %>-component/scripts/views/<%= componentToCreate %>View.jsx',
                        method: function (fs, fd, done) {
                            fs.writeSync(fd, 'var React = require("react") \r' +
                                'module.exports = React.createClass({ \r' +
                                'render() { \r' +
                                'return (<p className="' + grunt.option('component') + '">' + grunt.option('component') + ' component</p>)\r' +
                                '}})');
                            done();
                        }
                    }
                ]
            }
        },
        "browserify": {
            dist: {
                files: {
                    './dist/<%= componentToBuild %>-component/scripts/app.js': ['<%= folderPrefix %><%= componentToBuild %>-component/scripts/**/*.jsx', '<%= folderPrefix %><%= componentToBuild %>-component/scripts/**/*.js']
                },
                options: {
                    transform: [
                        'babelify', 'reactify'
                    ]
                }
            },
            dev: {
                files: {
                    './.tmp/<%= componentToServe %>-component/scripts/app.js': ['<%= folderPrefix %><%= componentToServe %>-component/scripts/**/*.jsx', '<%= folderPrefix %><%= componentToServe %>-component/scripts/**/*.js']
                },
                options: {
                    transform: [
                        'babelify', 'reactify'
                    ]
                }
            }
        },
        "concat": {
            options: {
                stripBanners: true
            },
            scss: {
                src: ['<%= folderPrefix %><%= componentToBuild %>-component/styles/**/*.scss'],
                dest: './dist/<%= componentToBuild %>-component/.tmp/styles/<%= componentToBuild %>.scss'
            },
            dev: {
                src: ['<%= folderPrefix %><%= componentToServe %>-component/styles/**/*.scss'],
                dest: './.tmp/<%= componentToServe %>-component/styles/<%= componentToServe %>.scss'
            }
        },
        "sass": {
            options: {
                sourceMap: false,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    './dist/<%= componentToBuild %>-component/styles/style.css': '<%= folderPrefix %><%= componentToBuild %>-component/styles/**/*.scss'
                }
            },
            dev: {
                files: {
                    './.tmp/<%= componentToServe %>-component/styles/style.css': '<%= folderPrefix %><%= componentToBuild %>-component/styles/**/*.scss'
                }
            }
        },
        "clean": {
            tmp: ['./dist/<%= componentToBuild %>-component/.tmp'],
            dev: {
                tmp: ['./.tmp']
            }
        },
        "watch": {
            options: {
                livereload: true
            },
            js: {
                files: ['<%= folderPrefix %><%= componentToServe %>-component/scripts/**/*.jsx', '<%= folderPrefix %><%= componentToServe %>-component/scripts/**/*.js'],
                tasks: ['browserify:dev']
            },
            scss: {
                files: ['<%= folderPrefix %><%= componentToServe %>-component/styles/**/*.scss'],
                tasks: ['concat:dev', 'sass:dev']
            }
        },
        "connect": {
            dev: {
                options: {
                    hostname: 'localhost',
                    port: "<%= port %>",
                    livereload: "<%= livereloadPort %>",
                    open: true
                }
            }
        },
        "copy": {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['<%= folderPrefix %><%= componentToBuild %>-component/*.html'],
                        dest: './dist/<%= componentToBuild %>-component/', filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        "replace": {
            dev: {
                src: ['./dist/<%= componentToBuild %>-component/*.html'],
                overwrite: true,                 // overwrite matched source files
                replacements: [
                    {
                        from: '../../.tmp/<%= componentToBuild %>-component/',
                        to: ''
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-file-creator');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('build', function () {
        if (grunt.option('component')) {
            grunt.task.run(['sass:dist', 'browserify:dist', 'copy', 'replace', 'clean:dev']);
        } else {
            grunt.log.warn('Check your component name.');
        }
    });

    grunt.registerTask('create', function () {
        if (grunt.option('component')) {
            return grunt.task.run(['mkdir', 'file-creator']);
        }
        return grunt.log.warn(grunt.option('component') + '-component', 'is already existing.');
    });

    grunt.registerTask('serve', function () {
        if (grunt.option('component')) {
            return grunt.task.run(['concat:dev', 'sass:dev', 'browserify:dev', 'connect', 'watch']);
        } else {
            grunt.log.warn('Check your component name.');
        }
    });
};