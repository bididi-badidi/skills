import { readFile, writeFile } from "node:fs/promises";
import process from "node:process";

const packagePath = new URL("../package.json", import.meta.url);
const pluginPath = new URL("../.claude-plugin/plugin.json", import.meta.url);

async function readJson(path, label) {
  try {
    const source = await readFile(path, "utf8");
    return JSON.parse(source);
  } catch (error) {
    console.error(`Failed to read ${label}:`, error);
    process.exitCode = 1;
    return null;
  }
}

const packageJson = await readJson(packagePath, "package.json");
const pluginJson = await readJson(
  pluginPath,
  ".claude-plugin/plugin.json"
);

if (!packageJson || !pluginJson) {
  process.exit(1);
}

if (
  typeof packageJson.version !== "string" ||
  packageJson.version.length === 0
) {
  console.error("package.json does not contain a valid version.");
  process.exit(1);
}

pluginJson.version = packageJson.version;

await writeFile(
  pluginPath,
  `${JSON.stringify(pluginJson, null, 2)}\n`,
  "utf8"
);

console.log(
  `Synchronized plugin version to ${packageJson.version}.`
);
