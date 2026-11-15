# HAGER Investment: website

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Motion · Swiper.

## Commands

```bash
npm install        # Node >= 20.9
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered as static)
npm start          # serve the production build
npm run typecheck  # next typegen + tsc --noEmit
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm run check      # typecheck + lint + build
```

Production runs at `https://hager-investment.com` (www redirects there); `NEXT_PUBLIC_SITE_URL` defaults to it and can override it, e.g. for staging. **Deployment:** see [DEPLOYMENT.md](DEPLOYMENT.md) (Docker + Nginx on the VPS, one-command updates with `./deploy.sh`). It drives canonical URLs, Open Graph, `robots.txt` and `sitemap.xml`.

## Structure

```
src/
  app/                    layout (fonts, metadata), page, globals.css (design tokens),
                          not-found, robots, sitemap, icon.svg, opengraph-image.jpg
  assets/images/          brand photography (static imports → width/height/blur placeholders)
  config/                 site.ts (name, URL, navigation), review.ts (content review mode)
  content/home.ts         ALL homepage copy and data, typed
  lib/                    content (tbc placeholders), gsap setup, cn, media-query hook
  components/
    ui/                   Container, Section (tone scopes), SectionHeader, Eyebrow, Button/ButtonLink/ArrowLink,
                          Photo (natural grade), SiteLink, Typography, Wordmark, Icons, Placeholder/CopyText
    layout/               SiteHeader (client), SiteFooter, CurrentYear (client)
    motion/               ScrollAnimations (client): declarative GSAP scroll animations (see below)
    forms/                ContactForm (client; for the future Contact page, not on the homepage)
    sections/home/        Hero, About, Sectors (SectorExplorer), Expertise (ExpertisePanels), Statement,
                          Approach (ApproachSequence), Foundations, Philosophy, Insights, Closing
_legacy-static/           untouched copy of the original HTML/CSS/JS site
```

Server Components by default. Client Components are limited to the header, hero slider, sector explorer, expertise panels, approach sequence, scroll-animation layer and footer year.

## Content, verification and review mode

All homepage copy lives in `src/content/home.ts`.

- **Verified** (plain strings): Luxembourg-established, corporate history dating to 1993, company registration B44483.
- **Proposed** (sectors, services, process, principles): written as perspective, with a review-mode "pending approval" note.
- **Placeholders** (`tbc(text, fallback)`): the public site shows only the neutral fallback (or nothing); review mode shows the placeholder text with a dashed marker.
- **Sample insights** are labelled "Sample · Not yet published" on the public site.

Review mode: add `?review=1` to any URL (`?review=0` to leave), or build with `NEXT_PUBLIC_REVIEW_MODE=true`.

