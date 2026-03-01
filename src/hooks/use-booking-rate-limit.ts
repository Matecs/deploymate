import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";

export const STORAGE_KEY = "lastBookingClick";
export const SESSION_COUNT_KEY = "bookingClickCount";
export const BOOKING_SOURCE_KEY = "bookingClickSource";
export const COOLDOWN_MS = 60_000;
export const MAX_CLICKS = 3;

export const useBookingRateLimit = () => {
  const { t } = useLang();

  const handleBookingClick = (source: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const sessionCount = Number(sessionStorage.getItem(SESSION_COUNT_KEY) ?? "0");

    if (sessionCount >= MAX_CLICKS) {
      e.preventDefault();
      toast({
        title: t("booking.rateLimitTitle"),
        description: t("booking.maxClicksDesc"),
        variant: "destructive",
      });
      return;
    }

    const now = Date.now();
    const last = Number(localStorage.getItem(STORAGE_KEY) ?? "0");
    const elapsed = now - last;

    if (elapsed < COOLDOWN_MS) {
      e.preventDefault();
      const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
      toast({
        title: t("booking.rateLimitTitle"),
        description: t("booking.rateLimitDesc").replace("{s}", String(remaining)),
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem(STORAGE_KEY, String(now));
    localStorage.setItem(BOOKING_SOURCE_KEY, source);
    sessionStorage.setItem(SESSION_COUNT_KEY, String(sessionCount + 1));

    try {
      const url = new URL(e.currentTarget.href);
      url.searchParams.set("utm_content", source);
      e.currentTarget.href = url.toString();
    } catch {
      // proceed without URL modification if parsing fails
    }
  };

  return { handleBookingClick };
};
