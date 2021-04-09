module.exports = {
	root: true,
	parser: "@babel/eslint-parser",
	plugins: ["react", "prettier", "jest"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:prettier/recommended",
		"plugin:jest/recommended",
		"prettier"
	],
	settings: {
		react: {
			version: "detect"
		}
	},
	env: {
		browser: true,
		node: true,
		"jest/globals": true
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
		babelOptions: {
			configFile: "./babel.config.json"
		}
	}
};
