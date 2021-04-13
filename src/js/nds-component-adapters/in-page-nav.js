import React from "react";
import ReactDOM from "react-dom";

import { InPageNav } from "@nice-digital/nds-in-page-nav";
import { getPropsFromDataAttributes } from "../utils";

const render = (element) => {
	const props = getPropsFromDataAttributes(element, "in-page-nav");

	element.innerHTML = "";
	ReactDOM.render(<InPageNav {...props} />, element);
};

export default render;
