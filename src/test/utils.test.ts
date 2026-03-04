import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn (class name utility)", () => {
  it("returns a single class name unchanged", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("merges multiple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });

  it("handles conditional class objects", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
  });

  it("deduplicates conflicting Tailwind classes (last one wins)", () => {
    // tailwind-merge resolves conflicts: p-4 and p-6 → last one wins
    expect(cn("p-4", "p-6")).toBe("p-6");
  });

  it("merges Tailwind utility variants correctly", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("returns an empty string when given no arguments", () => {
    expect(cn()).toBe("");
  });
});
