// Allow loading the async chunks from different base URLs e.g. CDN, but transformed via Octopus Deploy,
// using the #{} syntax for injecting variables.
// See https://webpack.js.org/guides/public-path/#on-the-fly for the __webpack_public_path__ 'free' variable
__webpack_public_path__ =
	"#{JavaScriptBaseUrl}"[0] === "#"
		? "http://localhost:8087/niceorg/"
		: "#{JavaScriptBaseUrl}";

import "../scss/app.scss";

import { loadModulesAsync } from "./utils";
loadModulesAsync(document);
