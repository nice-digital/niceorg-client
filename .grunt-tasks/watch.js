var sasslint = require("./sasslint");

module.exports = {
	options: {
		livereload: 35731
	},
	sass: {
		files: sasslint.target.src,
		tasks: [
			"sasslint",
			"sass:temp",
			"postcss:temp"
		],
		options: {
			spawn: false
		}
	},
	express: {
		files: ["server/**/*.js"],
		tasks: ["express"],
		options: {
			spawn: false,
			atBegin: true
		}
	}
};
