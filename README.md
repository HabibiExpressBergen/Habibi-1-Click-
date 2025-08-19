# Habibi Express – Superenkel fastpris-skjema (MVP)

To alternativer:

## A) Standalone (ingen rammeverk)
Åpne `habibi-express-standalone.html` i nettleseren eller last opp til valgfri hosting (Netlify, Vercel static, etc.).
- Ingen eksterne biblioteker.
- Du kan koble `fetch('/api/quote')` i koden for ekte innsending.

## B) Next.js (App Router + Tailwind)
Legg `app.page.tsx` inn som `app/page.tsx` i en Next.js-app med Tailwind konfigurert.
- Knyt `onSubmit` til ditt API-endepunkt (f.eks. `/api/quote`).
- Spor CTA-klikk via `data-analytics="cta"`.

**Telefon:** +47 47 8787 69 (format i UI), men `tel:`-lenken er `+4747878769`.
**Ingen arabisk tekst.**
