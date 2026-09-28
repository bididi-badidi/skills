# Router design reference

## Output contract

An `ask-<skillset>` consultation should normally return:

1. **Start with:** the smallest appropriate starting skill.
2. **Then, if needed:** only genuine follow-on skills in order.
3. **Why:** the facts in the user's situation that drive the choice.
4. **Boundary:** the nearest plausible alternative and the deciding distinction.
5. **Before you begin:** prerequisites, approvals, or material side effects.

It should end after the recommendation.

## Full-map skeleton

```markdown
---
name: ask-<skillset>
description: Ask which <skillset> skill fits your situation. Consults and recommends a route without performing the work.
disable-model-invocation: true
---

# Ask <Skillset>

Describe the outcome you need and the state of the work. Recommend the smallest useful route through this collection, explain the decisive boundary, and stop before execution.

## When the starting point is unclear

<Goal-oriented entry points and distinctions>

## <Recognizable user goal or phase>

<Starting skill, follow-ons, and boundaries>

## Response contract

Return the starting skill, optional sequence, rationale, nearest alternative, and prerequisites. Do not begin the selected workflow.
```

## Thin-wrapper skeleton

```markdown
---
name: ask-<skillset>
description: Ask which <skillset> skill fits your situation. Consults the maintained <umbrella> router without performing the work.
disable-model-invocation: true
---

# Ask <Skillset>

Use `<umbrella>` as the maintained source of truth for product and skill selection. Ask only for missing facts that change the route.

Return the best starting skill, genuine follow-ons, rationale, nearest alternative and deciding boundary, and prerequisites. Stop before implementation or configuration.
```

## Classification table

Use a working table while analyzing the collection:

| Skill | Invocation | Starts when | Produces | Before | After | Alternative | Side effects |
|---|---|---|---|---|---|---|---|

The table is an analysis aid. Include it in the generated skill only when it improves consultation.

## Refresh behavior

When updating a router:

- compare the current collection with the router's coverage;
- add, remove, or reclassify routes based on the source skills;
- retain hand-written distinctions that remain supported;
- replace duplicated source detail with delegation where possible;
- never overwrite unrelated user customization silently.

## Anti-patterns

- Alphabetical lists with no decision boundaries.
- Repeating every source skill in condensed form.
- Treating co-location as proof of a workflow sequence.
- Claiming that an explicit-only skill was invoked automatically.
- Beginning implementation during consultation.
- Routing every vaguely related request into the collection.
- Maintaining a second product catalogue when a first-party umbrella router already exists.
