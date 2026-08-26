# Student UI Reference Notes

## Supplied navigation reference

The supplied navigation screenshot is **1631 × 140 pixels** and was reviewed in ordered horizontal crops. The left-hand identity treatment reads **ICT WELCOME DAY** above **Discovery Lab**. The student navigation is arranged from left to right as **Subjects**, **My record**, and **Live board**, each paired with a simple line icon. The visual treatment is light, spacious, and separated from the page by a fine lower border.

## Implemented student-experience refinement

The student home page now starts with an actionable UAE-focused learning route and places the supplied-resource **ICT Display Quest** immediately before the core subject studios. The ICT activity remains a separate Welcome Day bonus. Each of the five core subject cards now uses a consistent illustrated studio format: a dedicated subject illustration, a short discovery prompt, the visible Easy–Medium–Hard three-question route, and a clear start action.

The student header now uses direct destinations: **Discovery Lab** anchors to `/#welcome`, **Subjects** anchors to `/#subjects`, **My record** opens `/passport`, and **Live board** opens `/live`. These four controls were clicked and confirmed on the desktop view and an explicitly confirmed **390 × 844** phone viewport. The phone layout was additionally checked for one-column subject studios and compact, readable labeled navigation. Automated validation then passed with TypeScript checks and **19 Vitest tests**.
