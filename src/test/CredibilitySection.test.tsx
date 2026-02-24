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
      screen.getByText(/109 releases in a single year/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/enterprise product stack migration/)
    ).toBeInTheDocument();
  });

  it("renders the testimonial source attribution", () => {
    renderCredibility();
    const sources = screen.getAllByText("— Engineering Leadership");
    expect(sources).toHaveLength(2);
  });
});
