---
title: "The One Thing OpenRouter Is Missing That Keeps Me on Three Providers"
description: "OpenRouter promises a single API for all your LLM calls. Here is the one gap that makes that impossible in production."
pubDate: 2026-07-16
heroImage: "/images/blog/openrouter-batch-gap-banner.webp"
heroImageThumb: "/images/blog/openrouter-batch-gap-thumb.webp"
ogImage: "/images/blog/openrouter-batch-gap-og.jpg"
---

## The Promise

OpenRouter pitches itself as the last API integration you ever need to write. One endpoint, one API key, one bill, and access to hundreds of models from Anthropic, Together, Mistral, and more. For anyone managing a multi-provider AI stack, that is a genuinely attractive offer.

I evaluated it seriously. The conclusion was that it almost works.

## Router vs Abstraction Layer

Before getting into what is missing, it is worth defining two terms that get used interchangeably but mean very different things.

A **router** is a single gateway that sits between your system and multiple LLM providers. You connect to the router, the router connects to Anthropic, Together, OpenAI, and whoever else. One API key. One billing relationship. The router manages everything behind it.

An **abstraction layer** is a different animal. Tools like LiteLLM give you a unified code interface, but you still maintain direct connections to each provider. You still hold separate API keys for Anthropic, Together, and OpenAI. LiteLLM simplifies what you write, but it does not centralize your billing or your vendor relationships. You are still managing three accounts. You are just writing less code to talk to them.

OpenRouter is a router. LiteLLM is an abstraction layer. The distinction matters because they solve different problems, and they have different failure modes.

## What OpenRouter Does Well

OpenRouter's coverage is real. It exposes an OpenAI-compatible endpoint at `/api/v1/chat/completions`, which means any code already written for the OpenAI SDK can reach hundreds of models with a base URL change. No new SDK. No new request format.

It also offers a BYOK (bring your own key) mode where you supply your own provider keys, and OpenRouter charges nothing on the first one million requests per month. Beyond that threshold, it takes a 5% cut. At the volume I am running, roughly 6,000 products per month, BYOK is effectively free.

The reliability numbers are reasonable. OpenRouter has measured 99.99% uptime over recent 90-day windows, though there have been three outages in the past eight months running 35 to 50 minutes each. There is no published SLA.

## The Gap

OpenRouter does not support a Batch API. It is explicitly listed as an unsupported operation. This is not a documentation oversight. It is a structural limitation of how OpenRouter works. It normalizes requests across providers using a real-time chat completions interface. There is no asynchronous job endpoint. There is no way to submit a batch and wait.

This matters because Anthropic's Message Batches API gives you 50% off all Claude pricing for requests that can wait up to 24 hours. For a document processing pipeline where latency is not a constraint, that discount is real money.

The savings also stack. Batch requests are eligible for prompt caching, and the cache discount stacks with the 50% batch discount. Combined with cache hit pricing of 10% of base input tokens, the effective input price for cached prefixes can fall to roughly 5% of the standard rate. Routing the same traffic through OpenRouter forfeits all of that.

## What It Costs in Production

My pipeline has two passes per product. Pass 1 converts a PDF to markdown using Claude Sonnet 4.6. Pass 2 converts that markdown to structured JSON using Qwen3.6-plus via Together. The numbers below come from real production data across 227 processed products.

**Per-product cost**

|                                            | Pass 1 (Claude) | Pass 2 (Qwen) | Total   |
| ------------------------------------------ | --------------- | ------------- | ------- |
| Current: Anthropic Batch + Together direct | $0.0327         | $0.0189       | $0.0516 |
| OpenRouter BYOK                            | $0.0654         | $0.0189       | $0.0843 |
| OpenRouter pay-as-you-go                   | $0.0690         | $0.0199       | $0.0889 |

Pass 2 barely moves. Qwen on Together was already running synchronously, so OpenRouter changes nothing there. Pass 1 doubles because there is no batch endpoint to route it through.

**Monthly cost at 200 products per day**

| Scenario                             | Monthly cost | vs. current     |
| ------------------------------------ | ------------ | --------------- |
| Current (Anthropic Batch + Together) | $309         | —               |
| OpenRouter BYOK                      | $506         | +$196/mo (+63%) |
| OpenRouter pay-as-you-go             | $533         | +$224/mo (+72%) |

At current volume, moving entirely to OpenRouter costs an extra $2,350 to $2,700 per year. Every dollar of that increase comes from one place: losing the batch discount on Pass 1.

## The Decision

A full migration to OpenRouter is not the right call. The Anthropic Batch API is doing real work in the current setup, and OpenRouter has no equivalent.

The more useful framing is to treat OpenRouter as the right tool for synchronous, non-batch traffic, while leaving batch processing on direct Anthropic. This is what a partial pilot would look like: route Pass 2 (Qwen), the legacy extractor, and the content services through OpenRouter via BYOK, and leave the batch extractor untouched. At under 1M requests per month, the BYOK tier costs nothing on top of what is already being paid to the underlying providers.

That is an operational simplification, not a cost win. One fewer API key to manage, one fewer billing dashboard to check for part of the stack. Whether that is worth the migration effort depends on how much the vendor sprawl is actually bothering you.

For now, three providers it is.

![Current setup with two direct paths versus a proposed hybrid setup that keeps the batch path direct to Anthropic while routing everything else through OpenRouter](/images/blog/openrouter-batch-gap-diagram.webp)

---

_Tom Claudio is a Software Engineer, AI Engineer, and Technical Founder with 16 years of experience building systems. He writes about architecture decisions, infrastructure trade-offs, and the practical realities of shipping AI products at [t0mclaudio.github.io](https://t0mclaudio.github.io)._
