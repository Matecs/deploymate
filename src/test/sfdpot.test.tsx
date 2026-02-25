/**
 * SFDPOT test suite — James Bach's San Francisco Depot testing heuristic
 *
 * S – Structure:   what the system is made of (components, DOM landmarks)
 * F – Function:    what the system does (behaviours, interactions)
 * D – Data:        what the system processes (content, translations)
 * P – Platform:    what the system depends on (browser APIs, localStorage)
 * O – Operations:  how the system is used (user workflows)
 * T – Time:        how the system handles time (dynamic dates)
 */

import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Index from "@/pages/Index";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PackagesSection from "@/components/PackagesSection";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";

const renderPage = () =>
  render(
    <MemoryRouter>
      <Index />
    </MemoryRouter>
  );

const renderWithProviders = (ui: React.ReactElement) =>
  render(
    <MemoryRouter>
      <LangProvider>{ui}</LangProvider>
    </MemoryRouter>
  );

// ─── S – Structure ────────────────────────────────────────────────────────────

describe("S – Structure: what the product is made of", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renders a <header> landmark element", () => {
    renderPage();
    expect(document.querySelector("header")).not.toBeNull();
  });

  it("renders a <footer> landmark element", () => {
    renderPage();
    expect(document.querySelector("footer")).not.toBeNull();
  });

  it("renders the audience section with id='audience'", () => {
    renderPage();
    expect(document.getElementById("audience")).not.toBeNull();
  });

  it("renders the packages section with id='packages'", () => {
    renderPage();
    expect(document.getElementById("packages")).not.toBeNull();
  });

  it("renders the credibility section with id='credibility'", () => {
    renderPage();
    expect(document.getElementById("credibility")).not.toBeNull();
  });

  it("renders the CTA section with id='cta'", () => {
    renderPage();
    expect(document.getElementById("cta")).not.toBeNull();
  });

  it("renders all three service package cards", () => {
    renderPage();
    expect(screen.getByText("Release Audit")).toBeInTheDocument();
    expect(screen.getByText("Compliance Runbook")).toBeInTheDocument();
    expect(screen.getByText("Migration Sprint")).toBeInTheDocument();
  });

  it("renders three audience item cards", () => {
    renderPage();
    const audienceSection = document.getElementById("audience")!;
    const items = within(audienceSection).getAllByText(/SOC2|rollbacks|CTO/);
    expect(items).toHaveLength(3);
  });

  it("renders the DataMate logo in both header and footer", () => {
    renderPage();
    const logos = screen.getAllByAltText("DataMate logo");
    expect(logos.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── F – Function ─────────────────────────────────────────────────────────────

describe("F – Function: what the product does", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("language toggle switches display language from EN to HU", () => {
    renderWithProviders(<Header />);
    fireEvent.click(screen.getAllByText("🇭🇺 HU")[0]);
    expect(screen.getAllByText("🇬🇧 EN").length).toBeGreaterThan(0);
  });

  it("nav 'Who It's For' button calls scrollIntoView on #audience", () => {
    renderWithProviders(<Header />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "audience";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    fireEvent.click(screen.getAllByText("Who It's For")[0]);

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("nav 'Services' button calls scrollIntoView on #packages", () => {
    renderWithProviders(<Header />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "packages";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    fireEvent.click(screen.getAllByText("Services")[0]);

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("nav 'Why Me' button calls scrollIntoView on #credibility", () => {
    renderWithProviders(<Header />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "credibility";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    fireEvent.click(screen.getAllByText("Why Me")[0]);

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("hero scroll chevron calls scrollIntoView on #audience", () => {
    renderWithProviders(<HeroSection />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "audience";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    fireEvent.click(screen.getByRole("button"));

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("all booking CTA links open in a new browser tab", () => {
    renderPage();
    const bookingLinks = screen
      .getAllByRole("link")
      .filter(
        (l) =>
          l.getAttribute("href") ===
          "https://calendar.app.google/qVYtuXUBupAUzsQ18"
      );
    expect(bookingLinks.length).toBeGreaterThan(0);
    bookingLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });
});

// ─── D – Data ─────────────────────────────────────────────────────────────────

describe("D – Data: what the product processes", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("renders English content by default", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        name: "Release & Compliance Operations Architect",
      })
    ).toBeInTheDocument();
  });

  it("displays the hero statistics line", () => {
    renderPage();
    expect(screen.getByText(/109 releases\/year/)).toBeInTheDocument();
  });

  it("renders the experience claim in the hero description", () => {
    renderPage();
    expect(screen.getByText(/18 years of experience/)).toBeInTheDocument();
  });

  it("renders all three package prices in English", () => {
    renderPage();
    expect(screen.getByText("€4,500 | 2 weeks")).toBeInTheDocument();
    expect(screen.getByText("€5,500 | 3 weeks")).toBeInTheDocument();
    expect(screen.getByText("€3,000 | 10 days")).toBeInTheDocument();
  });

  it("renders all three package prices in Hungarian when lang is HU", () => {
    localStorage.setItem("lang", "hu");
    renderWithProviders(<PackagesSection />);
    expect(screen.getByText("1,8M HUF | 2 hét")).toBeInTheDocument();
    expect(screen.getByText("2,2M HUF | 3 hét")).toBeInTheDocument();
    expect(screen.getByText("1,2M HUF | 10 nap")).toBeInTheDocument();
  });

  it("renders both credibility testimonials", () => {
    renderPage();
    expect(
      screen.getByText(/109 releases in a single year/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/GoToAssist Corporate stack migration/)
    ).toBeInTheDocument();
  });

  it("renders the contact email as plain text, not a hyperlink", () => {
    renderWithProviders(<Footer />);
    const email = screen.getByText("info@datamate.hu");
    expect(email).toBeInTheDocument();
    expect(email.closest("a")).toBeNull();
  });

  it("renders the phone number as plain text, not a hyperlink", () => {
    renderWithProviders(<Footer />);
    const phone = screen.getByText("+36 20 434 9647");
    expect(phone).toBeInTheDocument();
    expect(phone.closest("a")).toBeNull();
  });
});

// ─── P – Platform ─────────────────────────────────────────────────────────────

describe("P – Platform: what the product depends on", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("persists the language preference to localStorage after toggle", () => {
    renderWithProviders(<Header />);
    expect(localStorage.getItem("lang")).toBeNull();

    fireEvent.click(screen.getAllByText("🇭🇺 HU")[0]);

    expect(localStorage.getItem("lang")).toBe("hu");
  });

  it("restores the language preference from localStorage on mount", () => {
    localStorage.setItem("lang", "hu");
    renderWithProviders(<Header />);
    // Hungarian is active → toggle button shows the EN flag
    expect(screen.getAllByText("🇬🇧 EN").length).toBeGreaterThan(0);
  });

  it("all new-tab links carry rel='noopener noreferrer' to prevent tabnapping", () => {
    renderPage();
    const newTabLinks = screen
      .getAllByRole("link")
      .filter((l) => l.getAttribute("target") === "_blank");
    expect(newTabLinks.length).toBeGreaterThan(0);
    newTabLinks.forEach((link) => {
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  it("logo images have descriptive alt text for accessibility", () => {
    renderPage();
    const logos = screen.getAllByAltText("DataMate logo");
    expect(logos.length).toBeGreaterThan(0);
  });
});

// ─── O – Operations ───────────────────────────────────────────────────────────

describe("O – Operations: how the product is used", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("all booking CTA links point to the Google Calendar booking URL", () => {
    renderPage();
    const ctaLinks = screen
      .getAllByRole("link")
      .filter(
        (l) =>
          l.getAttribute("href") ===
          "https://calendar.app.google/qVYtuXUBupAUzsQ18"
      );
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it("DataMate website link navigates to https://datamate.hu", () => {
    renderWithProviders(<Footer />);
    const siteLink = screen.getByText("DataMate.hu");
    expect(siteLink.closest("a")).toHaveAttribute("href", "https://datamate.hu");
  });

  it("'Book a Call' nav button calls scrollIntoView on #cta", () => {
    renderWithProviders(<Header />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "cta";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    fireEvent.click(screen.getAllByText("Book a Call")[0]);

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("language can be toggled EN → HU → EN (round-trip)", () => {
    renderWithProviders(<Header />);
    fireEvent.click(screen.getAllByText("🇭🇺 HU")[0]);
    fireEvent.click(screen.getAllByText("🇬🇧 EN")[0]);
    expect(screen.getAllByText("🇭🇺 HU").length).toBeGreaterThan(0);
  });

  it("package 'I want this' buttons all link to the booking URL", () => {
    renderWithProviders(<PackagesSection />);
    const buttons = screen.getAllByText("I want this");
    expect(buttons).toHaveLength(3);
    buttons.forEach((btn) => {
      expect(btn.closest("a")).toHaveAttribute(
        "href",
        "https://calendar.app.google/qVYtuXUBupAUzsQ18"
      );
    });
  });
});

// ─── T – Time ─────────────────────────────────────────────────────────────────

describe("T – Time: how the product handles time", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("copyright notice contains the current year", () => {
    renderWithProviders(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("copyright year is dynamically generated, not a hardcoded past value", () => {
    renderWithProviders(<Footer />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`Copyright © ${year}`))
    ).toBeInTheDocument();
    // Ensure a past year is not shown as the copyright year
    expect(screen.queryByText(/Copyright © 2023/)).toBeNull();
  });
});
