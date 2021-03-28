module.exports = {
	root: true,
	parser: "@babel/eslint-parser",
	plugins: ["prettier"],
	extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		babelOptions: {
			configFile: "./babel.config.json"
		}
	}
};
