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
    expect(screen.getByText("Choose Your Package")).toBeInTheDocument();
  });

  it("renders all three package titles", () => {
    renderPackages();
    expect(screen.getByText("Release Audit")).toBeInTheDocument();
    expect(screen.getByText("Compliance Runbook")).toBeInTheDocument();
    expect(screen.getByText("Migration Sprint")).toBeInTheDocument();
  });

  it("renders all three package prices", () => {
    renderPackages();
    expect(screen.getByText("€4,500 | 2 weeks")).toBeInTheDocument();
    expect(screen.getByText("€5,500 | 3 weeks")).toBeInTheDocument();
    expect(screen.getByText("€3,000 | 10 days")).toBeInTheDocument();
  });

  it("renders all three package descriptions", () => {
    renderPackages();
    expect(screen.getByText(/Deep technical audit/)).toBeInTheDocument();
    expect(screen.getByText(/Technical evidence and runbooks/)).toBeInTheDocument();
    expect(screen.getByText(/Migrate a key pipeline/)).toBeInTheDocument();
  });

  it("renders three 'I want this' CTA links pointing to the booking URL", () => {
    renderPackages();
    const links = screen.getAllByText("I want this");
    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        "https://calendar.app.google/qVYtuXUBupAUzsQ18"
      );
    });
  });
});
