import React from "react";
import ReactDOM from "react-dom";

import { Tabs, Tab } from "@nice-digital/nds-tabs";
import { getPropsFromDataAttributes } from "../utils";

const render = (element) => {
	const props = getPropsFromDataAttributes(element, "tabs");

	//e.g. element.querySelectorAll(".tab-pane");

	// Convert DOM into React elements

	element.innerHTML = "";
	ReactDOM.render(
		<Tabs>
			<Tab {...props}>TODO</Tab>
		</Tabs>,
		element
	);
};

export default render;
