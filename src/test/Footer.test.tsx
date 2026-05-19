import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "@/components/Footer";
import { LangProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <LangProvider>
          <Footer />
        </LangProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

describe("Footer", () => {
  it("renders the DeployMate logo", () => {
    renderFooter();
    expect(screen.getByAltText("DeployMate logo")).toBeInTheDocument();
  });

  it("renders the tagline text", () => {
    renderFooter();
    expect(
      screen.getByText("QA-Driven Release & Compliance Operations")
    ).toBeInTheDocument();
  });

  it("renders the footer precision text", () => {
    renderFooter();
    expect(screen.getByText("Built with engineering precision")).toBeInTheDocument();
  });

  it("renders the email address as a mailto link", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: "mate@deploymate.hu" });
    expect(link).toHaveAttribute("href", "mailto:mate@deploymate.hu");
  });

  it("renders the phone number as a tel link", () => {
    renderFooter();
    const link = screen.getByRole("link", { name: "+36 20 434 9647" });
    expect(link).toHaveAttribute("href", "tel:+36204349647");
  });

  it("renders the current year in the copyright notice", () => {
    renderFooter();
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
