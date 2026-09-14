<div align="center">

# The Rish Times

### *"All the Code That's Fit to Ship"*

**VOL. I — NO. 1** · **EST. 2025** · **LATE EDITION** · **PRICE: FREE**

[**Read the Live Edition →**](https://tzarish.github.io/Rish-Portfolio/)

`React 19` · `Vite 7` · `Tailwind 3.4` · `GSAP 3.13`

</div>

---

## FRONT PAGE

**LOCAL STUDENT PUBLISHES PORTFOLIO, REFUSES TO USE A TEMPLATE**

*Our correspondent reports from the newsroom*

This repository is the complete typesetting of **Rishabh Rohira's** personal
portfolio — a single-page React application built to read like a broadsheet
newspaper rather than a résumé. Serif masthead, column rules, kickers, issue
numbers, and a crosshair cursor that hunts down anything clickable.

Every section is an editorial department. The projects are the wire stories.
The skills are the index. The opinions are the op-eds. This was a deliberate
choice: a portfolio should be *read*, not skimmed.

---

## DEVELOPING STORY

> **The Ultimate Hub for the Repairability of your Devices**
> *Story developing — architecture and data sourcing in progress*

The current front-page lead, and the only entry here that is not finished.
What began as a repairability lookup is growing into a public archive of
**EPREL** device data — the EU's product registry — capturing both current
and historical records.

The thesis is simple: the registry is public but *mutable*. Entries are
revised, superseded, and quietly withdrawn, and nothing preserves what a
manufacturer claimed last year against what it claims today. An archive that
remembers turns scattered regulatory filings into a queryable history for
journalists, researchers, and right-to-repair advocates.

Repairability stays the way in for general users. The paper trail is the point.

---

## THE WORKS

| № | Story | Desk | Edition |
|:--|:------|:-----|:--------|
| I | [Local Student Rebuilding School Website That Actually Works](https://decax-studios.github.io/CTE-Website/) | Technology | Spring 2025 |
| II | [Collaborative Mock Japanese Restaurant Website](https://tzarish.github.io/Fuji-Kitchen/) | Technology | Fall 2025 |
| III | [A Clothing Brand So Niche That It Only Exists on the Internet](https://tzarish.github.io/Urban-Pulse-Streetwear/) | Design | Fall 2025 |
| IV | [Jamstack: You're Worth Serving For](https://tzarish.github.io/Jamstack/) | Opinion | Winter 2025 |
| V | [A Simulated Reality Experience of Alternate Futures](https://tzarish.github.io/Life-Simulator-Decision-Maker/) | Gaming | Fall 2026 |
| ★ | [The Ultimate Hub for the Repairability of your Devices](https://planned-modernity-2.vercel.app/) | **Special Edition** | **Ongoing** |

---

## THE SKILL INDEX

**Front-End** — React · Tailwind CSS · JavaScript · Vite · Bootstrap · jQuery · UI/UX Design

**Tooling** — Git · Figma · VS Code · Chrome Dev Tools · API Integration · Codepen · npm

**Soft Skills** — Leadership · Team Building & Coordination

*Currently filing dispatches from freshman year and a year-long cybersecurity
fellowship. The security desk is new; expect the beat to widen.*

---

## THE PRESS ROOM

*How to run the presses locally.*

```bash
git clone https://github.com/tzarish/Rish-Portfolio.git
cd Rish-Portfolio
npm install
npm run dev          # dev server with hot reload
```

**Going to print:**

```bash
npm run build        # typeset into dist/
npm run preview      # proof the printed edition before it ships
npm run deploy       # push dist/ to the gh-pages branch
npm run lint         # copy-edit pass
```

---

## TECHNICAL SPECIFICATIONS

```
src/
├── main.jsx           React root. Mounts the paper.
├── Hero.jsx           The entire edition — masthead nav, landing,
│                      Developing Story, The Works, Skill Index,
│                      Editorial, Letters to the Editor.
├── TargetCursor.jsx   GSAP crosshair cursor that snaps to
│                      anything marked .cursor-target
├── TargetCursor.css   Cursor corner brackets and dot
├── App.css            Keyframes: blink, cursor-blink, fadeIn, slideDown
└── index.css          Webfonts, resets, Tailwind entry point
```

**Typefaces** — [Chomsky](https://fonts.cdnfonts.com/css/chomsky) for the
masthead, [Bigshot One](https://fonts.google.com/specimen/Bigshot+One) for
everything else. Both loaded over the wire; the app waits on
`document.fonts` before revealing the name so the masthead never flashes
in a fallback face.

**Palette** — amber and newsprint. `amber-50` through `amber-950`, no exceptions.

**Motion** — the name types itself in on load, the taglines cycle on a
typewriter loop, and sections fade up on scroll. The native cursor is hidden
site-wide in favour of the crosshair.

---

## CORRECTIONS & CLARIFICATIONS

*A standing notice to the editor, from the editor.*

**The live edition is not built from `main`.** `npm run deploy` compiles
whatever is in your **local working tree** and pushes the result to the
`gh-pages` branch. It does not read from GitHub. This means the deployed site
and `main` can silently drift apart — and once did, by four files.

**Before deploying, confirm your source is committed and pushed:**

```bash
git status           # must be clean
git push origin main
npm run deploy
```

**A note on `npm run update`:** the script runs `git add .` and pushes, but
never commits in between. Commit first, or it pushes nothing.

---

## EDITORIAL

> *"Clean code is a love letter to your future self."* — On craft

> *"Design is communication."* — On aesthetics

> *"Ship it, then make it perfect."* — On momentum

---

## LETTERS TO THE EDITOR

Corrections, commissions, and cold emails all welcome.

[**GitHub**](https://github.com/tzarish) · [**LinkedIn**](https://www.linkedin.com/in/rishabh-rohira-5a933b366) · [**Email**](mailto:rrohira93@gmail.com)

<div align="center">

---

**Love Always, Rishabh Rohira**

*EST. 2025*

</div>
