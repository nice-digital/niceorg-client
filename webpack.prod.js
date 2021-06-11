const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const common = require("./webpack.common.js");

module.exports = (env) =>
	merge(common(env), {
		mode: "production",
		devtool: "source-map",
		plugins: [
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				openAnalyzer: false
			})
		],
		optimization: {
			minimize: true,
			minimizer: [`...`, new CssMinimizerPlugin()]
		}
	});
