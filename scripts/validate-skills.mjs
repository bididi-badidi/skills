import {
  access,
  readdir,
  readFile
} from "node:fs/promises";
import process from "node:process";

const root = new URL("../", import.meta.url);
const skillsDirectory = new URL("../skills/", import.meta.url);
const packagePath = new URL("../package.json", import.meta.url);
const pluginPath = new URL("../.claude-plugin/plugin.json", import.meta.url);

const errors = [];

async function readJson(path, label) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    errors.push(`Could not read ${label}: ${error.message}`);
    return null;
  }
}

const packageJson = await readJson(packagePath, "package.json");
const pluginJson = await readJson(
  pluginPath,
  ".claude-plugin/plugin.json"
);

let skillEntries = [];

try {
  skillEntries = await readdir(skillsDirectory, {
    withFileTypes: true
  });
} catch (error) {
  errors.push(`Could not read skills directory: ${error.message}`);
}

const skillNames = skillEntries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

for (const skillName of skillNames) {
  if (!kebabCasePattern.test(skillName)) {
    errors.push(
      `Skill directory "${skillName}" is not lowercase kebab-case.`
    );
  }

  const skillFile = new URL(
    `../skills/${skillName}/SKILL.md`,
    import.meta.url
  );

  try {
    await access(skillFile);
  } catch {
    errors.push(`Skill "${skillName}" is missing SKILL.md.`);
  }
}

if (packageJson && pluginJson) {
  if (packageJson.version !== pluginJson.version) {
    errors.push(
      `Version mismatch: package.json=${packageJson.version}, ` +
        `plugin.json=${pluginJson.version}`
    );
  }

  const manifestSkills = Array.isArray(pluginJson.skills)
    ? pluginJson.skills
    : [];

  if (!Array.isArray(pluginJson.skills)) {
    errors.push("plugin.json must contain a skills array.");
  }

  const duplicateManifestEntries = manifestSkills.filter(
    (entry, index) => manifestSkills.indexOf(entry) !== index
  );

  for (const entry of new Set(duplicateManifestEntries)) {
    errors.push(`Duplicate plugin skill entry: ${entry}`);
  }

  const sortedManifestSkills = [...manifestSkills].sort();

  if (
    JSON.stringify(manifestSkills) !==
    JSON.stringify(sortedManifestSkills)
  ) {
    errors.push("Plugin skill entries must be alphabetically sorted.");
  }

  const expectedSkills = skillNames.map(
    (name) => `./skills/${name}`
  );

  for (const expectedSkill of expectedSkills) {
    if (!manifestSkills.includes(expectedSkill)) {
      errors.push(
        `Skill is missing from plugin manifest: ${expectedSkill}`
      );
    }
  }

  for (const manifestSkill of manifestSkills) {
    if (!expectedSkills.includes(manifestSkill)) {
      errors.push(
        `Plugin manifest references an unknown skill: ${manifestSkill}`
      );
    }

    const normalizedPath = manifestSkill.replace(/^\.\//, "");
    const absolutePath = new URL(`../${normalizedPath}/`, import.meta.url);

    try {
      await access(absolutePath);
    } catch {
      errors.push(
        `Plugin manifest path does not exist: ${manifestSkill}`
      );
    }
  }
}

if (errors.length > 0) {
  console.error("Skill validation failed:\n");

  for (const error of errors) {
    console.error(`- ${error}`);
  }

  process.exit(1);
}

console.log(
  `Validated ${skillNames.length} skill${
    skillNames.length === 1 ? "" : "s"
  }.`
);
