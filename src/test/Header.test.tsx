import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Header from "@/components/Header";
import { LangProvider } from "@/lib/i18n";

const renderHeader = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <Header />
      </LangProvider>
    </MemoryRouter>
  );

describe("Header", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renders the logo image", () => {
    renderHeader();
    expect(screen.getByAltText("DeployMate — QA-Driven Release & Compliance Operations")).toBeInTheDocument();
  });

  it("renders desktop nav buttons with translated labels", () => {
    renderHeader();
    // There are two sets (desktop + mobile sheet) but at minimum one visible set
    expect(screen.getAllByText("Who It's For").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Services").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Why Me").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact Me").length).toBeGreaterThan(0);
  });

  it("scrollTo calls scrollIntoView on the target element", () => {
    renderHeader();
    const mockScrollIntoView = vi.fn();
    const el = document.createElement("div");
    el.id = "audience";
    el.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(el);

    const audienceButtons = screen.getAllByText("Who It's For");
    fireEvent.click(audienceButtons[0]);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("language toggle switches from EN to HU", () => {
    renderHeader();
    // Initially shows "🇭🇺 HU" buttons (to switch to Hungarian)
    const langButtons = screen.getAllByText("HU");
    expect(langButtons.length).toBeGreaterThan(0);

    fireEvent.click(langButtons[0]);

    // After toggle, buttons should show "🇬🇧 EN"
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
  });

  it("language toggle switches back from HU to EN", () => {
    renderHeader();
    const toLang = screen.getAllByText("HU");
    fireEvent.click(toLang[0]);

    const toEn = screen.getAllByText("EN");
    fireEvent.click(toEn[0]);

    expect(screen.getAllByText("HU").length).toBeGreaterThan(0);
  });
});
