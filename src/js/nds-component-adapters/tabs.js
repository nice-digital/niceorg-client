import React from "react";
import ReactDOM from "react-dom";

import { Tabs, Tab } from "@nice-digital/nds-tabs";
import { getPropsFromDataAttributes } from "../utils";

function setHashToCurrentTab(hash) {
	document.location.hash = hash;
}

const render = (element) => {
	const props = getPropsFromDataAttributes(element, "tabs");
	props.hash = document.location.hash || "";
	props.changeCallback = setHashToCurrentTab;
	const tabs = Array.prototype.map.call(element.children, (tab) => ({
		title: tab.getAttribute("data-tab-title"),
		body: tab.innerHTML
	}));

	ReactDOM.render(
		<Tabs {...props}>
			{tabs.map(({ title, body }) => (
				<Tab key={title} title={title}>
					{body}
				</Tab>
			))}
		</Tabs>,
		element
	);
};

export default render;
