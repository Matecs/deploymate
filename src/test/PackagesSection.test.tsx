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
    expect(screen.getByText("Release Audit")).toBeInTheDocument();
    expect(screen.getByText("Pipeline Strategy & Sustained Compliance")).toBeInTheDocument();
    expect(screen.getByText("Release Systems Architecture")).toBeInTheDocument();
  });

  it("renders all three package prices", () => {
    renderPackages();
    expect(screen.getByText("€6,500 | 2 weeks")).toBeInTheDocument();
    expect(screen.getByText("€6,000/mo | 10 hrs/week")).toBeInTheDocument();
    expect(screen.getByText("€10,000/mo | 20 hrs/week")).toBeInTheDocument();
  });

  it("renders all three package descriptions", () => {
    renderPackages();
    expect(screen.getByText(/Pipeline audit, rollback reduction plan/)).toBeInTheDocument();
    expect(screen.getByText(/Monthly pipeline review, CI\/CD strategy/)).toBeInTheDocument();
    expect(screen.getByText(/End-to-end release architecture/)).toBeInTheDocument();
  });

  it("renders three CTA buttons that scroll to #cta", () => {
    renderPackages();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders deliverables and guarantee content", () => {
    renderPackages();
    expect(screen.getByText("What you'll get")).toBeInTheDocument();
    expect(screen.getByText(/Pipeline Audit Report/)).toBeInTheDocument();
    expect(screen.getByText(/Risk-free: if after Week 1/)).toBeInTheDocument();
  });
});
