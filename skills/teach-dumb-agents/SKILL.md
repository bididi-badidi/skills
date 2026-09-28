---
name: teach-dumb-agents
description: Document a hard-won repository workflow as repeatable instructions for a future agent. Use when completed or active work should be preserved under docs/agents/instructions/ and routed from AGENTS.md. Do not use for ordinary user documentation or conversation summaries.
---

# Teach Dumb Agents

Create both:

1. `docs/agents/instructions/<task-name>.md`
2. A routing link from the repository's root `AGENTS.md`

## Recover the procedure

Identify the task's starting state, successful outcome, consequential decisions, and proven failure modes from the conversation and repository.

Read the existing `AGENTS.md` and relevant guides. Update a guide for the same task instead of creating a competing version.

For active work, record discoveries as they emerge. For past work, inspect current evidence without repeating costly or state-changing operations solely for documentation. Separate observed results from proposed steps. Mark incomplete procedures as partial and state what remains unverified.

## Write the guide

Use a descriptive lowercase kebab-case filename based on the reusable task.

Write a procedure, not a conversation recap. Include only what affects execution:

- When the procedure applies and what success looks like.
- Required tools, access, inputs, starting state, and how task-specific values are obtained. Name credentials without recording their values.
- Relevant repository paths and non-obvious constraints, using repository-relative links.
- Steps in dependency order, including working directories, defined placeholders, and meaningful checkpoints.
- Decision branches and proven pitfalls, with their symptoms, causes, and fixes.
- Verification performed, remaining assumptions, recovery guidance, and stopping conditions. Record required authorization without implying that the guide grants it.

Keep each guide focused on one repeatable task. Make the essential sequence self-contained and link to maintained documentation for supporting detail.

## Route it from AGENTS.md

Preserve existing instructions. Add or update one short entry that says when to read the guide and links to it using a path relative to `AGENTS.md`. Create `AGENTS.md` if necessary. Keep the detailed procedure in the guide.

## Completion gate

Before finishing, confirm that a fresh agent could execute the procedure using only its stated inputs and linked repository context, and that all referenced paths, commands, and links are current.

Do not claim the workflow was reproduced unless it was run. Link the guide and `AGENTS.md` in the final response and state whether the procedure is verified or partial. A chat explanation alone does not complete this skill.
