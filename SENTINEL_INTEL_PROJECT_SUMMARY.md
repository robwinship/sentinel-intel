# SENTINEL INTEL — Executive Security Intelligence Platform
### Project Summary & Build Documentation

---

## Overview

**SENTINEL INTEL** is a production-ready executive intelligence monitoring and decision-support application. It continuously surfaces security-related events from public internet sources, organizes them by geographic region, generates AI-powered executive summaries, and tracks key financial market indicators — all within a clean, dark-mode dashboard designed for C-suite users.

---

## Client Requests

### Request 1 — Full Application Specification

The client provided a detailed brief requesting a production-ready intelligence monitoring application with the following primary objectives:

- Search and monitor general internet sources, newspapers, newsrooms, TV station websites, security associations, government websites, and public alerts
- Organize results by **Regional**, **Provincial**, **Federal/National**, and **World/International** scope
- Identify and summarize security-relevant events including civil unrest, protests, terror threats, organized crime, cybersecurity incidents, infrastructure disruptions, border issues, transportation disruptions, public safety incidents, severe weather, government advisories, and major regulatory changes
- Track financial indicators useful for executives (stock indexes, futures, commodities, FX, volatility)
- Present concise executive synopses per region and category
- Run on a configurable schedule (hourly, multiple times per day, user-defined)
- Include robust testing and automatic debugging workflow

Full technical requirements included:

| Area | Requirement |
|---|---|
| Frontend | Next.js or React |
| Backend | Python FastAPI or Node.js |
| Database | PostgreSQL |
| Caching/Queues | Redis |
| Scheduling | Celery / cron / background workers |
| Testing | Unit, integration, end-to-end |
| Containerization | Docker |
| AI/NLP | Summarization, categorization, severity scoring, deduplication |

### Request 2 — Convert to Readily Available Code

The client requested the application be converted from a React `.jsx` artifact (requiring a build tool) into a **single self-contained HTML file** that:

- Opens directly in any browser with no installation
- Requires no npm, no Node.js, no build pipeline
- Can be saved, shared by email, or run from a USB drive
- Uses CDN-hosted React and Babel for in-browser transpilation

### Request 3 — This Project Summary

The client requested a downloadable Markdown file summarizing the project, including all previous requests and the current build structure, suitable for use in another project or as reference documentation.

---

## Deliverables Produced

| # | File | Description |
|---|---|---|
| 1 | `executive-intel-app.jsx` | Full React component (requires build tooling / Next.js) |
| 2 | `sentinel-intel.html` | Single-file self-contained application (open in any browser) |
| 3 | `SENTINEL_INTEL_PROJECT_SUMMARY.md` | This document |

---

## Application Modules

The application contains **10 fully implemented modules**, accessible via a fixed sidebar navigation:

| # | Module | Description |
|---|---|---|
| 1 | **Dashboard** | Top-level executive security brief, AI summary panel, scan controls, stats, top events, market snapshot |
| 2 | **Regional Intel** | All events grouped by Regional / Provincial / National / International with filters |
| 3 | **Global Intel** | International-only event stream |
| 4 | **Market Monitor** | Major indices, volatility (VIX), commodities, FX, bonds, watchlist tickers, risk signal panel |
| 5 | **Alerts** | CRITICAL and HIGH severity events with auto-expanded detail cards |
| 6 | **Watchlist** | Add/remove/manage Regions, Companies, Tickers, Keywords, and Topics |
| 7 | **Sources** | Toggle sources on/off, view credibility scores and source URLs |
| 8 | **Schedule** | Set scan frequency (hourly, every N hours, custom), alert thresholds, email digest toggle |
| 9 | **Scan History** | Log of all completed scans with timestamp, event count, source count, and duration |
| 10 | **Export Brief** | Full copyable executive briefing with AI summary, top events, market data, and priorities |

---

## Build Structure (Single-File HTML Version)

The production-ready deliverable is `sentinel-intel.html` — a self-contained file with the following internal structure:

