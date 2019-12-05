var tilde_importer = require("grunt-sass-tilde-importer");

module.exports = {
	options: {
		importer: tilde_importer,
		includePaths: [
			"src",
			"node_modules/@nice-digital/design-system/scss",
			"node_modules/@nice-digital/icons/dist"
		],
		outputStyle: "nested",
		sourceMap: true,
		sourceMapContents: true
	},
	temp: {
		files: {
			"temp/css/app.css": "src/app.scss"
		}
	},
	dist: {
		files: {
			"dist/css/app.css": "src/app.scss"
		},
		options: {
			sourceComments: true
		}
	}
};
