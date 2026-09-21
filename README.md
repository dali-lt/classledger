# ClassLedger

A lightweight student management app for teachers and private tutors — keep track of your students, their levels, enrollment dates, and notes, all in one place.

Built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step, no backend. All data is stored locally in the browser using `localStorage`.

## Features

- **Student list** — add, edit, and delete students
- **Fields per student**: first name, last name, level (grade 7–9 / lycée 1–4), start date, optional end date, optional notes
- **Search & filter** — find students by name or by level
- **Calendar view** — see start/end dates on a monthly calendar, color-coded, with a day-by-day event list
- **Bilingual UI** — switch between English and Arabic (Tunisian) with one click; all content, dates, and level names adapt automatically
- **Light, responsive design** — works on desktop and mobile
- **No sign-up, no server** — your data stays in your own browser

## Getting started

1. Download the three files: `index.html`, `style.css`, `script.js` (keep them in the same folder).
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. Start adding students — that's it.

### Using GitHub Pages (optional)

If you push this repo to GitHub, you can enable **GitHub Pages** (Settings → Pages → deploy from the `main` branch) to get a public link to the app without needing to download anything.

## Data & privacy

All student data is stored **locally in your browser** via `localStorage` — nothing is sent to any server. Clearing your browser data or switching browsers/devices means the data won't carry over, since there is no cloud sync (yet).

## Tech stack

- HTML5
- CSS3 (custom properties, flexbox, grid)
- Vanilla JavaScript (no dependencies)
- Google Fonts (Tajawal)

## Roadmap

- [ ] Payment / fees tracking per student
- [ ] Export student list (CSV / PDF)
- [ ] Dark mode toggle

## License

Free to use and modify for personal or educational purposes.