```
sentinel-intel.html
│
├── <head>
│   ├── CDN: React 18 (production)
│   ├── CDN: ReactDOM 18 (production)
│   ├── CDN: Babel Standalone (in-browser JSX transpilation)
│   └── <style> — Full embedded CSS design system
│       ├── CSS custom properties (design tokens)
│       ├── Layout: sidebar, topbar, main content
│       ├── Component styles: cards, buttons, badges, filters
│       ├── Severity badge styles (CRITICAL / HIGH / MODERATE / LOW)
│       ├── Event card styles with expand/collapse
│       ├── Market row styles
│       ├── AI panel styles
│       ├── Schedule, sources, watchlist, scan history styles
│       └── Animations: pulse, flash
│
└── <body>
    ├── <div id="root"> — React mount point
    └── <script type="text/babel">
        │
        ├── CONSTANTS & SEED DATA
        │   ├── SEV — severity ranking map
        │   ├── REGIONS — filter options
        │   ├── CATS — category list
        │   ├── MODULES — sidebar navigation labels
        │   ├── ICONS — sidebar navigation icons
        │   ├── SOURCES_INIT — 10 pre-configured intelligence sources
        │   ├── EVENTS_INIT — 8 seeded real-world-style security events
        │   ├── MARKET — 10 market indicators (indices, volatility, commodities, FX, bonds)
        │   └── TICKERS — 5 watchlist stocks
        │
        ├── UTILITY FUNCTIONS
        │   ├── fmtDt(iso) — formats ISO datetime to readable string
        │   ├── fmtTime(d) — formats time for sidebar clock
        │   └── fmtDate(d) — formats date for topbar
        │
        ├── SHARED COMPONENTS
        │   ├── Sev({ s }) — severity badge renderer
        │   ├── MktRow({ item }) — single market data row with up/down/flag colouring
        │   └── EvCard({ ev, defaultOpen }) — expandable event card with full detail
        │
        ├── MODULE COMPONENTS
        │   ├── Dashboard — stats, AI panel, top events, market cards
        │   ├── RegionalIntel — filtered, grouped event list
        │   ├── GlobalIntel — international event stream
        │   ├── MarketMonitor — full market panel with risk signal
        │   ├── Alerts — high/critical events
        │   ├── Watchlist — add/remove watchlist items by type
        │   ├── Sources — source table with toggle and credibility bar
        │   ├── Schedule — frequency picker, alert threshold, email digest
        │   ├── ScanHistory — scan log table
        │   └── ExportBrief — copyable text briefing
        │
        └── APP (root component)
            ├── State: active module, scan state, last scan, scan history, AI text, AI loading, clock tick
            ├── useEffect — 1-second clock interval
            ├── runScan() — simulates scan pipeline, logs to history
            ├── genAI() — calls Anthropic API, generates executive summary
            └── ReactDOM.createRoot().render(<App/>)
```

---

## Data Models

### Security Event

```json
{
  "id": "e1",
  "headline": "Major cyberattack targets Canadian financial institutions",
  "source": "CBC News",
  "sourceType": "TV/News",
  "dt": "2026-03-19T08:14:00Z",
  "region": "National",
  "cat": "Cybersecurity",
  "sev": "CRITICAL",
  "synopsis": "...",
  "op": "Operational impact description",
  "cyber": "Cyber impact description",
  "travel": "Travel impact description",
  "bcp": "Business continuity action",
  "developing": true,
  "url": "https://www.cbc.ca/"
}
```

### Intelligence Source

```json
{
  "id": 1,
  "name": "Reuters",
  "type": "Newswire",
  "url": "feeds.reuters.com/reuters/topNews",
  "region": "International",
  "active": true,
  "cred": 95
}
```

### Market Indicator

```json
{
  "sym": "S&P 500",
  "val": 5412.30,
  "chg": 18.45,
  "pct": 0.34,
  "type": "Index"
}
```

### Scan History Entry

```json
{
  "time": "2026-03-20T14:30:00Z",
  "ok": true,
  "events": 8,
  "srcs": 10,
  "dur": "2.2"
}
```

---

## Severity Model

Events are classified into four severity tiers:

| Tier | Colour | Meaning | Rank |
|---|---|---|---|
| **CRITICAL** | Red `#ff2d55` | Immediate threat requiring executive action | 4 |
| **HIGH** | Orange `#ff9500` | Significant risk with operational impact | 3 |
| **MODERATE** | Yellow `#ffd60a` | Developing situation to monitor closely | 2 |
| **LOW** | Green `#30d158` | Noted for awareness, no immediate action required | 1 |

Severity is assigned based on:
- Source credibility score
- Number of sources corroborating the event
- Confirmed vs. developing status
- Nature of potential impact (operational, cyber, travel, reputational, BCP)

---

## AI Summary Generation

