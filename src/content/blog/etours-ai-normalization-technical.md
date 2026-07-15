---
title: "Building the Pipeline That Reads What Humans Stopped Reading"
description: "The technical companion: architecture, model choices, and trade-offs behind the Etours Labs AI data pipeline."
pubDate: 2026-07-09
---

*By Tom Claudio, Co-founder, Etours Labs*

*This is the technical companion to [How We Replaced 100 Hours of Manual Work with a 15-Minute AI Pipeline](/blogs/etours-ai-normalization-case-study/). That article covers the business problem and outcome. This one covers the decisions, the trade-offs, and the things I would do differently.*

## The Constraint That Shaped Everything

Before any architecture decision, there was one constraint that mattered more than the others. We needed to ship fast. Not "fast" as in cutting corners. Fast as in the business was bleeding while staff manually extracted product data from PDF flyers, and every week we delayed was a week of lost sales.

That constraint killed a lot of good ideas before they started. It also forced better decisions than I would have made with unlimited time.

## The Pipeline Architecture

At its core, the system does one job. It takes a supplier's unstructured files and turns them into clean structured data that a website can actually use.

The pipeline runs in sequence. A scraper retrieves PDFs and flyers from the supplier's Google Drive or portal. An extractor reads those files using AI vision and converts them to markdown. A normalizer takes that markdown and converts it to structured JSON. A validator checks the output against business rules. A normalizer then writes trusted records into the CMS. After that, an analyst detects what changed, a content step drafts social media posts, and a digest emails the team a daily summary.

Seven steps. Each one is its own Django management command, so any step can be re-run independently without touching the others. That decision saved a lot of time during debugging.

The whole thing runs on a cron job at midnight Philippine time, so the catalog is current by the time the team starts work in the morning.

## The AI Decisions

This is the part that took the most iteration.

**Why two models instead of one**

The first version used Claude Sonnet for everything. Extract the PDF, normalize the output, done. It worked. It was also expensive, and running a frontier vision model on a normalization task that does not need vision is like hiring a surgeon to take your blood pressure.

The second version went the other way. I tried using Qwen, Haiku, and Gemini for the extraction pass. The problem was that the supplier PDFs were image-heavy, designed artifacts with no plain text. Models without strong vision capability failed on exactly the files that mattered most.

The third version introduced a three-pass architecture. Qwen for extraction as the first attempt, escalate to Claude Sonnet if confidence was low, then Qwen again for normalization. The idea was sound but the eval work to calibrate the confidence thresholds was adding complexity faster than it was adding value.

The current version is two passes. Claude Sonnet with vision for extraction, where the capability gap is real and the cost is justified. Qwen via Together AI for normalization, where the input is already semi-structured markdown and a cheaper model does the job cleanly. The split is not about preference. It is about matching the right tool to the actual difficulty of each step.

**Why the confidence escalation got simplified**

In theory, tiered escalation is elegant. In practice, every threshold you set is a number you have to defend with eval data. When we tightened prompts enough that Pass 1 accuracy improved significantly, the three-pass logic started feeling like insurance we were paying for but rarely needed. We cut it. The system is simpler and the eval burden dropped with it.

**Why human-in-the-loop is a design decision, not a fallback**

AI output is probabilistic. A pipeline that publishes to a live website cannot be. The validator flags records with low confidence or failed business rules as needs review. Those records do not go to the website. They go to a human.

This is not a temporary measure until the AI gets better. It is a permanent feature of how the system works. AI can process 200 products in 15 minutes. It cannot be held accountable for what it publishes. Someone has to be. The system design reflects that.

**Why this is not an agentic system**

There is a lot of excitement right now about agentic AI, where models make their own decisions about what to do next. This is not that. Every step in the pipeline is deterministic. The AI does specific, bounded tasks at specific points and hands off to the next step. It does not decide what to scrape, what to publish, or what to do when something goes wrong. The orchestrator does.

That was a deliberate choice. An agentic system would have required a completely different level of testing and observability, and we needed to ship. A deterministic pipeline sprinkled with AI in the right places was the right call for this stage.

## The Software Engineering Decisions

**Why Django and not something more exciting**

Django is boring in the best way. ORM, admin, migrations, management commands, all in one place. For a system that needed to ship fast and be maintainable by a small team, a boring monolith was the right call. No separate API service. No microservices. One repo, one deploy, one place to look when something breaks.

