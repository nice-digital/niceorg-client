// Allow loading the async chunks from different base URLs e.g. CDN
// See https://webpack.js.org/guides/public-path/#on-the-fly
// eslint-disable-next-line no-undef
__webpack_public_path__ =
	window.niceorgClientBaseUrl || "https://cdn.nice.org.uk/niceorg/";

import "../scss/app.scss";

import { loadModulesAsync } from "./utils";
loadModulesAsync(document);
