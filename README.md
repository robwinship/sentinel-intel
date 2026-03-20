# SENTINEL INTEL — Executive Security Intelligence Platform

A production-ready executive security dashboard. Monitors and summarizes security events by geographic region, tracks financial market indicators, and generates AI-powered executive briefs.

---

## Quick Start (Local Development)

**Prerequisites:** Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## Project Structure

```
sentinel-intel/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Root component, scan logic, email trigger
│   ├── data/
│   │   └── seeds.js          # Constants, seed events, market data, sources
│   ├── services/
│   │   ├── ai.js             # Gemini / Anthropic AI summary generation
│   │   └── email.js          # EmailJS digest delivery
│   ├── components/
│   │   ├── Severity.jsx      # Severity badge
│   │   ├── MktRow.jsx        # Market data row
│   │   └── EvCard.jsx        # Expandable event card
│   ├── modules/              # One file per navigation module
│   │   ├── Dashboard.jsx
│   │   ├── RegionalIntel.jsx
│   │   ├── GlobalIntel.jsx
│   │   ├── MarketMonitor.jsx
│   │   ├── Alerts.jsx
│   │   ├── Watchlist.jsx
│   │   ├── Sources.jsx
│   │   ├── Schedule.jsx
│   │   ├── ScanHistory.jsx
│   │   ├── ExportBrief.jsx
│   │   └── Settings.jsx      # API keys + EmailJS config (stored in localStorage)
│   └── styles/
│       └── app.css
├── index.html
├── vite.config.js
├── package.json
└── .github/workflows/deploy.yml
```

---

## Configuration (In-App Settings)

All credentials are configured via the **Settings** module in the sidebar. They are saved to `localStorage` in your browser — never committed to the repository.

### AI Summary (choose one)

| Provider | Cost | Key Source |
|---|---|---|
| **Google Gemini 1.5 Flash** (recommended) | Free — 1,500 req/day | [aistudio.google.com](https://aistudio.google.com/) |
| Anthropic Claude | Paid | [console.anthropic.com](https://console.anthropic.com/) |

### Email Digest (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/) (200 emails/month free)
2. Create an **Email Service** → copy the **Service ID**
3. Create an **Email Template** with these variables:

| Variable | Description |
|---|---|
| `{{to_email}}` | Recipient address |
| `{{scan_time}}` | Formatted scan timestamp |
| `{{critical_count}}` | Number of CRITICAL events |
| `{{high_count}}` | Number of HIGH events |
| `{{total_events}}` | Total event count |
| `{{ai_summary}}` | AI-generated executive brief |
| `{{top_events}}` | Top 5 events (plain text) |

4. Copy the **Template ID** and **Public Key** (Account → General)
5. Paste all three into **Settings → EmailJS Configuration**
6. Set a recipient email in **Schedule → Email Digest** and enable the toggle

---

## Deployment to GitHub Pages

### Automatic (recommended)

Every push to `main` triggers the GitHub Actions workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds and deploys automatically.

**One-time setup:**
1. Push this repository to GitHub
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push to `main` — your site will be live at:
   `https://your-username.github.io/your-repo-name/`

### Manual Build

```bash
npm run build
# Output is in ./dist — upload to any static host
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Vanilla CSS with custom properties |
| AI (free) | Google Gemini 1.5 Flash REST API |
| AI (alt) | Anthropic Claude API |
| Email | EmailJS (browser SDK) |
| Deployment | GitHub Actions → GitHub Pages |

---

## Roadmap

- [ ] Live RSS feed ingestion (backend Python/FastAPI + Celery)
- [ ] Real-time market data (Yahoo Finance / Alpha Vantage)
- [ ] PostgreSQL persistence for events and scan history
- [ ] PDF export
- [ ] User authentication
- [ ] Mobile-responsive layout
- [ ] Historical trend charts

---

*SENTINEL INTEL v3.0 — Internal Project Reference*
