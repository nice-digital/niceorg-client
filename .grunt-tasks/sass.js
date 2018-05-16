module.exports = {
	options: {
		sourceMap: true,
		includePaths: [
			"src",
			"node_modules/@nice-digital/design-system/src/stylesheets",
			"node_modules/@nice-digital/icons/dist"
		],
		outputStyle: "nested",
		sourceMapContents: true
	},
	temp: {
		files: {
			"temp/app.css": "src/app.scss"
		}
	},
	dist: {
		files: {
			"dist/app.css": "src/app.scss"
		}
	}
};
