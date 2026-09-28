---
name: make-skill-router
description: Create or refresh an explicit ask-skillset consulting skill that routes users among an installed collection of skills. Use when a user wants a decision map for a skill pack, not when they already know which skill to use.
---

# Make Skill Router

Create a user-invoked consulting skill named `ask-<skillset>`. The router helps a user choose a route through an installed skill collection and stops before performing the recommended work.

Read [references/router-design.md](references/router-design.md) before writing the router.

## Establish the collection

Resolve the named skillset from the path, plugin, repository, manifest, or installed-skill location the user supplied. If the user supplied only a collection name, search the available installed skills and plugin metadata before asking for a path.

Define the collection boundary explicitly. Include skills maintained as part of the pack and closely coupled companion skills; do not absorb every skill that merely shares a technology word.

Read every in-scope `SKILL.md` completely, plus invocation metadata and only the references needed to understand routing. Do not classify from folder names alone.

## Build the decision model

For every skill, capture:

- starting situation and promised outcome;
- explicit-only or model-invoked status;
- prerequisites and meaningful side effects;
- predecessor, successor, and standalone roles;
- nearest alternatives and the deciding boundary;
- whether it is an umbrella router for the collection.

Organize the model around user goals and workflow phases. Preserve distinctions the source skills make; do not invent unsupported sequences.

## Choose the router form

If the collection has a maintained umbrella skill that already performs product or workflow discovery, create a thin wrapper. The wrapper should consult that source and explain the recommended route without copying its catalogue.

Otherwise create a full decision map. Group skills by the situations users recognize, identify the best starting points, show genuine follow-on sequences, and resolve likely points of confusion.

## Write the skill

Create or update:

```text
ask-<skillset>/
├── SKILL.md
└── agents/
    └── openai.yaml
```

Use the target repository's skill location and manifest conventions. Prefer updating an existing router in place. Preserve unrelated metadata and user edits.

The generated `SKILL.md` must:

- use `name: ask-<skillset>` and a discriminating consultation description;
- be explicit-only in every invocation format supported by the host;
- state that it recommends and stops before implementation;
- start from user situations rather than an alphabetical inventory;
- distinguish advice to invoke an explicit skill from loading a model-invoked reference skill;
- name the best starting skill, relevant follow-ons, rationale, nearest alternative, and decisive boundary;
- include prerequisites or material side effects when they affect the choice;
- avoid duplicating detailed instructions owned by the source skills.

For Codex metadata, set `policy.allow_implicit_invocation: false`. The `interface.default_prompt`, if present, must explicitly mention `$ask-<skillset>`.

## Verify and report

Check that every in-scope skill is represented in the decision model, even when it does not need a prominent catalogue entry. Confirm that no listed skill is missing, renamed, or attributed capabilities absent from its source.

Run the repository's validator and the Codex skill validator when available. Then test at least these decisions manually:

- a clear single-skill request;
- an ambiguous request with two plausible skills;
- a multi-phase request;
- a request outside the collection;
- consultation that must not begin implementation.

Report the router path, its thin-wrapper or full-map form, the collection boundary, validation result, and any uncertain classifications. Do not install, deploy, configure, or run the routed workflow unless the user separately asks.