Built pages: `/`, `/about` (content in `src/content/about.ts`; the hero plays a muted, looping background film from `public/videos/about-hero.mp4` with a poster frame, via `HeroFilm`: it waits for the poster under reduced motion or Save-Data, pauses off screen, and has a visible pause control; the LEI was supplied by HAGER Investment for AB-01) and `/investment-universe` (IV-02 redesign, content in `src/content/investment-universe.ts`: sector perspectives, groupings and themes are proposed content with review-mode notes, not holdings). Each sector is an `<article id="<slug>">`, so `/investment-universe#<slug>` links (footer, homepage sector panel) land on it; a sticky sector index follows the sector in view; `/expertise` (EX-02, content in `src/content/expertise.ts`: the six services and three principles are proposed content with review-mode notes; each service is an `<article id="<slug>">`, so the homepage `/expertise#<slug>` links land on it); `/approach` (AP-02, content in `src/content/approach.ts`: the four evaluation stages and four considerations are proposed content with review-mode notes; every stage is always visible as an editorial row, with no tabs or pinning, and the hero carries in-page section links) and `/insights` (IN-01, content in `src/content/insights.ts`: every article is a labelled sample, "Sample · Not Published", shown as an in-page summary with no article pages or links; the directory has topic filters, keyword search and an empty state, and masthead links `#topic-<slug>` open it pre-filtered). New pages are always linked from both the header (`primaryNav`) and footer (`footerNav`) in `src/config/site.ts`, added to `LIVE_ROUTES` and the sitemap; there are no `/sectors/*` pages yet. `/contact` (CT-01, content in `src/content/contact.ts`; no contact form). Contact methods come only from `contactDetails` in `src/config/site.ts`: email and telephone can also be set at deployment with `NEXT_PUBLIC_CONTACT_EMAIL` / `NEXT_PUBLIC_CONTACT_PHONE`. **Launch blocker:** no email, telephone or address has been confirmed yet, so the page shows neutral wording publicly and dashed launch-blocker notes in review mode; a configured email appears large as a `mailto:` link with a Copy action, and a configured phone as a `tel:` link. Sector and service subpages (SD-01): 7 at `/investment-universe/<slug>` and 6 at `/expertise/<slug>`, all content in `src/content/subpages.ts` and rendered by one architecture in `src/components/sections/subpage/` (hero, overview, focus areas, perspective: four sections) with three layout variations (A Editorial Split, B Institutional Minimal, C Architectural Accent: one photograph or a CSS line graphic). Each has its own thin static route file, so unknown slugs 404. Overview and discipline copy and all six service descriptions are proposed content (review-mode notes). They are linked from the Investment Universe and Expertise overviews, the homepage sector and expertise panels, and the footer Sectors and Services columns (not the header). Legal collection (LG-01): `/legal-notice`, `/privacy-policy`, `/disclaimer`, one shared shell (`src/components/sections/legal/LegalPage.tsx`) fed by `src/content/legal.ts`. All three are **drafts pending company and legal approval**: review mode marks them as drafts and shows every drafting note and launch blocker; unconfirmed values (registered office, email, telephone, VAT / permit, dates) never appear publicly. Until `LEGAL_APPROVED` is set to true they are `noindex` and excluded from the sitemap; they are linked only in the footer (exactly these three), never in the header. They print as clean black-on-white documents are linked but not built yet. Add each route to `LIVE_ROUTES` in `src/components/ui/SiteLink.tsx` once it exists, so it gets prefetched.

## Design system

Final palette (BRAND-03), defined in `src/app/globals.css` (`@theme`; Tailwind default colours are cleared):
`obsidian #090B0D` · `petrol #102C35` (Imperial Petrol) · `teal #117B89` (Ocean Teal) · `white` · `platinum #DAE8EA` (Platinum Mist) · `porcelain #F7F6F1` (Warm Porcelain) · `silver #A9C1C5` (Silver Aqua). `error` is kept for system feedback only.

Sections set a tone through `<Section tone>` or a `tone-*` class: `white | porcelain | platinum` (light) and `petrol | obsidian` (dark). Each tone defines the semantic tokens `--bg`, `--surface`, `--fg`, `--fg-muted`, `--fg-subtle`, `--line`, `--line-soft`, `--accent` (text-safe), `--accent-ui` (fills/progress) and `--focus`, so shared components adapt automatically.

Contrast rules: Ocean Teal is text-safe on white (5.0:1) and porcelain (4.6:1) only. On platinum (3.9:1) and petrol (3.0:1) it is used for fills, not small text; those tones switch `--accent` to petrol / Silver Aqua. Buttons: `dark` = Imperial Petrol, `light` = white, both with the teal signature circle. Image overlays are neutral Obsidian gradients (no colour washes).
Type utilities: `text-display`, `text-section`, `text-statement`, `text-title`, `text-lede`, `text-eyebrow`. Layout: `container-site`, `section-y`, `gap-x-col`.

## Animation

- Declarative scroll animation attributes (full reference at the top of `src/components/motion/ScrollAnimations.tsx`):
  - `data-reveal`: batched fade/rise, opacity only so content stays keyboard-focusable. After a long jump, content above the viewport settles instantly.
  - `data-seq-group` / `data-seq`: children enter in sequence (`data-seq-group="0.14"` sets the stagger, `data-seq-delay` the lead-in).
  - `data-fill`: section headings fill word by word from pale to full strength with scroll (scrubbed). Used on the main section headings; the closing CTAs keep `data-split`.
  - `data-split`: heading lines rise from a mask (GSAP SplitText, bundled with `gsap`). The original DOM is restored when the animation completes. Don't use it on flex layouts such as `Eyebrow`.
  - `data-clip-reveal="up|x|x-rev"`: masked frame wipe; the photo's inner layer settles from a slight scale.
  - `data-hero-zoom` / `data-hero-veil` / `data-hero-inset` (inside the `[data-header-overlay]` hero): on scroll-out the hero film pushes in, an Obsidian veil deepens and the frame recedes into an inset panel.
  - `data-mosaic`: Expertise panels. On desktop they unmask in sequence; on smaller screens they use a simple rise.
  - `data-drift="4"` (`data-drift-axis="y"`): scroll-linked type and geometry movement.
  - `data-pop`, `data-draw-line`, `data-rise-group` / `data-rise`, `data-parallax`, `data-scrub-scale`, `data-progress` / `data-progress-track`, `data-count`.
  - `data-hero-drift` / `data-hero-scroll`: hero image depth and copy lift as the hero scrolls away. The slider controls are untouched.
  - `data-draw-path` (SVG strokes with `pathLength="1"`; do not combine with `vector-effect: non-scaling-stroke`, which breaks the dash trick), `data-expand` (scrubbed light-to-dark curtain), `data-frame-expand` with `data-frame-media` / `data-frame-line` (image frame opening to full bleed).
