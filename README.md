# Cell Engineering & ImmunoMedicine

Static site for the group of Professor Cheng DONG, Department of Biomedical
Engineering, The Hong Kong Polytechnic University.

The group covers four faculty — Prof. Cheng Dong (Chair Professor, group lead)
and three principal investigators: Prof. Yun Chang, Dr Man Ting Au and
Dr Bingyang Dai. Research is organised by scientific theme rather than by
investigator, so the site reads as one group rather than three labs.

Built with [Astro](https://astro.build). No database, no server — the build
produces plain HTML/CSS that can be hosted anywhere, which is deliberate. See
[docs/DEPLOY.md](docs/DEPLOY.md) for why.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/ locally
```

Node 20 or newer.

## Where things are

```
src/
  config.ts              Group name, lead PI details, navigation, homepage
                         statement.
                         Start here — most "can you change X" requests live here.
  content.config.ts      Schemas for the content collections below.
  content/
    publications.yaml    All papers, one file.
    people/*.md          One file per member. `role: director` is the group
                         lead; `role: pi` are the principal investigators.
    news/*.md            One file per item.
    research/*.md        One file per research area.
    openings/*.md        One file per advertised position.
  pages/                 One file per route.
  components/            Shared pieces (Header, Footer, Publication, …).
  layouts/Base.astro     HTML shell, metadata, fonts.
  styles/global.css      Design tokens and base styles. All colour and type
                         decisions are here, as CSS custom properties.
public/                  Images and static files, served from the site root.
```

## Editing content

Content lives in Markdown and YAML, not in the templates. Lab members can edit
it through the GitHub web interface without installing anything — see
[docs/EDITING.md](docs/EDITING.md) (中文).

## What still needs filling in

See [docs/CONTENT-TODO.md](docs/CONTENT-TODO.md). Placeholders are marked `TODO`
throughout the content files; grep for them:

```bash
grep -rn "TODO" src/content src/config.ts
```

## Design notes

- Fonts are self-hosted via `@fontsource` rather than loaded from Google Fonts,
  so the site works from mainland China.
- One accent colour (`--accent`, a deep red that nods to the PolyU mark), hairline
  rules, and generous whitespace. Adding a second accent will break the look.
- The homepage follows the reference sites' formula: one question, one sentence
  of method, one link. Resist adding more.
- Research is organised by theme, not by person. Each theme deliberately spans
  more than one investigator — that is what stops the site reading as three
  separate labs sharing a domain.
