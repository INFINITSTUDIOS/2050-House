# Feedia website (modernized)

A rebuilt, static version of [thefeedia.com](https://www.thefeedia.com/) with three new sections:

| Page | What it has |
| --- | --- |
| `index.html` | Hero, 10 services, client logos, latest videos, upcoming events, sponsor call-to-action, contact form |
| `about.html` | About Feedia, core sectors, 2050 House, clients |
| `services.html` | All 10 service areas with their full offering lists (original `#strategy`, `#optimization`, … anchors kept) |
| `consultation.html` | Calendly booking (15 / 30 / 60 min), same links as the old site |
| `events.html` | **Event calendar**: month and list views, category filters, past/upcoming, Google Calendar and `.ics` export, shareable event links |
| `media.html` | **Media library**: every video from [youtube.com/@Feedia2050](https://www.youtube.com/@Feedia2050) embedded, with a featured player, category filters, search and sort |
| `invest.html` | **Invest & Sponsor**: sponsorship tiers, open events, affiliate rewards calculator, affiliate link builder, program terms, application form |

No build step: open `index.html`, or serve the folder with any static host (GitHub Pages, Netlify, Vercel, S3).

```bash
python3 -m http.server 8000
```

## Editing content

Everything lives in **`assets/js/data.js`**:

- `services`, `clients`, `sectors`: site copy and logos
- `events`: add an object with `date` (and optional `end`), `category`, `location`, `description`. `tentative: true` shows "Dates TBC"; `sponsorable: true` lists it on the Invest page; `video` links a YouTube recap.
- `media`: add a YouTube video by its ID (`yt`), title, duration, year and category. `featured: true` puts it in the hero and featured player.
- `tiers`: sponsorship price, `rewardRate` (% of referred ticket revenue) and `sponsorBonus` (% of a referred sponsor's package).

## Affiliate tracking

- Sponsors share links like `events.html?ref=ACME2050` (made with the link builder on the Invest page).
- Any page opened with `?ref=` stores the code for 30 days, and it's added to every form the visitor sends.

## Forms

By default, forms open the visitor's email app with a pre-filled message to `info@thefeedia.com`, so no backend is needed. To collect submissions on a server instead, add `data-endpoint="https://…"` to the `<form>` (e.g. a Formspree, Basin or Zapier webhook URL); the JSON is POSTed there.