**Why a provider-agnostic AI client**

Early on I built a thin abstraction layer over the AI providers. Every pipeline step calls the same interface and gets back the same response object regardless of whether Anthropic or Together AI is responding. Swapping models is a single environment variable change.

This paid off multiple times. When Qwen deprecated a model version, the migration was a config change. When I wanted to test a different model on a specific step, I did not touch pipeline logic. Build the abstraction early even if it feels like over-engineering. It is not.

**The struggle with memory**

Render's starter plan has memory limits. Processing 200 PDFs in a single run hit those limits. The fix was batching, processing files in chunks instead of loading everything into memory at once. But batching introduced a new problem. If a batch failed midway, the next run needed to know which files had already been processed. We solved this by tracking PDF hashes. If a hash already existed in the database, skip it. Simple, but it took an embarrassing amount of time to get right.

**The struggle with context windows**

Large PDFs pushed against model context limits. The fix was PyMuPDF to inspect and chunk PDFs before sending them to the vision model. This also meant the extractor needed to handle partial extractions gracefully, merging chunks without duplicating or losing content. Another thing that sounds simple and is not.

**Why not a state machine**

Here is the honest answer. I should have built a state machine. A proper state machine would have made the pipeline's status transitions explicit, testable, and easier to reason about. Each record moves through states: scraped, extracted, validated, normalized, published, needs review. Instead, those states are implicit in a combination of boolean flags and timestamp fields across a few models.

It works. It is also harder to follow than it should be, and adding a new state requires touching multiple places. If I started today, I would model it as a proper state machine from the beginning. I knew about state machines when I built this. I chose speed over correctness and I lived with the trade-off. That is a system design decision, not a coding mistake.

**Why I did not optimize the database tables**

At some point during the build I looked at the data model and thought about denormalizing some tables for query performance. Then I remembered the quote. Premature optimization is the root of all evil. The queries are fast enough for the current load. The schema is readable. Optimizing now would make the system harder to change and easier to break, in exchange for performance gains we do not need yet. The tables stay as they are until there is a real reason to change them.

## What the Logs Taught Me

I added logging because it is good practice. I kept improving it because the logs became the most useful thing in the system.

When extraction failed on a specific PDF, the logs told me which prompt instruction was ambiguous. When output was inconsistent across similar files, the logs showed the pattern. When a model version update silently changed output formatting, the logs caught it before the validator did.

In an AI pipeline, logs are not just for debugging. They are how the system teaches you where the prompts need work. Treat them as first-class output from day one.

## It Is Not a Perfect Product

The place resolution for international destinations is still unreliable. The system auto-creates geographic records from AI-extracted destination names, and AI is not great at mapping colloquial place names to official hierarchies. It works well enough but it is a known weak point.

The second wholesaler integration is not yet fully automated. The first supplier took months to get right. The second one is being processed partly by hand while the pipeline design for it gets figured out. That is fine. Shipping something that works for one supplier is better than designing the perfect multi-supplier system that ships six months late.

Category filtering is extracted by the AI but never wired into the website's filter UI. The data is there. The feature is not. That is a backlog item, not a gap in the pipeline.

## What I Would Build Differently

A proper state machine for record status transitions, built from day one.

A richer eval framework earlier in the process. We built evaluation discipline over time but it would have saved weeks if it had been there from the first prompt.

On the business side, the smarter move would have been negotiating plain text data access with the supplier before writing a single line of code. The entire vision model requirement exists because we did not do that. The most expensive technical decision in this project was a business conversation that did not happen.

## The Actual Lesson

The pipeline works. It processes in 15 minutes what used to take 100 hours. It runs every day without anyone pressing a button. Staff are selling instead of extracting.

But the thing I keep coming back to is simpler than any of the technical decisions. The gap between a proof of concept and a production system is mostly eval work, prompt refinement, and handling the edge cases you did not know existed until real data showed up. The code is the easy part. The hard part is making it reliable enough that you trust it with something that matters.

Anyone can build a demo. Shipping it is the different thing.

*Read the business case for this project: [How We Replaced 100 Hours of Manual Work with a 15-Minute AI Pipeline](/blogs/etours-ai-normalization-case-study/). Tom Claudio is a Software Engineer, AI Engineer, and Technical Founder available for short-term contracts. See his work at t0mclaudio.github.io.*

## Reference

Euromonitor International. (2025). *Tourism flows in the Philippines*. Passport.
