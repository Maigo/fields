module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        // ----- Environment
        pkg: grunt.file.readJSON('package.json'),

        properties: {
            src: {
                root: 'src',
                main: 'src/main',
                libs: 'src/libs',
                test: 'src/test'
            },
            tar: {
                root: 'target',
                main: 'target/js',
                libs: 'target/libs',
                test: 'target/js-test',
                report: 'target/js-report'
            },
            build: {
                bower: 'bower_components'
            }
        },

        // ----- TypeScript compilation
        typescript: {
            compile: {
                src: ['<%= properties.src.main %>/**/*.ts'],
                dest: '<%= properties.tar.main %>/<%= pkg.name %>.js',
                options: {
                    basePath: '<%= properties.src.main %>',
                    module: 'amd',
                    target: 'es5',
                    sourceMap: true,
                    declaration: true,
                    comments: true
                }
            },
            compile_test: {
                src: ['<%= properties.src.test %>/**/*.ts', '<%= properties.src.main %>/**/*.ts'],
                dest: '<%= properties.tar.test %>',
                options: {
                    basePath: '<%= properties.src.root %>',
                    module: 'amd',
                    target: 'es5'
                }
            }
        },

        copy: {
            libs: {
                files: [
                    {expand: true, flatten:true, cwd: '<%= properties.build.bower %>', src: ['dijon/dist/dijon.min.js'], dest: '<%= properties.tar.libs %>/'},
                ]
            }
        },

        // ------- Unit tests with code coverage
        //  See https://github.com/gruntjs/grunt-contrib-jasmine
        jasmine: {
            run: {
                // the code to be tested
                src: ['<%= properties.tar.main %>/**/*.js'],
                options: {
                    // the tests
                    specs: '<%= properties.tar.test %>/**/*Spec.js',
                    // third party libraries
                    vendor: ['<%= properties.tar.libs %>/**/*.js']
                }
            }
        },

        // ------ Optional: make javascript small (and unreadable)
        //  See https://github.com/gruntjs/grunt-contrib-uglify
        //  Note: Consider doing the uglification in the _final_ webapp
        uglify: {
            options: {
                // add a small descriptive banner
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            minify_js: {
                // minify javascript file by renaming it to *.min.js
                files: [{
                    expand: true,
                    cwd: '<%= properties.tar.main %>',
                    src: '**/*.js',
                    dest: '<%= properties.tar.main %>',
                    ext: '.<%= pkg.version %>.min.js'
                }]
            }
        }
    });

    // ----- Setup default task
    grunt.registerTask('default', ['typescript:compile', 'typescript:compile_test', 'copy:libs', 'jasmine']);

    // ----- Setup maven tasks
    grunt.registerTask('compile', ['typescript:compile', 'copy:libs']);
    grunt.registerTask('test', ['typescript:compile_test', 'copy:libs', 'jasmine']);
//    grunt.registerTask('package', ['uglify']);
    grunt.registerTask('package', []);
};