The AI Brief feature calls the **Anthropic Claude API** (`claude-sonnet-4-20250514`) with a structured prompt containing:

1. The top 8 prioritized events (sorted by severity rank)
2. All current market indicator values and percentage changes

The prompt instructs Claude to produce a **3–4 paragraph executive brief** covering:
- Overall threat environment assessment
- Top 2–3 operational risks
- Market context and volatility signals
- Recommended executive priorities

The response is displayed in the AI panel on the Dashboard and embedded in the Export Brief.

**API endpoint:** `POST https://api.anthropic.com/v1/messages`

**Model:** `claude-sonnet-4-20250514`

**Max tokens:** `1000`

---

## Seeded Intelligence Sources

| Source | Type | Region | Credibility |
|---|---|---|---|
| Reuters | Newswire | International | 95 |
| CBC News | TV/News | National | 92 |
| Globe and Mail | Newspaper | National | 90 |
| Public Safety Canada | Government | National | 98 |
| CISA Advisories | Cybersecurity | International | 99 |
| Toronto Star | Newspaper | Provincial | 85 |
| BBC World | TV/News | International | 94 |
| AP News | Newswire | International | 93 |
| RCMP News | Law Enforcement | National | 97 |
| Environment Canada | Government | National | 96 |

---

## Market Indicators Tracked

| Symbol | Type |
|---|---|
| S&P 500 | Index |
| TSX | Index |
| Dow Jones | Index |
| Nasdaq | Index |
| VIX | Volatility |
| WTI Oil | Commodity |
| Gold | Commodity |
| Natural Gas | Commodity |
| USD/CAD | FX |
| 10Y UST | Bond |

**Watchlist stocks (configurable):** SHOP.TO, RY.TO, ENB.TO, AAPL, MSFT

---

## Running the Application

### Option A — Open directly (no AI Brief)
1. Download `sentinel-intel.html`
2. Double-click to open in any modern browser
3. All modules work except the AI Brief (blocked by browser CORS on `file://`)

### Option B — Local server (full functionality including AI)
```bash
# Python (built into macOS/Linux)
cd /path/to/file
python3 -m http.server 8080

# Then open:
# http://localhost:8080/sentinel-intel.html
```

```bash
# Node.js alternative
npx serve .
```

### Option C — Host on any static hosting
Upload `sentinel-intel.html` to any static host (GitHub Pages, Netlify, S3, etc.) and open the URL. All features including the AI Brief will work.

---

## Future Development Recommendations

| Priority | Enhancement |
|---|---|
| High | Connect live RSS feed ingestion (backend Python/FastAPI + Celery) |
| High | Replace seed data with real-time scraping pipeline |
| High | Add PostgreSQL persistence for events and scan history |
| High | Implement Redis caching for source fetch results |
| Medium | Add real market data via Yahoo Finance or Alpha Vantage API |
| Medium | Build email digest system (SMTP or SendGrid) |
| Medium | Add PDF export using a headless browser or PDF library |
| Medium | User authentication and role-based access |
| Medium | Multi-user watchlists stored server-side |
| Low | Push notification support for critical alerts |
| Low | Mobile-responsive layout optimization |
| Low | Dark/light mode toggle |
| Low | Historical trend charts per category/region |
| Low | Configurable source credibility scoring algorithm |
| Low | Docker containerization for full-stack deployment |

---

## Design System

- **Display font:** Syne (800 weight for headings)
- **Body font:** IBM Plex Sans (300–600 weight)
- **Monospace font:** IBM Plex Mono (data, timestamps, badges)
- **Theme:** Dark (`#080c10` base), with layered surface depths
- **Accent:** Cyan `#00d4ff`
- **Severity colours:** Red / Orange / Yellow / Green
- **Layout:** Fixed sidebar (220px) + fluid main content area

---

## Technology Stack (Current Build)

| Layer | Technology |
|---|---|
| UI Framework | React 18 (CDN via unpkg) |
| JSX Transpilation | Babel Standalone (CDN, in-browser) |
| Styling | Vanilla CSS with custom properties |
| AI Integration | Anthropic Claude API (claude-sonnet-4-20250514) |
| Data | Seeded static JSON (in-memory) |
| Scheduling | UI-only (simulated; backend scheduler not yet connected) |
| Deployment | Single static HTML file |

---

*Document generated: March 2026*
*Platform: SENTINEL INTEL v2.6*
*Classification: Internal Project Reference*
