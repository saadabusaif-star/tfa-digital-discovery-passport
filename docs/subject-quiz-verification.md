# Subject Quiz Verification Notes

## Browser checks completed on 26 August 2026

The simplified student flow now displays five visible subject cards: Science, Mathematics, STEM, Physical Education, and Geography. Each card communicates the same three-question progression: **Easy → Medium → Hard**.

The CSS parsing failure in the subject passport styling was removed by rebuilding the global stylesheet with valid declarations. Desktop screenshots of `/`, `/passport`, and `/live` loaded after the repair.

### Completed quiz checks

| Subject | Test participant | Result observed | Live board result |
|---|---|---:|---|
| Science | Previous temporary QA participant | 3/3, 30 points | Verified previously, then removed |
| Mathematics | Remaining Subject QA | 3/3, 30 points | Listed by name |
| STEM | Remaining Subject QA | 3/3, 30 points | Listed by name |
| Physical Education | Remaining Subject QA | 3/3, 30 points | Listed by name |
| Geography | Remaining Subject QA | 3/3, 30 points | Listed by name |

The live board showed the four most recent temporary results for **Remaining Subject QA**, each with the correct subject name, **3/3**, and **30 points**. The temporary verification participant and related completions were then removed. A refreshed live-board check confirmed that no **Remaining Subject QA** rows remained.
