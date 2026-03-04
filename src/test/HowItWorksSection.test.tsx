import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HowItWorksSection from "@/components/HowItWorksSection";
import { LangProvider } from "@/lib/i18n";

const renderSection = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <HowItWorksSection />
      </LangProvider>
    </MemoryRouter>
  );

describe("HowItWorksSection", () => {
  it("renders the section with the correct id", () => {
    renderSection();
    expect(document.getElementById("how-it-works")).not.toBeNull();
  });

  it("renders the section tag label", () => {
    renderSection();
    expect(screen.getByText("How It Works")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderSection();
    expect(screen.getByText("3 Simple Steps")).toBeInTheDocument();
  });

  it("renders all three step titles", () => {
    renderSection();
    expect(screen.getByText("15-min call")).toBeInTheDocument();
    expect(screen.getByText(/Project/)).toBeInTheDocument();
    expect(screen.getByText(/Monthly retainer/)).toBeInTheDocument();
  });

  it("renders the step number badges", () => {
    renderSection();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders the section with aria-label 'How it works'", () => {
    renderSection();
    expect(screen.getByRole("region", { name: "How it works" })).toBeInTheDocument();
  });
});
