module.exports = function (grunt) {
    require('time-grunt')(grunt);
    //require('jit-grunt')(grunt);

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        criticalcss: {
            custom: {
                options: {
                    url: "http://127.0.0.1:8000",
                    width: 1200,
                    height: 900,
                    outputfile: "templates/critical.css",
                    filename: "css/main.css",
                    buffer: 800*1024,
                    ignoreConsole: false
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1
            },
            dist: {
                files: {
                  'core/static/css/main.min.css': ['core/static/css/main.css'],
                }
            },
        },

        concat: {
            pre_close_head:{
                src: [
                    'bower_components/modernizr/modernizr.js',
                ],
                dest:'core/static/js/pre_head.js'
            },
            post_body: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/jquery-placeholder/jquery.placeholder.js',
                    'bower_components/jquery.cookie/jquery.cookie.js',
                    'bower_components/fastclick/lib/fastclick.js',
                    'bower_components/foundation/js/foundation.js', 
                    'js/activate_foundation.js',
                ],
                dest: 'core/static/js/post_body.js'
            },
        },

        uglify: {
            pre_close_head: {
                files: {
                    'core/static/js/pre_head.min.js': 'core/static/js/pre_head.js',
                }
            },
            post_body: {
                files: {
                    'core/static/js/post_body.min.js': 'core/static/js/post_body.js',
                }
            },
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/build/'
                }]
            }
        },

        svgstore: {
            options: {
                prefix : 'shape-', // This will prefix each <g> ID
            },
            default: {
                files: {
                    'core/static/images/svg-defs.svg': ['images/*.svg', 'images/**/*.svg'],
                }
            }
        },

        sass: {
            options: {
                sourceMap: true,
                includePaths: ['bower_components/foundation/scss'],
                //outputStyle: 'compressed',
            },
            dist: {
                files: {
                    'core/static/css/main.css': 'css/main.scss'
                }
            }
        },

        watch: {
            src: {
                files: ['js/*.js'],
                tasks: ['javascript']
            },
            sass: {
                files: ['css/**.scss'],
                tasks: ['css'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['*/templates/**/*.html', '*/templates/*.html','templates/*.html'],
                options: {
                    livereload: true
                }
            },
            svg:{
                files: ['images/*.svg','images/**/*.svg'],
                tasks: ['svg'],
            }
        },

        accessibility: {
            options : {
                accessibilityLevel: 'WCAG2A',
                domElement: false,
                force: true,
                ignore : [
                    'WCAG2A.Principle1.Guideline1_1.1_1_1.G73,G74',
                    'WCAG2A.Principle2.Guideline2_4.2_4_4.H77,H78,H79,H80,H81'
                ]
            },
            test : {
                files: [{
                    expand  : true,
                    cwd     : 'html',
                    src     : ['*.html'],
                    dest    : 'reports/',
                    ext     : '-report.txt'
                }]
           },
        },
    });


    // 2. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-criticalcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-accessibility');

    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('javascript', ['concat', 'uglify'])
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin:dist', 'svgstore']);
    grunt.registerTask('basecss', ['criticalcss', 'cssmin'])
    grunt.registerTask('images', ['imagemin']);
    grunt.registerTask('watch-changes', ['default', 'watch']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['sass', 'cssmin:dist']);
    grunt.registerTask('svg', ['svgstore']);
    grunt.registerTask('all', ['concat', 'uglify', 'sass', 'imagemin']);
};
