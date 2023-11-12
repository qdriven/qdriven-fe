import { describe, it } from "vitest";
import { info, warn, error } from "../src/console-logger";

describe("logging", () => {
  it("info logging", () => {
    info("this is test");
    info("this is test {}", "test");
  });
  it("other logging level", () => {
    warn("this is test");
    error("this is test {}", "test");
  });
});
