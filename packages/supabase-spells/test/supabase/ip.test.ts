import { describe, expect, it } from "vitest";
import {logIpAddress} from "../../src/supabase/ip"

describe("get client ip address ", () => {
  it("get client ip address", async () => {
    const ipAddress = await logIpAddress("10.0.0.5","123432");

    console.log("current data is ",ipAddress)
  });

});

