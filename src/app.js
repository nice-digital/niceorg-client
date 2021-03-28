import $ from "jquery";
// eslint-disable-next-line no-unused-vars
//import { pluginize } from "./js/pluginizr";

async function getPlugin(file) {
	await import(
		/* webpackInclude: /\.js$/ */
		/* webpackExclude: /pluginizr/ */
		/* webpackChunkName: "[request]" */
		`./../node_modules/@nice-digital/nds-jquery/es/${file}`
	);
}

const mappings = {
	"[data-in-page-nav]": "in-page-nav"
};

const loadModules = async () => {
	for (let [selector, file] of Object.entries(mappings)) {
		if ($(selector).length > 0) {
			await getPlugin(file);
		}
	}
};

loadModules();

$("#load-modules-btn").click(() => {
	loadModules();
});
