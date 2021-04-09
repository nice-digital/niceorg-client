import $ from "jquery";
// eslint-disable-next-line no-unused-vars
//import { pluginize } from "./js/pluginizr";

// eslint-disable-next-line no-undef
__webpack_public_path__ = window.niceorgClientBaseUrl || "/";

async function getComponent(file) {
	return import(
		/* webpackInclude: /\.js$/ */
		/* webpackExclude: /utils/ */
		/* webpackChunkName: "[request]" */
		`./components/${file}`
	);
}

const mappings = {
	"[data-in-page-nav]": "in-page-nav"
};

const loadModules = async () => {
	for (let [selector, file] of Object.entries(mappings)) {
		const elements = document.querySelectorAll(selector);

		// Load each component dynamically
		for (let i = 0; i < elements.length; i++) {
			const { default: render } = await getComponent(file);
			render(elements[i]);
		}
	}
};

loadModules();

$("#load-modules-btn").click(() => {
	loadModules();
});
