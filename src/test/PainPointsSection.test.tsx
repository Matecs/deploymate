import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeAll } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PainPointsSection from "@/components/PainPointsSection";
import { LangProvider } from "@/lib/i18n";

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

const renderPainPoints = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <PainPointsSection />
      </LangProvider>
    </MemoryRouter>
  );

describe("PainPointsSection", () => {
  it("renders the section tag label", () => {
    renderPainPoints();
    expect(screen.getByText("Common Challenges")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderPainPoints();
    expect(
      screen.getByText("This Hurts at 20–150 Person SaaS Companies")
    ).toBeInTheDocument();
  });

  it("renders all four pain point items", () => {
    renderPainPoints();
    expect(screen.getByText(/on-call engineer just texted at 2 AM/)).toBeInTheDocument();
    expect(screen.getByText(/Panic evidence gathering/)).toBeInTheDocument();
    expect(screen.getByText(/Outdated CI\/CD/)).toBeInTheDocument();
    expect(screen.getByText(/CTO lacks visibility/)).toBeInTheDocument();
  });

  it("renders exactly four item cards", () => {
    renderPainPoints();
    const items = screen.getAllByText(/on-call|evidence|CI\/CD|CTO/);
    expect(items).toHaveLength(4);
  });
});
