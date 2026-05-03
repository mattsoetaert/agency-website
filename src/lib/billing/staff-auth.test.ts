import { afterEach, describe, expect, it, vi } from "vitest";
import { createStaffSessionValue, isStaffPasswordValid, isStaffSessionValueValid } from "./staff-auth";

describe("staff auth", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("validates the configured staff password", () => {
    vi.stubEnv("STAFF_CHECKOUT_PASSWORD", "test-password");

    expect(isStaffPasswordValid("test-password")).toBe(true);
    expect(isStaffPasswordValid("wrong-password")).toBe(false);
  });

  it("creates and validates the staff session cookie value", () => {
    vi.stubEnv("STAFF_CHECKOUT_PASSWORD", "test-password");

    const sessionValue = createStaffSessionValue();

    expect(sessionValue).toHaveLength(64);
    expect(isStaffSessionValueValid(sessionValue)).toBe(true);
    expect(isStaffSessionValueValid("bad-session")).toBe(false);
  });
});
