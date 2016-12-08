module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // concat: {
        //     options: {
        //         separator: ';',
        //     },
        //     app: {
        //         src: [
        //             './bower_components/jquery/dist/jquery.js',
        //             './bower_components/bootstrap/dist/js/bootstrap.js'
        //         ],
        //         dest: './public/admin/0/js/jquery_bootstrap.js'
        //     }
        // },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            app: {
                // files: {
                //     './public/admin/0/js/jb.min.js': './public/admin/0/js/jquery_bootstrap.js',
                //     './public/admin/0/js/jqbo.min.js': '<%= concat.app.dest %>'
                // }
                // src: 'src/<%= pkg.name %>.js',
                // dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            app: ['Gruntfile.js', './public/{admin,home}/**/js/*.js', './routes/*.js']
        },
        copy: {
            angular: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['./bower_components/angular/angular.min.js'],
                    dest: './public/common/js/',
                    filter: 'isFile'
                }]
            },
            bootstrap: {
                files: [{ //bootstrap
                    expand: true,
                    flatten: false,
                    cwd: './bower_components/bootstrap/dist',
                    src: ['css/*.min.css', 'fonts/*', 'js/*.min.js'],
                    dest: './public/common/',
                    filter: 'isFile'
                }]
            },
            fontawesome: {
                files: [{ //font-awesome
                    expand: true,
                    flatten: false,
                    cwd: './bower_components/font-awesome/',
                    src: ['fonts/*', 'css/*.min.css'],
                    dest: './public/common/',
                    filter: 'isFile'
                }]
            },
            jquery: {
                files: [{ //jquery1、2、3
                    expand: true,
                    flatten: false,
                    src: ['./bower_components/jquery?/dist/jquery.min.js'],
                    dest: './public/common/js/jquery',
                    filter: 'isFile',
                    rename: function(dest, src) {
                        //提取出jquery1、jquery2、jquery3中的1、2、3
                        var version = src.substring(src.indexOf('jquery'), src.indexOf('/dist')).substring(6, 7);
                        // var filename = src.substring(src.lastIndexOf('/'), src.length);
                        console.log([version]);
                        return dest + version + '.min.js';
                    }
                }]
            }
        },
        watch: {
            // test: {
            //     files: ['./public/common/js/test.js'], //测试
            //     tasks: ['uglify:app', 'jshint:app']
            // },
            angular: {
                files: './bower_components/angular/angular.min.js',
                tasks: ['copy:angular']
            },
            fontawesome: {
                files: [
                    './bower_components/font-awesome/fonts/*',
                    './bower_components/font-awesome/css/*.min.css'
                ],
                tasks: ['copy:fontawesome']
            },
            bootstrap: {
                files: [
                    [
                        '.bower_components/bootstrap/dist/js/*.min.js',
                        '.bower_components/bootstrap/dist/css/*.min.js',
                        '.bower_components/bootstrap/dist/fonts/*'
                    ]
                ],
                tasks: ['copy:bootstrap']
            },
            jquery: {
                files: ['./bower_components/jquery*/dist/jquery.min.js'], // jquery 监听
                tasks: ['copy:jquery']
            }
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    // 默认被执行的任务列表。

    grunt.registerTask('default', [/*'concat', */'uglify', 'jshint', 'copy']);

};
