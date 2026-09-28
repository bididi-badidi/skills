# AI Skills Repository

A versioned collection of reusable AI-agent skills designed for coding assistants and agentic workflows, modeled after Matt Pocock's skills repository architecture.

## Overview

This repository distributes curated, modular skills for AI agents (such as Claude Code, Antigravity, and other compatible coding assistants). Each skill defines triggers, structured procedures, and constraints that enable agents to execute specialized workflows reliably.

## Installing & Consuming

### Via `npx` (Recommended)

The repository follows the Agent Skills directory convention, so it can be
installed directly from GitHub with the open `skills` CLI. This repository does
not need to be published as an npm package.

List the available skills:

```bash
npx skills add bididi-badidi/skills --list
```

Choose skills interactively and install them into the current project:

```bash
npx skills add bididi-badidi/skills
```

Install one skill globally:

```bash
npx skills add bididi-badidi/skills --skill ask-cloudflare --global
```

The installer detects supported coding agents and installs or links the
selected skills into their expected skill directories.

### Via Claude Plugin Manifest
This repository provides a Claude plugin manifest located at `.claude-plugin/plugin.json`. You can install or reference the skills collection directly:

```bash
# Add as a plugin or clone into your configuration
git clone https://github.com/bididi-badidi/skills.git
```

Refer to individual skills in `.claude-plugin/plugin.json`:
- `skills/ask-cloudflare`
- `skills/example-skill`
- `skills/make-skill-router`
- `skills/teach-dumb-agents`

### Inspecting Previous Versions
Every release is tagged in Git. You can inspect or pin specific versions:

```bash
git checkout v0.1.0
```

Browse all releases and changelogs on GitHub Releases: `https://github.com/bididi-badidi/skills/releases`.

---

## Repository Structure

```text
skills/
  <skill-name>/
    SKILL.md
    references/        # Optional supplementary guides
    examples/          # Optional usage examples
    scripts/           # Optional helper utilities

.changeset/
  config.json          # Changesets configuration
  README.md            # Contributor guide for changesets
  <pending-change>.md  # Pending changeset Markdown files

.claude-plugin/
  plugin.json          # Manifest listing all skills & synced version

scripts/
  sync-plugin-version.mjs  # Synchronizes plugin.json with package.json version
  validate-skills.mjs      # Validates skill structure and manifest alignment
```

---

## Versioning

This repository uses one shared semantic version for the full skill collection.

Individual skills do not have separate versions.

Every released repository state is identified by a Git tag:

```text
v1.0.0
v1.1.0
v1.1.1
```

User-facing changes are recorded using Changesets. Changes merged into `main` are accumulated in a release pull request. Merging that pull request updates the changelog and creates the next repository release.

Semantic versioning guidelines:
- **`patch`**: Fixes, prompt improvements, metadata corrections, or small behavior changes.
- **`minor`**: New skills or backwards-compatible capabilities.
- **`major`**: Removed skills, renamed skills, incompatible folder changes, or breaking workflow changes.

---

## Release Lifecycle

```text
Developer changes a skill
        ↓
Developer adds a Changeset (npm run changeset)
        ↓
Pull request is reviewed and merged into main
        ↓
Changesets GitHub Action updates a rolling release PR (chore: version skills)
        ↓
More skill changes may accumulate in the same release PR
        ↓
Maintainer merges the release PR
        ↓
package.json and plugin.json contain the new version
        ↓
CHANGELOG.md contains the release notes
        ↓
Git tag vX.Y.Z is created
        ↓
GitHub Release vX.Y.Z is created
```

- Feature PRs do not directly publish releases.
- No package is published to npm (`"private": true`).
- Merging the rolling release PR triggers Git tagging and GitHub Release generation.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full contribution guidelines.

### Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Add or modify a skill**:
   - Create `skills/<skill-name>/SKILL.md` using lowercase kebab-case.
   - Register the skill path `./skills/<skill-name>` alphabetically in `.claude-plugin/plugin.json`.

3. **Validate skills and manifest**:
   ```bash
   npm run validate
   ```

4. **Add a changeset**:
   ```bash
   npm run changeset
   ```
   Choose `patch`, `minor`, or `major` according to the impact of the change.

5. **Open a pull request**:
   Submit a PR following the [pull request template](.github/pull_request_template.md).
