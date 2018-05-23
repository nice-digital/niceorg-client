module.exports = {
	dist: {
		cwd: "node_modules/@nice-digital/icons/dist/",
		src: ["*.{eot,woff,woff2,ttf,svg}"],
		dest: "dist/css/fonts/",
		expand: true,
		flatten: true,
		filter: "isFile"
	},
	temp: {
		cwd: "node_modules/@nice-digital/icons/dist/",
		src: ["*.{eot,woff,woff2,ttf,svg}"],
		dest: "temp/css/fonts/",
		expand: true,
		flatten: true,
		filter: "isFile"
	}
};
