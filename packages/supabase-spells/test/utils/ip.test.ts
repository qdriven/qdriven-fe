import { describe, expect, it } from "vitest";
import {getClientIpAddress} from "../../src/utils/ip"

describe("get client ip address ", () => {
  it("get client ip address", async () => {
    const ipAddress = await getClientIpAddress();

    console.log("current ip is ",ipAddress)
  });

});

