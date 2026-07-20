---
title: "How We Replaced 100 Hours of Manual Work with a 15-Minute AI Pipeline"
description: "How Etours Labs replaced 100 hours of manual supplier-data extraction with a 15-minute AI pipeline using Claude and Qwen."
pubDate: 2026-07-08
heroImage: "/images/blog/etours-ai-normalization-case-study-banner.webp"
heroImageThumb: "/images/blog/etours-ai-normalization-case-study-thumb.webp"
ogImage: "/images/blog/etours-ai-normalization-case-study-og.jpg"
---

_By Tom Claudio, Co-founder, Etours Labs_

_This is the business case study. For the architecture, model choices, and trade-offs behind the pipeline, see the technical companion: [100 hours to 15 minutes: The technical decisions behind the pipeline](/blogs/etours-ai-normalization-technical/)._

Filipinos love to travel abroad. Not just love — they prefer it. International trips feel like better value for money compared to domestic ones, and the numbers back that up. In 2025, Filipino outbound departures hit 10.2 million trips, up from just 1.5 million in 2020. By 2030, that number is forecast to reach 16.2 million (Euromonitor International, 2025).

That growth created a gold rush for travel agents and tour operators. New wholesalers entered the market offering joiner tours across East Asia. The opportunity was real. The problem was that nobody had figured out how to actually manage the information that came with it.

## The Problem

UOS Travel is one of the biggest wholesalers operating in the Philippines, with a concentration of products across East Asia. For travel agents like Etours, UOS is a key supplier. What they offer, we sell.

But here is how UOS shared their products with us. PDF flyers. JPEG images. A spreadsheet for schedules not built to be read by software. No API. No structured data feed. Just files in their proprietary platform that gets updated every day.

New products got added. Slots sold out, sometimes within minutes. Prices changed. The only way to know what was current was to check the platform, cross-reference the spreadsheet, and read through each PDF one by one. At peak, that meant navigating over 1,000 rows of schedules alongside 200 or more product files.

Every day, a staff member would sit down and manually extract product information from those files and prepare it to sell. We timed it. One product took 30 minutes to extract and organize. At 200 products, that is 6,000 minutes, or roughly 100 hours of work before a single product was ready.

With an average of 8 new products arriving from the supplier every day, the math was brutal. By the time staff finished extracting yesterday's batch, today's products were already selling out. The extraction work and the selling window were in direct competition, and extraction was always losing.

That is not a staffing problem. That is a systems problem.

## Why It Was Hard

The files were built for human eyes, not machines.

Each flyer was a designed artifact. Branded layouts, product information embedded in images, no consistent structure across files. Standard text extraction libraries could not parse them reliably because there was nothing reliable to parse. Every supplier, sometimes every product, had a different visual layout.

Spreadsheets can be worse in a different way. It looked structured but was not built to be consumed by software. Column headers shifted. Merged cells broke parsing. There was no schema.

We also discovered conflicts in the data. Information in a PDF sometimes contradicted the spreadsheet. Old flyers with outdated details stayed in the drive. There was no single source of truth.

And once we decided to build an automated solution, a new difficulty appeared. Testing and refining the AI extraction to get consistently correct output took longer than building the pipeline itself. Getting from "it works in testing" to "it works reliably in production" was a bigger gap than expected. A model version update could silently break output formatting. Small inconsistencies in supplier files that looked minor to a human caused failures downstream.

The real engineering work in an AI system turned out to be the _evaluation_, not the code.

## What We Built

We built an automated pipeline that takes unstructured supplier files and turns them into clean, structured product data ready to publish on the website.

The pipeline does four things. It retrieves PDFs and flyers from the supplier's Google Drive or scrapes directly from their portal. It extracts product information from image-heavy files using AI vision. It normalizes the extracted data into a consistent structured format, which lets us sell the products across different channels. Then it runs on a schedule, every day, without anyone pressing a button.

The first full run processed the entire existing catalog. After that, only new or updated files get processed, keeping things current without reprocessing everything each time.

We used two AI models, each doing what it is best at. Claude Sonnet with vision handled the extraction pass, reading raw PDFs that standard libraries could not touch. Qwen handled the normalization pass, taking the extracted text and turning it into clean structured JSON. Python stitched the pipeline together and a cron job ran it on schedule.

We also built in layers of validation. If the system was not confident in its output, it flagged the record for human review instead of publishing it automatically. Because AI can do a lot, but it cannot be held accountable. Someone still has to be.

## The Result

First full run, 200 products and 800 schedules processed in 15 minutes.

Daily delta runs for new additions take about 2 minutes.

The previous manual time for the same volume was over 100 hours.

Staff are no longer extracting data. They are selling. The catalog is live and current at etours.ph/international-tours.

## What We Learned

**Eval is the actual work.** Building the pipeline took days. Getting the output to production quality took longer. Most of that time was prompt refinement, not code. This was the first AI feature I shipped to production beyond a proof of concept, and the distance between those two things was larger than I expected.

**AI output is probabilistic. Your system cannot be.** Even after extensive refinement, output was still inconsistent at times. The answer was not to keep chasing perfect extraction. It was to add validation layers that caught low-confidence output and escalated it to a human. Human-in-the-loop is not a fallback for a broken system. It is a design decision for a responsible one.

**Logs are not optional in an AI pipeline.** We used logs to monitor system behavior in production. But they also became the primary material for further improvement. Patterns in failures pointed directly to where prompts needed adjustment. Logging is how the system gets better after launch.

**Know what kind of system you are building.** This is not an agentic system. There is no AI making decisions on its own. It is a deterministic pipeline with AI doing specific, bounded tasks. That distinction matters because the failure modes are completely different. Agentic systems need a different level of testing, observability, and trust. We did not need that here, and building it anyway would have been over-engineering.

**AI coding tools need a senior engineer in the room.** I used Claude Code throughout development. The speed is real. But it over-engineered simple tasks, made architectural choices that would have compounded into technical debt, and produced complicated solutions where simple ones would do. The AI coding agent does not know your system's constraints or what good enough looks like for this stage of the product. You still need the engineer to catch that.

**The hardest question is not technical.** It is easier than ever to build features. That does not mean the features you build add value. In tech it is easy to fall in love with what you made. But the only question that matters is whether the customer wants it and whether it moves the business. This project moved the business. But that question should come first, before any code gets written.

## What We Would Do Differently

On the technical side, we would resist the pull toward a more sophisticated architecture earlier than needed. The pipeline works. Premature complexity is still premature.

On the business side, the smarter move would have been to negotiate data access with the wholesaler upfront. Plain text exports, a structured feed, anything machine-readable. If we had that, we would not need vision models at all. Simpler pipeline, lower cost, less to go wrong. The technical solution we built was necessitated by a business relationship we did not fully leverage. That is worth fixing before we scale this to other suppliers.

## Reference

Euromonitor International. (2025). _Tourism flows in the Philippines_. Passport.

_The live output of this pipeline is at etours.ph/international-tours. For the engineering details behind it, read the technical companion: [100 hours to 15 minutes: The technical decisions behind the pipeline](/blogs/etours-ai-normalization-technical/). Tom Claudio is a Software Engineer, AI Engineer, and Technical Founder with 16 years of experience. He is the co-founder of Etours Labs and available for short-term contracts. See his work at t0mclaudio.github.io._
