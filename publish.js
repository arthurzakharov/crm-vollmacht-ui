// publish.js
import fs from "node:fs";
import { execSync } from "child_process";

// Read the current package.json file
const packageJsonPath = "./package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

// Increment the version (you can modify this logic based on your needs)
const versionParts = packageJson.version.split(".");
versionParts[2] = parseInt(versionParts[2]) + 1; // Increment the patch version
const newVersion = process.argv[3] || versionParts.join(".");

// Update the package.json file with the new version
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

let commitMessage = process.argv[2] || `version [${newVersion}]`;

if (process.argv[3]) {
  commitMessage = commitMessage.concat(" - ", `version [${newVersion}]`);
}

execSync(`git add . && git commit -m "${commitMessage}"`);

execSync(`git push -u origin main`);

execSync(`npm run rollup`);

execSync(`npm publish`);

console.log(`Version updated to ${newVersion}`);
