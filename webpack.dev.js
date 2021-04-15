const { merge } = require("webpack-merge"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	path = require("path");

const common = require("./webpack.common.js");

const { nocProxyMiddlewareFactory } = require("./server/noc-proxy-middleware");

module.exports = (env) => {
	const { niceorgBaseUrl = "https://www.nice.org.uk" } = env;

	return merge(common(env), {
		mode: "development",
		devtool: "inline-source-map",
		plugins: [
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
			contentBase: path.join(__dirname, "dist"),
			// Replicate the CDN sub folder:
			contentBasePublicPath: "/niceorg",
			port: 8087,
			open: true,
			openPage: "niceorg/playground.html",
			hot: true,
			before: function (app) {
				// Allow cross origin requests for font files
				app.use(function (req, res, next) {
					res.header("Access-Control-Allow-Origin", "*");
					res.header(
						"Access-Control-Allow-Headers",
						"Origin, X-Requested-With, Content-Type, Accept"
					);
					next();
				});

				console.info(`Proxying requests to ${niceorgBaseUrl}`);

				app.use(nocProxyMiddlewareFactory(niceorgBaseUrl));
			}
		}
	});
};
