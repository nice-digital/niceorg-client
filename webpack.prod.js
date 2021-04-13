const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = (env) =>
	merge(common(env), {
		mode: "production",
		devtool: "source-map",
		optimization: {
			minimize: true,
			minimizer: [`...`, new CssMinimizerPlugin()]
		}
	});
