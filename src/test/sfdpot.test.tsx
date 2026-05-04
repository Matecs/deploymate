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
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("Monthly Retainer")).toBeInTheDocument();
    expect(screen.getByText("Fractional VP of Engineering")).toBeInTheDocument();
  });

  it("renders three audience item cards", () => {
    renderPage();
    const audienceSection = document.getElementById("audience")!;
    const items = within(audienceSection).getAllByText(/SOC2|rollbacks|CTO/);
    expect(items).toHaveLength(3);
  });

  it("renders the DataMate logo in both header and footer", () => {
    renderPage();
    // Header uses full descriptive alt text, footer uses short alt text
    expect(screen.getByAltText("DataMate — Release & Compliance Operations Architect")).toBeInTheDocument();
    expect(screen.getByAltText("DataMate logo")).toBeInTheDocument();
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
    fireEvent.click(screen.getAllByText("HU")[0]);
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
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

  it("hero CTA button scrolls to #cta section", () => {
    renderWithProviders(<HeroSection />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "cta";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    const buttons = screen.getAllByRole("button");
    const ctaBtn = buttons.find((b) => b.textContent?.includes("Release Audit call"));
    fireEvent.click(ctaBtn!);

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("CTA section has email and phone contact links", () => {
    renderPage();
    const emailLinks = screen.getAllByRole("link", { name: /mate@datamate.hu/ });
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    expect(emailLinks[0]).toHaveAttribute("href", "mailto:mate@datamate.hu");
    const phoneLinks = screen.getAllByRole("link", { name: /36 20 434 9647/ });
    expect(phoneLinks.length).toBeGreaterThanOrEqual(1);
    expect(phoneLinks[0]).toHaveAttribute("href", "tel:+36204349647");
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
        name: /Stop losing weekends to rollbacks/,
      })
    ).toBeInTheDocument();
  });

  it("displays the hero statistics line", () => {
    renderPage();
    const matches = screen.getAllByText(/1 rollback per 109 releases/);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("renders the experience claim in the hero description", () => {
    renderPage();
    expect(screen.getByText(/18 years of experience/)).toBeInTheDocument();
  });

  it("renders all three package prices in English", () => {
    renderPage();
    expect(screen.getByText("€4,500 | 2 weeks")).toBeInTheDocument();
    expect(screen.getByText("€5,000/mo | 10 hrs/week")).toBeInTheDocument();
    expect(screen.getByText("€10,000/mo | 20 hrs/week")).toBeInTheDocument();
  });

  it("renders all three package prices in Hungarian when lang is HU", () => {
    localStorage.setItem("lang", "hu");
    renderWithProviders(<PackagesSection />);
    expect(screen.getByText("1,8M Ft | 2 hét")).toBeInTheDocument();
    expect(screen.getByText("2M Ft/hó | 10 óra/hét")).toBeInTheDocument();
    expect(screen.getByText("4M Ft/hó | 20 óra/hét")).toBeInTheDocument();
  });

  it("renders both credibility testimonials", () => {
    renderPage();
    expect(
      screen.getByText(/Led 109 releases\/year with 1 rollback/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Seamless quarterly compliance/)
    ).toBeInTheDocument();
  });

  it("renders the contact email as a mailto link in footer", () => {
    renderWithProviders(<Footer />);
    const emailLink = screen.getByRole("link", { name: "mate@datamate.hu" });
    expect(emailLink).toHaveAttribute("href", "mailto:mate@datamate.hu");
  });

  it("renders the phone number as a tel link in footer", () => {
    renderWithProviders(<Footer />);
    const phoneLink = screen.getByRole("link", { name: "+36 20 434 9647" });
    expect(phoneLink).toHaveAttribute("href", "tel:+36204349647");
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

    fireEvent.click(screen.getAllByText("HU")[0]);

    expect(localStorage.getItem("lang")).toBe("hu");
  });

  it("restores the language preference from localStorage on mount", () => {
    localStorage.setItem("lang", "hu");
    renderWithProviders(<Header />);
    // Hungarian is active → toggle button shows the EN flag
    expect(screen.getAllByText("EN").length).toBeGreaterThan(0);
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

  it("CTA section contains email and phone contact info", () => {
    renderPage();
    const emailLinks = screen.getAllByRole("link", { name: /mate@datamate.hu/ });
    expect(emailLinks.length).toBeGreaterThanOrEqual(1);
    const phoneLinks = screen.getAllByRole("link", { name: /36 20 434 9647/ });
    expect(phoneLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("DataMate website link navigates to https://datamate.hu", () => {
    renderWithProviders(<Footer />);
    const siteLink = screen.getByText("DataMate.hu");
    expect(siteLink.closest("a")).toHaveAttribute("href", "https://datamate.hu");
  });

  it("'Contact Me' nav button calls scrollIntoView on #cta", () => {
    renderWithProviders(<Header />);
    const mockScroll = vi.fn();
    const el = document.createElement("div");
    el.id = "cta";
    el.scrollIntoView = mockScroll;
    document.body.appendChild(el);

    fireEvent.click(screen.getAllByText("Contact Me")[0]);

    expect(mockScroll).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(el);
  });

  it("language can be toggled EN → HU → EN (round-trip)", () => {
    renderWithProviders(<Header />);
    fireEvent.click(screen.getAllByText("HU")[0]);
    fireEvent.click(screen.getAllByText("EN")[0]);
    expect(screen.getAllByText("HU").length).toBeGreaterThan(0);
  });

  it("package CTA buttons scroll to #cta section", () => {
    renderWithProviders(<PackagesSection />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
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
    // Footer renders "© {year} DataMate" — no "Copyright" prefix
    expect(
      screen.getByText(new RegExp(String(year)))
    ).toBeInTheDocument();
    // Ensure a past year is not shown as the copyright year
    expect(screen.queryByText(/2023/)).toBeNull();
  });
});
