import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import StickyCTA from "@/components/StickyCTA";
import { LangProvider } from "@/lib/i18n";

const renderStickyCTA = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <StickyCTA />
      </LangProvider>
    </MemoryRouter>
  );

describe("StickyCTA", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true, writable: true });
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true, writable: true });
  });

  it("is hidden before the user scrolls past the hero section", () => {
    renderStickyCTA();
    // scrollY = 0, innerHeight = 800 → threshold is 640; 0 < 640 so CTA is hidden
    expect(screen.queryByRole("button", { name: /Contact Me/i })).toBeNull();
  });

  it("becomes visible after scrolling past 80% of the viewport height", () => {
    renderStickyCTA();
    Object.defineProperty(window, "scrollY", { value: 700, configurable: true });
    fireEvent.scroll(window);
    expect(screen.getByRole("button", { name: /Contact Me/i })).toBeInTheDocument();
  });

  it("calls scrollIntoView on #cta when the button is clicked", () => {
    // Pre-scroll to make CTA visible
    Object.defineProperty(window, "scrollY", { value: 700, configurable: true });
    renderStickyCTA();
    fireEvent.scroll(window);

    const mockScrollIntoView = vi.fn();
    const cta = document.createElement("div");
    cta.id = "cta";
    cta.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(cta);

    const btn = screen.getByRole("button", { name: /Contact Me/i });
    fireEvent.click(btn);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    document.body.removeChild(cta);
  });

  it("adds and removes scroll event listener", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderStickyCTA();
    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
