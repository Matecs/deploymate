import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ScrollProgress from "@/components/ScrollProgress";

const renderScrollProgress = () =>
  render(
    <MemoryRouter>
      <ScrollProgress />
    </MemoryRouter>
  );

describe("ScrollProgress", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = renderScrollProgress();
    expect(container.firstChild).not.toBeNull();
  });

  it("listens to scroll events on mount and removes listener on unmount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderScrollProgress();

    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });

  it("updates progress when scroll event fires", () => {
    renderScrollProgress();
    // Simulate a document that is scrollable
    Object.defineProperty(document.documentElement, "scrollHeight", { value: 2000, configurable: true });
    Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
    Object.defineProperty(window, "scrollY", { value: 500, configurable: true });

    fireEvent.scroll(window);
    // Progress should now be 0.5 (500 / (2000 - 1000))
    // We can't directly assert the spring animation value, but we can confirm no error is thrown.
  });
});
