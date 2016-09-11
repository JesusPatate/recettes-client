module.exports = function(grunt) {
    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
        shell: {
            flyway: {
                command: command => 'flyway -configFile=config/flyway.conf ' + command
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('migratedb', 'Migrates database schema to the latest version', ['shell:flyway:migrate']);
};
