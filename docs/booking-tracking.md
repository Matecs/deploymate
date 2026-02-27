# Booking Link Tracking

This document explains how booking button clicks are tracked through to Google Calendar, and how to read that data as the site owner.

---

## How It Works

Every booking button on the site is an `<a>` tag pointing to the Google Calendar appointment scheduling URL. When a visitor clicks a button, the `useBookingRateLimit` hook intercepts the click and appends a `utm_content` query parameter to the URL before the browser navigates:

```
https://calendar.google.com/calendar/appointments/...?utm_content=hero
```

Google Calendar records the full URL that each booking was created from, so `utm_content` value is visible in your booking notifications and in Google Analytics if your Calendar page is tracked.

---

## Source Values

Each button passes a unique `source` string that becomes the `utm_content` value:

| Button location | `utm_content` value |
|---|---|
| Hero section CTA | `hero` |
| Packages section — Project Audit card | `package-project` |
| Packages section — Monthly Retainer card | `package-retainer` |
| Packages section — Fractional VPE card | `package-vpe` |
| Bottom CTA section | `cta` |

---

## Where to See the Tracking Data

### Google Calendar booking confirmation email

When a visitor completes a booking, Google Calendar sends you a confirmation email. The appointment details include the page URL the booking originated from. The `utm_content` parameter in that URL tells you which button the customer used.

### Google Analytics (if configured)

If you have Google Analytics linked to your Google Calendar booking page, you can see `utm_content` as a custom dimension or in campaign reports under:

**Reports → Acquisition → Traffic acquisition → Session manual content**

---

## Rate Limiting

The hook also enforces two client-side guards to prevent accidental repeated clicks from flooding your calendar:

| Guard | Behaviour |
|---|---|
| **Cooldown** | A second click within 60 seconds is blocked and shows a "please wait" toast. |
| **Session cap** | After 3 allowed clicks in the same browser tab session, further clicks are blocked with a toast. |

These guards use `localStorage` (for the cooldown timestamp and last source) and `sessionStorage` (for the per-session count). Clearing browser storage resets both limits.

---

## Code Reference

The tracking logic lives entirely in one file:

```
src/hooks/use-booking-rate-limit.ts
```

The relevant lines that append the UTM parameter:

```ts
const url = new URL(e.currentTarget.href);
url.searchParams.set("utm_content", source);
e.currentTarget.href = url.toString();
```
