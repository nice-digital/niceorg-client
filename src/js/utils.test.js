import { getPropsFromDataAttributes } from "./utils";

describe("utils", () => {
	describe("getPropsFromDataAttributes", () => {
		it("should parse string attributes", () => {
			const element = document.createElement("div");
			element.setAttribute("data-plugin-a", "str");
			expect(getPropsFromDataAttributes(element, "plugin")).toStrictEqual({
				a: "str"
			});
		});

		it("should parse number attributes", () => {
			const element = document.createElement("div");
			element.setAttribute("data-plugin-a", "99");
			expect(getPropsFromDataAttributes(element, "plugin")).toStrictEqual({
				a: 99
			});
		});

		it("should parse boolean attributes", () => {
			const element = document.createElement("div");
			element.setAttribute("data-plugin-a", "true");
			expect(getPropsFromDataAttributes(element, "plugin")).toStrictEqual({
				a: true
			});
		});

		it("should parse JSON object attributes", () => {
			const element = document.createElement("div");
			element.setAttribute("data-plugin-a", `{"nested":"object"}`);
			expect(getPropsFromDataAttributes(element, "plugin")).toStrictEqual({
				a: { nested: "object" }
			});
		});

		it("should parse kebab case attributes into camel case props", () => {
			const element = document.createElement("div");
			element.setAttribute("data-plugin-some-field", "val");
			expect(getPropsFromDataAttributes(element, "plugin")).toStrictEqual({
				someField: "val"
			});
		});
	});
});
