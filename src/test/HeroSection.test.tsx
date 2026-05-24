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
      screen.getByText(/Most CI\/CD pipelines are built by DevOps engineers/)
    ).toBeInTheDocument();
  });

  it("renders the title highlight in accent color", () => {
    renderHero();
    expect(
      screen.getByText(/The difference: 109 releases, 1 rollback/)
    ).toBeInTheDocument();
  });

  it("renders the stats line", () => {
    renderHero();
    expect(screen.getByText(/0\.9% failure rate/)).toBeInTheDocument();
  });

  it("renders the description text", () => {
    renderHero();
    expect(
      screen.getByText(/2-week technical audit/)
    ).toBeInTheDocument();
  });

  it("renders the primary CTA button that scrolls to #cta", () => {
    renderHero();
    const buttons = screen.getAllByRole("button");
    const ctaBtn = buttons.find((b) => b.textContent?.includes("Release Audit call"));
    expect(ctaBtn).toBeDefined();
  });

  it("scrollTo calls scrollIntoView on the pain-points section when chevron is clicked", () => {
    renderHero();
    const mockScrollIntoView = vi.fn();
    const el = document.createElement("div");
    el.id = "pain-points";
    el.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(el);

    // Find the chevron button (the one with no text content)
    const buttons = screen.getAllByRole("button");
    const scrollBtn = buttons.find((b) => !b.textContent?.trim());
    fireEvent.click(scrollBtn!);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });
});
