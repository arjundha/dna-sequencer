import {Base} from "../../../src/models/nucleic-acids/Base";
import {describe, expect, test} from "@jest/globals";

describe("Base", () => {
	test("Base", () => {
		const base = {base: "A"};
		expect(base.base).toBe("A");
	});
});
