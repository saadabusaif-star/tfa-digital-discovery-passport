# ICT Welcome Day Resource and Question-Bank Notes

## Nine-resource coverage map

All nine supplied resources contribute to the ICT-only Welcome Day experience. The materials are represented through named activities, the supplied-resource library and display language, or question concepts. The Welcome Back poster supplies the visual Welcome Day identity and future-innovator/photo-corner language; it is not treated as an academic worksheet.

| Supplied resource | Learning concepts used | Platform integration |
|---|---|---|
| **ICT Welcome Back Poster A3** | “Welcome Back to School,” “Let’s Learn. Create. Innovate. Together!”, AI and innovation, coding and programming, cybersecurity, robotics and automation, game design and creativity, and digital citizenship | Managed visual in the student resource library; Class of 2040, Tech Wheel, and Photo Corner reinforce its future-technology strands |
| **ICT display poster** | Communication, connections, information sharing, teamwork | ICT Display Quest display concepts and routes |
| **Computing display banner** | Creative computing, digital exploration, immersive/VR learning | ICT Display Quest visual and VR routes |
| **Keyboard Shortcuts display posters** | New, open, save, print, copy, paste, cut, undo, redo, select all, text styling, find, zoom, browser navigation | Keyboard Shortcut Sprint and ICT Display Quest routes |
| **ICT I Can display posters** | Login, program choice, pointer control, typing, touch input, reflection, logoff/shutdown | ICT Foundations and Digital Technology routes |
| **Computing Area Rules posters** | Turn-taking, device care, approved websites, privacy, posture, food/drink safety, respectful shared-device use, reporting concerns | ICT Foundations, ICT Display Quest, and Digital Technology routes |
| **Excel Skills Booklet** | Cells, rows, columns, formulae, functions, data formats, sorting, filtering, charts and chart editing | Excel Skills Lab resources and routes |
| **Excel Pages pack** | Active cell, formula bar, worksheets, ranges, organised data and formulas | Excel Skills Lab routes |
| **Digital Technology or Not? presentation** | Digital technology gets, sends and saves information; classification; input, processing, output; data storage | Digital Technology or Not activity and routes |

## Active ICT-only capacity

The five current student studios use three grade bands: **Grades 6–7**, **Grades 8–9**, and **Grades 10–12**. Every activity/grade-band combination now has **ten unique alternatives at each difficulty level**, giving **ten fully fresh Easy–Medium–Hard routes** before any question must be reused for that activity.

| Active studio | Easy alternatives per grade band | Medium alternatives per grade band | Hard alternatives per grade band | Fresh complete routes per grade band | Total questions across three grade bands |
|---|---:|---:|---:|---:|---:|
| ICT Display Quest | 10 | 10 | 10 | 10 | 90 |
| ICT Foundations | 10 | 10 | 10 | 10 | 90 |
| Keyboard Shortcut Sprint | 10 | 10 | 10 | 10 | 90 |
| Excel Skills Lab | 10 | 10 | 10 | 10 | 90 |
| Digital Technology or Not? | 10 | 10 | 10 | 10 | 90 |
| **Active ICT question-bank total** | — | — | — | — | **450** |

## Dynamic selection and secure scoring

Every session receives exactly one **Easy**, one **Medium**, and one **Hard** question. The route generator selects from the appropriate activity and grade band with a random choice function. Before choosing a question, it removes question IDs that were issued in earlier sessions for the same activity, so a fresh question is selected whenever one is available. The current session’s exact route is then saved before submission; scoring resolves that stored route rather than selecting questions again.

> **Safe exhaustion rule:** after the ten fresh alternatives in one difficulty level have been used, the generator intentionally falls back to a valid previously issued alternative instead of failing, shortening the route, or changing the saved answer key.

Question IDs are index-based. The expansion is therefore strictly **append-only**: existing questions were never reordered, preserving all saved historical-session routes.

## Automated verification

The Vitest question-bank suite now checks every active ICT studio in each grade band for the following requirements:

| Safeguard | Verified requirement |
|---|---|
| Route structure | Exactly three questions in Easy → Medium → Hard order |
| Public payload safety | Correct answer keys are removed before questions are sent to students |
| Capacity | At least 30 questions per active activity and grade band |
| No-repeat window | Ten successive routes contain 30 distinct question IDs before fallback |
| Prompt variety | Each difficulty contributes ten distinct prompts across those ten fresh routes |
| Fallback | A valid three-question route is still supplied only after fresh alternatives are exhausted |

`pnpm check` and `pnpm test` both passed after the school-scale expansion. The suite reports **7 test files and 24 passing tests**; the route-capacity assertions run across all five active studios and all three grade bands.

## Official-logo note

The requested `https://www.firstacademy.org/images/logo-white.png` source is protected by an automated security check in this environment. The header retains the managed TFA logo inside the official logo frame and links to `https://www.firstacademy.org/`. Replacing it with the requested white asset still requires a user-provided source file or successful access through the school website.
