// Takes the figma exports and compiles the final package from them.
const fs = require("fs");
const { camelCase } = require("lodash");
const cleanSVG = require("./createSvg");
const createReactComponent = require("./createReactComponent");
const createTypeDeclaration = require("./createTypeDeclaration");

const SRC_FOLDER = "./icons";
const PACKAGE_FOLDER = "./package";
const STYLES = ["solid", "outline", "duo", "duoline", "duotone"];

function pascalCase(input) {
  const camel = camelCase(input);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

STYLES.forEach((style) => {
  ensureDir(`${PACKAGE_FOLDER}/${style}`);

  fs.readdirSync(`${SRC_FOLDER}/${style}`).forEach((file) => {
    const isSVG = file.match(/\.svg$/);

    if (isSVG) {
      const name = file.match(/(.*)\.svg$/)[1];
      const componentName = pascalCase(name);

      cleanSVG(`${SRC_FOLDER}/${style}/${file}`);

      createReactComponent(
        componentName,
        `${SRC_FOLDER}/${style}/${file}`,
        `${PACKAGE_FOLDER}/${style}/${componentName}.js`
      );

      createTypeDeclaration(
        componentName,
        `${PACKAGE_FOLDER}/${style}/${componentName}.d.ts`
      );
    }
  });

  createIndexFile(`${PACKAGE_FOLDER}/${style}`, "index.js");
  createIndexTypeDeclration(`${PACKAGE_FOLDER}/${style}`);
});

function ensureDir(path) {
  fs.mkdirSync(path, { recursive: true });
}

function createIndexTypeDeclration(path) {
  console.log("Creating index type declaration");
  if (fs.existsSync(`${path}/index.d.ts`)) {
    fs.unlinkSync(`${path}/index.d.ts`);
  }

  let output = "";
  fs.readdirSync(path).forEach((file) => {
    const type = file.match(/\.(.*)$/)[1];
    if (type !== "js") return;
    const name = pascalCase(file.match(/(.*)\..*$/)[1]);
    output += `export { default as ${name} } from "./${file}"\n`;
  });

  fs.writeFileSync(`${path}/index.d.ts`, output);
}

function createIndexFile(path, file) {
  console.log("Creating index file");
  if (fs.existsSync(`${path}/${file}`)) {
    fs.unlinkSync(`${path}/${file}`);
  }

  let output = "";
  fs.readdirSync(path).forEach((file) => {
    const type = file.match(/\.(.*)$/)[1];
    if (type !== "js") return;
    const name = pascalCase(file.match(/(.*)\..*$/)[1]);
    output += `module.exports.${name} = require("./${file}")\n`;
  });

  fs.writeFileSync(`${path}/${file}`, output);
}
