
module.exports = (grunt) ->

    # Project configuration.
    grunt.initConfig
        meta:
            version: '0.1.0',
            banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://PROJECT_WEBSITE/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'YOUR_NAME; Licensed MIT */'
        
        uglify: 
            my_target: 
                files:
                    'dest/main.min.js': ['src/input1.js', 'src/input2.js']
            
            
            

    grunt.loadNpmTasks 'grunt-contrib-uglify'
    # Default task.
    grunt.registerTask 'default', 'uglify'
    return

