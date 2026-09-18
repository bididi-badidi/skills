# Contributing

## Install dependencies

```bash
npm install
```

## Add a skill

Create:

```text
skills/<skill-name>/SKILL.md
```

Then add the skill path to:

```text
.claude-plugin/plugin.json
```

Keep manifest entries alphabetically sorted.

## Validate

```bash
npm run validate
```

## Add a Changeset

For a user-visible change:

```bash
npm run changeset
```

Choose:

- patch for fixes and small improvements
- minor for new backwards-compatible skills
- major for breaking changes

Commit the generated `.changeset/*.md` file with the pull request.

## Releases

Changes merged into `main` update the rolling release pull request.

Merging the release pull request creates the next Git tag and GitHub Release.
