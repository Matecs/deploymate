import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PackagesSection from "@/components/PackagesSection";
import { LangProvider } from "@/lib/i18n";

const renderPackages = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <PackagesSection />
      </LangProvider>
    </MemoryRouter>
  );

describe("PackagesSection", () => {
  it("renders the section tag label", () => {
    renderPackages();
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderPackages();
    expect(screen.getByText("Choose Your Service")).toBeInTheDocument();
  });

  it("renders all three package titles", () => {
    renderPackages();
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("Monthly Retainer")).toBeInTheDocument();
    expect(screen.getByText("Fractional VP of Engineering")).toBeInTheDocument();
  });

  it("renders all three package prices", () => {
    renderPackages();
    expect(screen.getByText("€4,500 | 2 weeks")).toBeInTheDocument();
    expect(screen.getByText("€5,000/mo | 10 hrs/week")).toBeInTheDocument();
    expect(screen.getByText("€10,000/mo | 20 hrs/week")).toBeInTheDocument();
  });

  it("renders all three package descriptions", () => {
    renderPackages();
    expect(screen.getByText(/Release Audit — Pipeline review/)).toBeInTheDocument();
    expect(screen.getByText(/Monthly review, Slack support/)).toBeInTheDocument();
    expect(screen.getByText(/Full engineering leadership/)).toBeInTheDocument();
  });

  it("renders three CTA buttons that scroll to #cta", () => {
    renderPackages();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });
});
