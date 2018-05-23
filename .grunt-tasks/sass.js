module.exports = {
	options: {
		includePaths: [
			"src",
			"node_modules/@nice-digital/design-system/src/stylesheets",
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
