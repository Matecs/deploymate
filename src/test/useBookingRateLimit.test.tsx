import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useBookingRateLimit, SESSION_COUNT_KEY, BOOKING_SOURCE_KEY, MAX_CLICKS } from "@/hooks/use-booking-rate-limit";
import { LangProvider } from "@/lib/i18n";

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

import { toast } from "@/hooks/use-toast";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <LangProvider>{children}</LangProvider>
);

const makeEvent = (href = "https://calendar.app.google/qVYtuXUBupAUzsQ18") => {
  const anchor = { href } as HTMLAnchorElement;
  return {
    preventDefault: vi.fn(),
    currentTarget: anchor,
  } as unknown as React.MouseEvent<HTMLAnchorElement>;
};

describe("useBookingRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows the first click and stores the timestamp in localStorage", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(e.preventDefault).not.toHaveBeenCalled();
    expect(localStorage.getItem("lastBookingClick")).toBe(String(now));
  });

  it("increments the session click count on each allowed click", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("hero")(makeEvent());
    });

    expect(sessionStorage.getItem(SESSION_COUNT_KEY)).toBe("1");
  });

  it("blocks a second click within the 60 s cooldown", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    localStorage.setItem("lastBookingClick", String(now - 30_000)); // 30 s ago

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(e.preventDefault).toHaveBeenCalled();
    expect(toast).toHaveBeenCalled();
  });

  it("does not update localStorage when the click is blocked", () => {
    const now = 1_000_000;
    const lastClick = now - 30_000;
    vi.setSystemTime(now);
    localStorage.setItem("lastBookingClick", String(lastClick));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(localStorage.getItem("lastBookingClick")).toBe(String(lastClick));
  });

  it("allows a click exactly after the 60 s cooldown has elapsed", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    localStorage.setItem("lastBookingClick", String(now - 61_000)); // 61 s ago

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(e.preventDefault).not.toHaveBeenCalled();
    expect(localStorage.getItem("lastBookingClick")).toBe(String(now));
  });

  it("includes the remaining seconds in the toast description", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    // 40 s ago → 20 s remaining
    localStorage.setItem("lastBookingClick", String(now - 40_000));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: expect.stringContaining("20"),
      })
    );
  });

  it("uses the destructive toast variant when rate-limited", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    localStorage.setItem("lastBookingClick", String(now - 10_000));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" })
    );
  });

  it("blocks further clicks once the session limit (3) is reached", () => {
    sessionStorage.setItem(SESSION_COUNT_KEY, String(MAX_CLICKS));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent();

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(e.preventDefault).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" })
    );
  });

  it("does not update localStorage or session count when session limit is reached", () => {
    sessionStorage.setItem(SESSION_COUNT_KEY, String(MAX_CLICKS));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("hero")(makeEvent());
    });

    expect(localStorage.getItem("lastBookingClick")).toBeNull();
    expect(sessionStorage.getItem(SESSION_COUNT_KEY)).toBe(String(MAX_CLICKS));
  });

  it("session limit block shows the max-clicks toast description", () => {
    sessionStorage.setItem(SESSION_COUNT_KEY, String(MAX_CLICKS));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("hero")(makeEvent());
    });

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        description: expect.stringContaining("maximum number of booking"),
      })
    );
  });

  it("stores the booking source in localStorage on an allowed click", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("package-project")(makeEvent());
    });

    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBe("package-project");
  });

  it("does not update the booking source when the click is rate-limited", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    localStorage.setItem("lastBookingClick", String(now - 30_000));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("hero")(makeEvent());
    });

    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBeNull();
  });

  it("appends utm_content to the booking URL on an allowed click", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent("https://calendar.app.google/qVYtuXUBupAUzsQ18");

    act(() => {
      result.current.handleBookingClick("cta")(e);
    });

    expect(e.currentTarget.href).toBe(
      "https://calendar.app.google/qVYtuXUBupAUzsQ18?utm_content=cta"
    );
  });

  it("does not modify the URL when the click is rate-limited", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    localStorage.setItem("lastBookingClick", String(now - 30_000));

    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const originalHref = "https://calendar.app.google/qVYtuXUBupAUzsQ18";
    const e = makeEvent(originalHref);

    act(() => {
      result.current.handleBookingClick("hero")(e);
    });

    expect(e.currentTarget.href).toBe(originalHref);
  });

  // ── Tracking: source storage ──────────────────────────────────────────────

  it("stores 'cta' source when the CTA section button is clicked", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("cta")(makeEvent());
    });

    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBe("cta");
  });

  it("stores 'package-retainer' source when that package button is clicked", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("package-retainer")(makeEvent());
    });

    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBe("package-retainer");
  });

  it("stores 'package-vpe' source when that package button is clicked", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("package-vpe")(makeEvent());
    });

    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBe("package-vpe");
  });

  it("overwrites the source when a second allowed click comes from a different button", () => {
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    // First click from hero
    vi.setSystemTime(1_000_000);
    act(() => {
      result.current.handleBookingClick("hero")(makeEvent());
    });
    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBe("hero");

    // Second click after cooldown from packages
    vi.setSystemTime(1_000_000 + 61_000);
    act(() => {
      result.current.handleBookingClick("package-project")(makeEvent());
    });
    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBe("package-project");
  });

  it("does not update the booking source when the session limit is reached", () => {
    sessionStorage.setItem(SESSION_COUNT_KEY, String(MAX_CLICKS));
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    act(() => {
      result.current.handleBookingClick("cta")(makeEvent());
    });

    expect(localStorage.getItem(BOOKING_SOURCE_KEY)).toBeNull();
  });

  it("does not modify the URL when the session limit is reached", () => {
    sessionStorage.setItem(SESSION_COUNT_KEY, String(MAX_CLICKS));
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const originalHref = "https://calendar.app.google/qVYtuXUBupAUzsQ18";
    const e = makeEvent(originalHref);

    act(() => {
      result.current.handleBookingClick("cta")(e);
    });

    expect(e.currentTarget.href).toBe(originalHref);
  });

  // ── Rate limiting: session counter ────────────────────────────────────────

  it("increments the session counter on each successive allowed click", () => {
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    vi.setSystemTime(1_000_000);
    act(() => { result.current.handleBookingClick("hero")(makeEvent()); });
    expect(sessionStorage.getItem(SESSION_COUNT_KEY)).toBe("1");

    vi.setSystemTime(1_000_000 + 61_000);
    act(() => { result.current.handleBookingClick("cta")(makeEvent()); });
    expect(sessionStorage.getItem(SESSION_COUNT_KEY)).toBe("2");

    vi.setSystemTime(1_000_000 + 122_000);
    act(() => { result.current.handleBookingClick("package-project")(makeEvent()); });
    expect(sessionStorage.getItem(SESSION_COUNT_KEY)).toBe("3");
  });

  it("triggers the cooldown toast on a rapid second click", () => {
    const now = 1_000_000;
    vi.setSystemTime(now);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });

    // First click — allowed (shows success toast, not destructive)
    act(() => { result.current.handleBookingClick("hero")(makeEvent()); });
    expect(toast).not.toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" })
    );

    // Second click immediately — should be blocked
    const e2 = makeEvent();
    act(() => { result.current.handleBookingClick("hero")(e2); });
    expect(e2.preventDefault).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" })
    );
  });

  // ── UTM param: per-source values ─────────────────────────────────────────

  it("appends utm_content=hero to the URL from the hero button", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent("https://calendar.app.google/qVYtuXUBupAUzsQ18");

    act(() => { result.current.handleBookingClick("hero")(e); });

    expect(e.currentTarget.href).toBe(
      "https://calendar.app.google/qVYtuXUBupAUzsQ18?utm_content=hero"
    );
  });

  it("appends utm_content=package-retainer to the URL from the retainer button", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent("https://calendar.app.google/qVYtuXUBupAUzsQ18");

    act(() => { result.current.handleBookingClick("package-retainer")(e); });

    expect(e.currentTarget.href).toBe(
      "https://calendar.app.google/qVYtuXUBupAUzsQ18?utm_content=package-retainer"
    );
  });

  it("appends utm_content=package-vpe to the URL from the VP Eng button", () => {
    vi.setSystemTime(1_000_000);
    const { result } = renderHook(() => useBookingRateLimit(), { wrapper });
    const e = makeEvent("https://calendar.app.google/qVYtuXUBupAUzsQ18");

    act(() => { result.current.handleBookingClick("package-vpe")(e); });

    expect(e.currentTarget.href).toBe(
      "https://calendar.app.google/qVYtuXUBupAUzsQ18?utm_content=package-vpe"
    );
  });
});
