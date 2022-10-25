const fs = require("fs");
const { optimize } = require("svgo");

function createSvg(path) {
  console.log(`Creating SVG for ${path}`);
  const data = fs.readFileSync(path, "utf8");
  let cleaned = optimize(data, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  }).data;

  fs.writeFileSync(path, cleaned);
}

module.exports = createSvg;
