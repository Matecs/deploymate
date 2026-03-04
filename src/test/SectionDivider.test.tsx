import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SectionDivider from "@/components/SectionDivider";

describe("SectionDivider", () => {
  it("renders without crashing", () => {
    const { container } = render(<SectionDivider />);
    expect(container.firstChild).not.toBeNull();
  });

  it("has aria-hidden for decorative purpose", () => {
    const { container } = render(<SectionDivider />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders a wave SVG by default", () => {
    const { container } = render(<SectionDivider />);
    expect(container.querySelector("svg")).not.toBeNull();
    // wave path uses a cubic bezier (C)
    const path = container.querySelector("path");
    expect(path).not.toBeNull();
  });

  it("renders an angle SVG when variant='angle'", () => {
    const { container } = render(<SectionDivider variant="angle" />);
    expect(container.querySelector("polygon")).not.toBeNull();
  });

  it("applies rotate-180 class when flip=true", () => {
    const { container } = render(<SectionDivider flip />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("rotate-180");
  });

  it("does not apply rotate-180 class when flip=false (default)", () => {
    const { container } = render(<SectionDivider />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toContain("rotate-180");
  });
});
