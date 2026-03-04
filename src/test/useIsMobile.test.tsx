import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useIsMobile } from "@/hooks/use-mobile";

describe("useIsMobile", () => {
  const MOBILE_BREAKPOINT = 768;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when window width is at or above the mobile breakpoint", () => {
    Object.defineProperty(window, "innerWidth", { value: MOBILE_BREAKPOINT, configurable: true, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns false when window width is wider than mobile breakpoint", () => {
    Object.defineProperty(window, "innerWidth", { value: 1280, configurable: true, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("returns true when window width is below the mobile breakpoint", () => {
    Object.defineProperty(window, "innerWidth", { value: 375, configurable: true, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it("updates when the matchMedia change event fires", () => {
    let changeHandler: (() => void) | null = null;
    const mockMql = {
      matches: false,
      addEventListener: vi.fn((_event: string, handler: () => void) => {
        changeHandler = handler;
      }),
      removeEventListener: vi.fn(),
    };
    vi.spyOn(window, "matchMedia").mockReturnValue(mockMql as unknown as MediaQueryList);

    Object.defineProperty(window, "innerWidth", { value: 1280, configurable: true, writable: true });
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);

    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 375, configurable: true, writable: true });
      changeHandler?.();
    });
    expect(result.current).toBe(true);
  });

  it("removes the change event listener on unmount", () => {
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    vi.spyOn(window, "matchMedia").mockReturnValue(mockMql as unknown as MediaQueryList);

    const { unmount } = renderHook(() => useIsMobile());
    unmount();
    expect(mockMql.removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
