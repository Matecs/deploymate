import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <LangProvider>
        <Footer />
      </LangProvider>
    </MemoryRouter>
  );

describe("Footer", () => {
  it("renders the DataMate logo", () => {
    renderFooter();
    expect(screen.getByAltText("DataMate logo")).toBeInTheDocument();
  });

  it("renders the tagline text", () => {
    renderFooter();
    expect(
      screen.getByText("Release & Compliance Operations Architect")
    ).toBeInTheDocument();
  });

  it("renders the DataMate website link", () => {
    renderFooter();
    const link = screen.getByText("DataMate.hu");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "https://datamate.hu");
  });

  it("renders the email address as plain text (not a link)", () => {
    renderFooter();
    const el = screen.getByText("mate@datamate.hu");
    expect(el).toBeInTheDocument();
    expect(el.tagName.toLowerCase()).toBe("span");
    expect(el.closest("a")).toBeNull();
  });

  it("renders the phone number as plain text (not a link)", () => {
    renderFooter();
    const el = screen.getByText("+36 20 434 9647");
    expect(el).toBeInTheDocument();
    expect(el.tagName.toLowerCase()).toBe("span");
    expect(el.closest("a")).toBeNull();
  });

  it("renders the current year in the copyright notice", () => {
    renderFooter();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
