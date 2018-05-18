const grunt = require("grunt");

const pkg = require("./../package.json");

// Banners for top of css
const bannerData = {
		name: pkg.name,
		version: grunt.option("buildNumber") || pkg.version,
		date: grunt.template.today("yyyy-mm-dd"),
		year: grunt.template.today("yyyy")
	},
	banner = grunt.template.process(pkg.config.banner, { data: bannerData }),
	bannerMin = grunt.template.process(pkg.config.bannerMin, { data: bannerData });

const processors = [
	require("pixrem")({ html: false, atrules: true }), // add fallbacks for rem units for IE8+
	require("autoprefixer")() // add vendor prefixes
];

module.exports = {
	options: {
		map: true
	},
	temp: {
		src: "temp/css/*.css",
		options: processors
	},
	distMin: {
		src: "dist/css/app.css",
		dest: "dist/css/app.min.css",
		options: {
			processors: processors.concat(require("postcss-banner")({ banner: bannerMin, important: true, inline: true }))
		}
	},
	dist: {
		src: "dist/css/app.css",
		options: {
			processors: processors.concat(require("postcss-banner")({ banner: banner, important: true}))
		}
	}
};
