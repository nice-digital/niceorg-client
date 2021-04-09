import React from "react";
import ReactDOM from "react-dom";

import { InPageNav } from "@nice-digital/nds-in-page-nav";
import { getPropsFromDataAttributes } from "../utils";

const render = (element) => {
	element.innerHTML = "";
	const props = getPropsFromDataAttributes(element, "in-page-nav");

	ReactDOM.render(<InPageNav {...props} />, element);
};

export default render;
