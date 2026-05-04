import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CredibilitySection from "@/components/CredibilitySection";
import { LangProvider } from "@/lib/i18n";

const renderCredibility = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <CredibilitySection />
      </LangProvider>
    </MemoryRouter>
  );

describe("CredibilitySection", () => {
  it("renders the section tag label", () => {
    renderCredibility();
    expect(screen.getByText("Track Record")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderCredibility();
    expect(screen.getByText("Why Me")).toBeInTheDocument();
  });

  it("renders both testimonials", () => {
    renderCredibility();
    expect(
      screen.getByText(/Led 109 releases\/year with 1 rollback/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Seamless quarterly compliance/)
    ).toBeInTheDocument();
  });

  it("renders the testimonial source attribution", () => {
    renderCredibility();
    const sources = screen.getAllByText(/Engineering Leadership/);
    expect(sources.length).toBeGreaterThanOrEqual(2);
  });
});
