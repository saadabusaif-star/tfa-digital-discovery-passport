# Teacher-Started Class QR Sessions

The student entry page no longer presents a **Teacher** or **Class** selector. A visitor who opens the public URL sees one instruction only: scan the QR code shown by the teacher.

## Teacher workflow

| Step | Teacher action | Student experience |
|---|---|---|
| 1 | Sign in to the protected Control Room. | No staff controls are visible. |
| 2 | Select the current class in **Open one class QR session**. | Nothing is required from students yet. |
| 3 | Show the generated QR code on the teacher device or display. | Students scan the QR code using a tablet or phone. |
| 4 | Students enter only their display name and grade group. | The QR link supplies the assigned class and section automatically. |
| 5 | Open the matching class live-board URL when results are needed. | Names and results are isolated to the selected class board. |

> The student QR destination deliberately does not display a teacher name, class list, or other student data. Invalid or paused class-session links show a request to scan the teacher’s current QR code.

## Verification recorded

At the explicit **390 × 844** phone viewport, the public `/` page showed **Scan your teacher QR** with no class list, while `/?class=1` showed only the display-name and grade-group fields. TypeScript validation and the full Vitest suite passed with **24 tests** after the QR session flow was added.
