import { describe, expect, it } from "vitest";
import { sum, addIt } from "../src/operation";

describe("add", () => {
  it("should sum of 2 and 3 equals to 5", () => {
    expect(sum(2, 3)).toEqual(5);
  });
  it("should be added all values", () => {
    console.log(addIt(2, 3, 4, 5, 6));
    expect(addIt(3, 4, 5, 2, 6)).toEqual(20);
  });
});
