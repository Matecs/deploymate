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
      screen.getByText(/Write me or call/)
    ).toBeInTheDocument();
  });

  it("renders the email contact link", () => {
    renderCTA();
    const link = screen.getByRole("link", { name: /mate@deploymate.hu/ });
    expect(link).toHaveAttribute("href", "mailto:mate@deploymate.hu");
  });

  it("renders the phone contact link", () => {
    renderCTA();
    const link = screen.getByRole("link", { name: /36 20 434 9647/ });
    expect(link).toHaveAttribute("href", "tel:+36204349647");
  });
});
