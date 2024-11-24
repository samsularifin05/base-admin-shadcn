import fs from "fs";
import path from "path";
import JavaScriptObfuscator from "javascript-obfuscator";

const settings = {
  compact: true,
  controlFlowFlatteningThreshold: 0.75,
  numbersToExpressions: true,
  simplify: true,
  shuffleStringArray: true,
  splitStrings: true,
  stringArray: true,
  stringArrayThreshold: 0.75,
  stringArrayEncoding: ["base64"], // Tambahkan pengaturan ini untuk Base64 encoding
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
};
function obfuscateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, { encoding: "utf8" });
    const obfuscator = JavaScriptObfuscator.obfuscate(content, settings);
    const obfuscatedCode = obfuscator.getObfuscatedCode();

    fs.writeFileSync(filePath, obfuscatedCode, {
      encoding: "utf8",
      flag: "w+",
    });
    console.log(`🤖 Done obfuscating: ${filePath}`);
  } catch (error) {
    console.error(`Error obfuscating file: ${filePath}`, error);
  }
}

function obfuscateDir(dirPath) {
  try {
    const dirents = fs.readdirSync(dirPath, {
      encoding: "utf8",
      withFileTypes: true,
    });

    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        obfuscateDir(path.join(dirPath, dirent.name));
      } else if (path.extname(dirent.name) === ".js") {
        const filePath = path.join(dirPath, dirent.name);
        obfuscateFile(filePath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${dirPath}`, error);
  }
}

// Use import.meta.url to get the current module's URL
const currentModuleUrl = new URL(import.meta.url);
const currentModuleDir = path.dirname(currentModuleUrl.pathname);

const buildDir = path.join(currentModuleDir, "../build");

if (fs.existsSync(buildDir)) {
  obfuscateDir(buildDir);
} else {
  console.error(`Build directory not found: ${buildDir}`);
}
