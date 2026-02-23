import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AudienceSection from "@/components/AudienceSection";
import { LangProvider } from "@/lib/i18n";

const renderAudience = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <AudienceSection />
      </LangProvider>
    </MemoryRouter>
  );

describe("AudienceSection", () => {
  it("renders the section tag label", () => {
    renderAudience();
    expect(screen.getByText("Who Is This For?")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    renderAudience();
    expect(screen.getByText("20–150 Person SaaS Teams")).toBeInTheDocument();
  });

  it("renders the section subtitle", () => {
    renderAudience();
    expect(
      screen.getByText("If any of these sound familiar, we should talk.")
    ).toBeInTheDocument();
  });

  it("renders all three audience items", () => {
    renderAudience();
    expect(
      screen.getByText(/preparing for your first SOC2/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Weekly rollbacks/)).toBeInTheDocument();
    expect(screen.getByText(/CTO lacks visibility/)).toBeInTheDocument();
  });

  it("renders exactly three item cards", () => {
    renderAudience();
    // Each item is in a card with a border; count by the unique texts
    const items = screen.getAllByText(/SOC2|rollbacks|CTO/);
    expect(items).toHaveLength(3);
  });
});
