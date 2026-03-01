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
    expect(
      screen.getByText(/109 releases\/year/)
    ).toBeInTheDocument();
  });

  it("renders the description text", () => {
    renderHero();
    expect(
      screen.getByText(/18 years of experience/)
    ).toBeInTheDocument();
  });

  it("renders the booking CTA link with correct href", () => {
    renderHero();
    const links = screen.getAllByRole("link");
    const ctaLink = links.find((l) =>
      l.getAttribute("href") === "https://calendar.app.google/qVYtuXUBupAUzsQ18"
    );
    expect(ctaLink).toBeDefined();
    expect(ctaLink).toHaveAttribute("target", "_blank");
  });

  it("scrollTo calls scrollIntoView on the audience section when chevron is clicked", () => {
    renderHero();
    const mockScrollIntoView = vi.fn();
    const el = document.createElement("div");
    el.id = "pain-points";
    el.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(el);

    // The chevron-down scroll button is the only button in HeroSection
    const scrollBtn = screen.getByRole("button");
    fireEvent.click(scrollBtn);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });
});
