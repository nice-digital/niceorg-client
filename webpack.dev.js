const { merge } = require("webpack-merge"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	path = require("path");

const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const common = require("./webpack.common.js");

const { nocProxyMiddlewareFactory } = require("./server/noc-proxy-middleware");

module.exports = (env) => {
	const { niceorgBaseUrl = "https://www.nice.org.uk" } = env;

	return merge(common(env), {
		mode: "development",
		devtool: "inline-source-map",
		plugins: [
			new BundleAnalyzerPlugin(),
			new HtmlWebpackPlugin({
				filename: "playground.html",
				template: "server/playground.ejs",
				inject: "body",
				scriptLoading: "defer",
				templateParameters: {
					title: "NOC playground"
				}
			})
		],
		devServer: {
			static: {
				directory: path.join(__dirname, "dist"),
				// Replicate the CDN sub folder:
				publicPath: "/niceorg"
			},
			port: 8087,
			open: ["niceorg/playground.html"],
			hot: true,

			setupMiddlewares: (middlewares, devServer) => {
				// Allow cross origin requests for font files
				devServer.app.use(function (req, res, next) {
					res.header("Access-Control-Allow-Origin", "*");
					res.header(
						"Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept"
					);
					next();
				});

				console.info(`Proxying requests to ${niceorgBaseUrl}`);

				devServer.app.use(nocProxyMiddlewareFactory(niceorgBaseUrl));

				return middlewares;
			}
		}
	});
};
