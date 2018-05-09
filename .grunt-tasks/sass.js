module.exports = {
	temp: {
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
		files: {
			"temp/app.css": "src/app.scss"
		}
	},
	dist: {
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
		files: {
			"dist/app.css": "src/app.scss"
		}
	}
};
