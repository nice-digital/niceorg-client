const { merge } = require("webpack-merge"),
	path = require("path");

const common = require("./webpack.common.js");

const { nocMiddleware } = require("./server/noc-middleware");

module.exports = (env) =>
	merge(common(env), {
		mode: "development",
		devtool: "inline-source-map",
		devServer: {
			contentBase: path.join(__dirname, "dist"),
			// Replicate the CDN sub folder:
			contentBasePublicPath: "/niceorg",
			port: 8087,
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

				app.use(nocMiddleware);
			}
		}
	});
