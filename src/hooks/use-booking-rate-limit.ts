import { useLang } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "lastBookingClick";
const COOLDOWN_MS = 60_000;

export const useBookingRateLimit = () => {
  const { t } = useLang();

  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
  };

  return { handleBookingClick };
};
