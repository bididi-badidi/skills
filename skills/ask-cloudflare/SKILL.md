---
name: ask-cloudflare
description: Ask which Cloudflare skill fits your situation. A router over the Cloudflare skills in this repo.
disable-model-invocation: true
---

# Ask Cloudflare

You have a lot of Cloudflare skills. This is the map.

Skills are grouped by what you're trying to do. Start from your situation, find the matching skill, and invoke it by name. Every skill listed here is **manual invocation only** — the agent won't reach for them on its own.

## Product discovery

Don't know which Cloudflare product you need? Start here.

- **`/cloudflare`**: the **entry point** when you have a goal but don't know which product serves it. Describe what you're building — an API, an AI agent, a storage layer, a security boundary — and this skill maps requirements to Cloudflare products, then points you at the dedicated skill for the one you pick.

  Use `/cloudflare` first when you're unsure. It's the switchboard; the skills below are the direct lines.

## Building on Workers

The core development loop: write code, configure the project, deploy.

- **`/workers-best-practices`**: production guidelines for Cloudflare Workers. Observability, compatibility dates, runtime anti-patterns. Reach for it when **writing, reviewing, or configuring** a Worker, before you ship.
- **`/wrangler`**: run and troubleshoot Wrangler CLI commands — `wrangler.jsonc` configuration, environment management, secrets, bindings, local dev, deployment. The **tooling** skill; `/workers-best-practices` is the **code** skill.
- **`/durable-objects`**: stateful edge applications with Durable Objects. RPC methods, alarms, WebSocket handling, persistence. Use when your Worker needs **coordinated, persistent state**.
- **`/agents-sdk`**: build stateful AI agents on Cloudflare using the Agents SDK. Agent lifecycles, WebSockets, workflows, MCP client/server integration. Use when the thing you're building is an **AI agent**, not a plain Worker.

## Frameworks

Deploying a framework app to Cloudflare.

- **`/nextjs-on-cloudflare`**: scaffold, migrate, or deploy a Next.js app on Workers with vinext. Start here for any **Next.js + Cloudflare** work. Install vinext's upstream skills (`npx skills add cloudflare/vinext`) if missing.

## Sandbox

Three skills form a progression. Pick the one that matches where you are.

- **`/sandbox-stable`**: build or maintain apps on the current stable `@cloudflare/sandbox` package. **Start here** for new Sandbox work unless you've been told to use the preview.
- **`/sandbox-next`**: build or maintain apps on `@cloudflare/sandbox@next` (SDK 1.0 preview). Use when you're **already on the preview** or starting fresh on it.
- **`/sandbox-migrate-to-next`**: migrate an existing stable Sandbox app to the 1.0 preview. The **bridge** between the two above.

## Security and bot protection

- **`/turnstile-spin`**: integrate, fix, or migrate Cloudflare Turnstile CAPTCHA verification — frontend widget and server-side siteverify. Use when you need **bot protection** on a form or login.
- **`/security-audit`**: security guidance and vulnerability review for codebases, APIs, and services. Not Cloudflare-specific, but lives here because it pairs naturally with Workers deployments. Use for **focused reviews** or **full pen-test audits**.

## Zero Trust and networking

- **`/cloudflare-one`**: design, configure, troubleshoot, or review Cloudflare One Zero Trust and SASE deployments — Access policies, Gateway rules, Tunnels, WARP clients. The **operating** skill.
- **`/cloudflare-one-migrations`**: plan a migration **to** Cloudflare One from an existing VPN, SWG, or SASE platform (Zscaler, Palo Alto, etc.). Policy mapping, parity gaps, staged rollout. The **migration** skill. Use `/cloudflare-one` once you're operating.

## Email

- **`/cloudflare-email-service`**: implement or troubleshoot Cloudflare Email Sending and Email Routing. Domain onboarding, Workers bindings, REST API configuration.

## Performance

- **`/web-perf`**: audit, diagnose, or optimise website loading and interaction performance, Core Web Vitals, and Lighthouse scores. Not Cloudflare-specific, but useful after deploying to Workers or Pages.

## Decision tree

When the category isn't obvious, walk this:

1. **Do you know which Cloudflare product you need?**
   - **No** → `/cloudflare` (product discovery)
   - **Yes** → continue

2. **What are you building?**
   - A Worker → `/workers-best-practices` + `/wrangler`
   - A stateful Worker → add `/durable-objects`
   - An AI agent → `/agents-sdk`
   - A Next.js app → `/nextjs-on-cloudflare`
   - A Sandbox app → `/sandbox-stable` or `/sandbox-next`

3. **What are you protecting?**
   - A form from bots → `/turnstile-spin`
   - A network / org → `/cloudflare-one`
   - Migrating from another vendor → `/cloudflare-one-migrations`
   - Code itself → `/security-audit`

4. **What are you configuring?**
   - Email → `/cloudflare-email-service`
   - Performance → `/web-perf`
   - Wrangler / deployment → `/wrangler`
