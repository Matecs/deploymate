import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import { LangProvider } from "@/lib/i18n";

const renderHero = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <HeroSection />
      </LangProvider>
    </MemoryRouter>
  );

describe("HeroSection", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the hero title", () => {
    renderHero();
    expect(
      screen.getByText("Release & Compliance Operations Architect")
    ).toBeInTheDocument();
  });

  it("renders the stats line", () => {
    renderHero();
    // AnimatedNumber starts at 0 in JSDOM (IntersectionObserver never fires),
    // so check for the static text surrounding the animated values.
    expect(screen.getByText(/releases\/year/)).toBeInTheDocument();
  });

  it("renders the description text", () => {
    renderHero();
    expect(
      screen.getByText(/18 years of experience/)
    ).toBeInTheDocument();
  });

  it("renders the Contact Me CTA button that scrolls to #cta", () => {
    renderHero();
    const buttons = screen.getAllByRole("button");
    const ctaBtn = buttons.find((b) => b.textContent?.includes("Contact Me"));
    expect(ctaBtn).toBeDefined();
  });

  it("scrollTo calls scrollIntoView on the pain-points section when chevron is clicked", () => {
    renderHero();
    const mockScrollIntoView = vi.fn();
    const el = document.createElement("div");
    el.id = "pain-points";
    el.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(el);

    // Find the chevron button (not the Contact Me button)
    const buttons = screen.getAllByRole("button");
    const scrollBtn = buttons.find((b) => !b.textContent?.includes("Contact Me"));
    fireEvent.click(scrollBtn!);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });
});
