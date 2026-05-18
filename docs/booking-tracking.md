# Booking Link Behavior

This document explains how booking links currently work on the site.

---

## Current Behavior

Every booking button on the site is a direct `<a>` link to the Google Calendar appointment scheduling URL.

There is currently no client-side click interception, no UTM parameter appending, and no in-browser rate limiting in this repository.

---

## Booking Link Locations

Booking links are present in these sections:

| Button location |
|---|
| Hero section CTA |
| Packages section cards |
| Bottom CTA section |

---

## Tracking Note

If you need source-level attribution later (for example UTM-based tracking or click throttling), reintroduce it explicitly and document it together with the implementation.
