import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CTASection from "@/components/CTASection";
import { LangProvider } from "@/lib/i18n";

const renderCTA = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <CTASection />
      </LangProvider>
    </MemoryRouter>
  );

describe("CTASection", () => {
  it("renders the section tag label", () => {
    renderCTA();
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderCTA();
    expect(
      screen.getByText(/Ready for an Audit‑Ready Release Pipeline/)
    ).toBeInTheDocument();
  });

  it("renders the section description", () => {
    renderCTA();
    expect(
      screen.getByText(/Book a 15-minute intro call/)
    ).toBeInTheDocument();
  });

  it("renders the booking CTA link with correct href", () => {
    renderCTA();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "https://calendar.app.google/qVYtuXUBupAUzsQ18"
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
