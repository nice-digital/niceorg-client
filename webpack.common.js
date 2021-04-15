const webpack = require("webpack"),
	path = require("path"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;

const pkg = require("./package.json");

module.exports = (env) => {
	return {
		entry: {
			app: path.resolve(__dirname, "./src/js/app.js")
		},
		output: {
			uniqueName: "niceorgclient",
			// Static name of 'app.js' makes referencing from niceorg and guidance web easier...
			filename: "js/[name].js",
			// ...but hashed chunk names for dynamically loaded modules for caching
			chunkFilename: "js/[name]-[contenthash].js",
			path: path.resolve(__dirname, "dist"),
			// We deploy NOC into a sub folder on the CDN:
			publicPath: "/niceorg/",
			clean: true
		},
		externals: {
			// jQuery is loaded externally, from a CDN
			jquery: "jQuery"
		},
		resolve: {
			alias: {
				// Use preact in place of React because it's smaller and faster
				react: "preact/compat",
				"react-dom/test-utils": "preact/test-utils",
				"react-dom": "preact/compat"
			}
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					// Group react etc from node modules into a common vendor bundle
					common: {
						test: /[\\/]node_modules[\\/](?!@nice-digital)/,
						name: "common"
					},
					// Single CSS file as per https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
					styles: {
						name: "app",
						type: "css/mini-extract",
						chunks: "all",
						enforce: true
					}
				}
			}
		},
		plugins: [
			new BundleAnalyzerPlugin(),
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
				filename: "css/[name].css"
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: "babel-loader"
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: "css-loader",
							options: { sourceMap: true }
						},
						{
							// PostCSS allows autoprefixing (etc). See postcsss.config.js.
							loader: "postcss-loader",
							options: { sourceMap: true }
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
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
						// Using webpack hashed filenames instead of the cache buster querystrings in nice-icons would be nice...
						// ...but just use the existing filename as-is like 'nice-icons.woff2' for the time-being
						filename: "fonts/[base]",
						// Using a relative public path allows us to move the output dir on deployment and paths to fonts still work
						publicPath: "../"
					}
				}
			]
		}
	};
};
