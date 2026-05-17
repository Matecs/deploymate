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

  it("renders the DeployMate website link", () => {
    renderFooter();
    const link = screen.getByText("DeployMate.hu");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "https://deploymate.hu");
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
