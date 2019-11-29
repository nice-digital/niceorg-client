/*eslint-env node*/
const path = require("path");

module.exports = grunt => {
	require("load-grunt-config")(grunt, {
		configPath: path.join(process.cwd(), ".grunt-tasks"),
		pkg: grunt.file.readJSON("package.json"),
		jitGrunt: {
			staticMappings: {
				sasslint: "grunt-sass-lint",
				express: "grunt-express-server"
			}
		}
	});

	var r = grunt.registerTask;

	r("default", ["clean", "copy:temp", "sasslint", "sass:temp", "postcss:temp", "watch"]);

	r("dist", ["clean", "copy:dist", "sasslint", "sass:dist", "postcss:distMin", "postcss:dist", "cssmin"]);
};