- About page: the hero entrance is pure CSS (`.about-hero-*`). `HeritageTimeline` scrubs a year cursor (the current year is read on the client only; Cache Components forbids the clock at prerender). `PerspectiveThemes` uses a sticky stage with CSS clip-path layers, no pinning.
- Approach: the sticky column already gives desktop pinning without hijacking scroll. Progress segments scrub with scroll on desktop, and step with the active stage under reduced motion.
- Only transform, opacity and clip-path are animated. The one exception is the Expertise hairline grid colour, which fades in once.
- Render `<ScrollAnimations />` once per page. Entrances play once without ScrollTrigger `once: true` (self-killing triggers can crash a concurrent refresh). After a client navigation the engine sets up one frame later and ignores hidden elements: with Cache Components the previous route stays in the DOM, hidden by React `<Activity>`.
- Smooth scrolling: `SmoothScroll` (Lenis, in the root layout) eases wheel input on the native scroll, driven by the GSAP ticker. Off under reduced motion; paused while the mobile menu is open. Same-page anchor links glide to their target and move focus there.
- All motion respects `prefers-reduced-motion`. Content is fully visible without JavaScript.
- The hero slider attaches vanilla Swiper to server-rendered markup. Swiper's React wrapper instantiates during render, which Cache Components rejects at prerender.

## Private documents (email-verified delivery)

"Request Private Documents" (Contact › Get in Touch, About › Company Information) opens a dialog:
the visitor enters an email address, receives a six-digit code (sent through Resend), enters it, and the
approved PDFs are emailed to that verified address as attachments.

- **Documents:** put the approved PDFs in `private/documents/` (outside `public/`, never served by URL).
  With no PDF present the dialog says "temporarily unavailable" and no code is sent.
- **Configuration (server-only env, see `.env.example`):** `RESEND_API_KEY`, `DOCUMENTS_FROM_EMAIL`
  (a sender on a domain verified in Resend) and `OTP_HASH_SECRET` (≥ 16 random characters; required in
  production). Optional: `DOCUMENTS_REPLY_TO`, `OTP_TTL_MINUTES` (10), `OTP_MAX_ATTEMPTS` (5),
  `OTP_RESEND_COOLDOWN_SECONDS` (60), `DOCUMENTS_DIR`, `OTP_STORE_PATH`.
- **Security:** codes are HMAC-hashed, single-use and time-limited; 5 attempts per code; per-IP and
  per-email rate limits; same-origin JSON-only API; honeypot field; each verified request delivers once.
- **Hosting:** runs on a Node server (`next start`, VPS or container). Challenges are kept in a small
  file (`.data/otp-challenges.json`) and rate limits in memory, so a single long-running instance is
  assumed; serverless hosting would need a shared store (e.g. Redis) instead.
- **Code:** `src/lib/documents-access/*`, `src/app/api/request-documents/{start,verify,resend}`,
  `src/components/documents/*`.

## Contact enquiry form

The Contact page form posts to `/api/contact`, which validates the enquiry, checks a honeypot and a
minimum fill time, rate-limits (5 per IP / 3 per email per hour) and sends it through Resend to
`CONTACT_TO_EMAIL` (reply-to: the sender), plus an acknowledgement with a reference to the sender
(`CONTACT_SEND_ACK=false` disables it). Until `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and a sender
(`CONTACT_FROM_EMAIL` or `DOCUMENTS_FROM_EMAIL`) are set, the form shows "temporarily unavailable".
Code: `src/lib/contact/*`, `src/app/api/contact/route.ts`, `src/components/sections/contact/EnquiryForm.tsx`.
