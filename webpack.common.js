const webpack = require("webpack"),
	path = require("path"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkg = require("./package.json");

module.exports = (env) => {
	return {
		entry: [
			path.resolve(__dirname, "./src/js/app.js"),
			path.resolve(__dirname, "./src/scss/app.scss")
		],
		output: {
			// Fixed app.js to reference from niceorg and guidance web...
			filename: "app.js",
			// ...but hashed chunk names for dynamically loaded modules for caching
			chunkFilename: "[name]-[contenthash].js",
			path: path.resolve(__dirname, "dist"),
			publicPath: "/",
			clean: true
		},
		externals: {
			// jQuery is loaded externally, from a CDN
			jquery: "jQuery"
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					// Group react etc from node modules into a common vendor bundle
					common: {
						test: /[\\/]node_modules[\\/](?!@nice-digital)/,
						name: "common"
					}
				}
			}
		},
		plugins: [
			new webpack.BannerPlugin(
				[
					"niceorg-client",
					`Version ${env.version || pkg.version} | ${
						new Date().toISOString().split("T")[0]
					}`,
					`© Copyright NICE 2015-${new Date().getFullYear()}`,
					"Licensed under MIT"
				].join("\n")
			),
			new MiniCssExtractPlugin({
				filename: "app.css"
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader"
				},
				// {
				// 	// Components include their own SCSS imports but they're already
				// 	// loaded via the main CSS bundle. Without ignoring them we get errors.
				// 	test: /\.scss$/,
				// 	include: /node_modules/,
				// 	loader: "ignore-loader"
				// },
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: "css-loader"
						},
						{
							// PostCSS allows autoprefixing (etc). See postcsss.config.js.
							loader: "postcss-loader"
						},
						{
							loader: "sass-loader",
							options: {
								sassOptions: {
									includePaths: [
										"./node_modules/@nice-digital/design-system/scss"
									]
								}
							}
						}
					]
				},
				{
					// Allow copying nice-icons font files into the output directory
					test: /@nice-digital[\\/]icons[\\/]dist[\\/].*\.(ttf|woff|woff2|eot|svg)$/,
					type: "asset/resource",
					generator: {
						// TODO: Use webpack hashed filenames instead of the cache
						// buster querystrings in nice-icons. So just use the existing
						// filename like nice-icons.woff2
						filename: "fonts/[base]"
					}
				}
			]
		}
	};
};
