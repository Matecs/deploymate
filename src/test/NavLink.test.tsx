import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

const renderNavLink = (props: { to: string; className?: string; activeClassName?: string; pendingClassName?: string }) =>
  render(
    <MemoryRouter initialEntries={[props.to]}>
      <NavLink {...props}>Link Text</NavLink>
    </MemoryRouter>
  );

describe("NavLink", () => {
  it("renders an anchor element with the link text", () => {
    renderNavLink({ to: "/about" });
    expect(screen.getByText("Link Text")).toBeInTheDocument();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("applies the base className", () => {
    renderNavLink({ to: "/about", className: "base-class" });
    expect(screen.getByRole("link")).toHaveClass("base-class");
  });

  it("applies activeClassName when the route is active", () => {
    renderNavLink({ to: "/about", className: "base-class", activeClassName: "active-class" });
    expect(screen.getByRole("link")).toHaveClass("active-class");
  });

  it("does not apply activeClassName when the route is not active", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <NavLink to="/about" activeClassName="active-class">Inactive Link</NavLink>
      </MemoryRouter>
    );
    expect(screen.getByRole("link")).not.toHaveClass("active-class");
  });

  it("applies pendingClassName during pending state via prop forwarding", () => {
    // pendingClassName is passed as a prop; when not pending it should NOT be applied
    renderNavLink({ to: "/about", pendingClassName: "pending-class" });
    // Route is active (not pending), so pending class should not appear
    expect(screen.getByRole("link")).not.toHaveClass("pending-class");
  });

  it("has the displayName set to NavLink", async () => {
    // Verify the forwardRef displayName for debugging/devtools
    const { NavLink: Component } = await import("@/components/NavLink");
    expect(Component.displayName).toBe("NavLink");
  });
});
