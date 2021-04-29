import $ from "jquery";

export const moduleMappings = {
	"[data-in-page-nav]": "in-page-nav",
	"[data-tabs]": "tabs"
};

export const loadModulesAsync = async (element) => {
	for (let [selector, fileName] of Object.entries(moduleMappings)) {
		const elements = element.querySelectorAll(selector);
		for (let i = 0; i < elements.length; i++) {
			// Webpack magic comments, see https://webpack.js.org/api/module-methods/#magic-comments
			const { default: render } = await import(
				/* webpackInclude: /\.js$/ */
				/* webpackExclude: /utils/ */
				/* webpackChunkName: "[request]" */
				`./nds-component-adapters/${fileName}`
			);
			render(elements[i]);
		}
	}
};

/**
 * Converts a set of prefixed data attributes into a props/options object
 * @example
 * 	<div data-in-page-nav-test="true" data-in-page-nav-something-else="1"></div>
 * becomes:
 * 	{ test: true, somethingElse: 1 }
 * @param {HTMLElement} element The HTML element
 * @param {string} prefix The prefix for data attributes
 * @returns The props/options object
 */
export const getPropsFromDataAttributes = (element, prefix) => {
	const $el = $(element),
		props = {};

	// Convert plugin data-attributes into options object
	// e.g. data-in-page-nav-test="true" data-in-page-nav-something-else="1" becomes:
	// { test: true, somethingElse: 1 }
	[].forEach.call(element.attributes, function (attr) {
		var match = attr.name.match(new RegExp(`^data-(${prefix}-.+)`));
		if (match && match.length === 2) {
			var attrName = $.camelCase(match[1]),
				propName = $.camelCase(match[1].replace(`${prefix}-`, ""));
			props[propName] = $el.data(attrName); // Use jquery's data because it parses types
		}
	});

	return props;
};
