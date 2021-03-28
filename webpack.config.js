const webpack = require("webpack"),
	path = require("path"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pkg = require("./package.json");

module.exports = (env) => {
	return {
		entry: ["./src/app.js", "./src/app.scss"],
		output: {
			filename: "app.js",
			chunkFilename: "[name].js",
			path: path.resolve(__dirname, "dist"),
			clean: true
		},
		externals: {
			// Assume jQuery is loaded externally, from a CDN
			jquery: "jQuery"
		},
		mode: "development",
		optimization: {
			//runtimeChunk: "single",
			// splitChunks: {
			// 	chunks: "all"
			// }
			// splitChunks: {
			// 	chunks: "all",
			// 	cacheGroups: {
			// 		vendors: false,
			// 		//default: false,
			// 		default: {
			// 			test: (module) => {
			// 				console.log(module.identifier());
			// 				return module.identifier().includes("pluginizr");
			// 			},
			// 			chunks: "all"
			// 			//enforce: true
			// 			//name: "somethingname",
			// 			//reuseExistingChunk: true
			// 		}
			// 	}
			// }
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
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"]
						}
					}
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
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
