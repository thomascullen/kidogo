const fs = require("fs");
const babel = require("@babel/core");
const { camelCase, template } = require("lodash");
const parser = require("svg-parser");
const { optimize } = require("svgo");

const PRIMARY_COLOR = "#212121";
const DUO_COLOR = "#D6D6D6";
const DUO_LINE_COLOR = "#9A9CA3";
const DUO_TONE_COLOR = "#E5E5E8";

function stringifyAttrs(properties) {
  const attrs = Object.keys(properties);
  return attrs.reduce((acc, attr) => {
    const value = properties[attr];

    if (value === PRIMARY_COLOR) {
      return acc + ` ${camelCase(attr)}={color}`;
    }

    if (value === DUO_LINE_COLOR) {
      return acc + ` ${camelCase(attr)}={secondaryColor}`;
    }

    if (value === DUO_COLOR) {
      return acc + ` ${camelCase(attr)}={secondaryColor}`;
    }

    if (value === DUO_TONE_COLOR) {
      return acc + ` ${camelCase(attr)}={secondaryColor}`;
    }

    return acc + ` ${camelCase(attr)}="${value}"`;
  }, "");
}

function asJSX(node) {
  if (typeof node === "string") return node;
  const attributes = stringifyAttrs(node.properties);

  if (node.children.length > 0) {
    let buffer = `<${node.tagName} ref={ref} ${attributes}>`;

    // special cases for svg tag to forward props and update width & height
    if (node.tagName === "svg") {
      buffer = buffer.replace('width="20"', "width={size} ");
      buffer = buffer.replace('height="20"', "height={size} ");
      buffer = buffer.replace(">", "{...props}>");
    }

    node.children.forEach((child) => (buffer += asJSX(child)));
    buffer += `</${node.tagName}>`;
    return buffer;
  }

  return `<${node.tagName}${attributes} />`;
}

const JSX_TEMPLATE = `
  const React = require("react");

  const <%= componentName %> = React.forwardRef(function <%= componentName %>({
    color = "#000000",
    secondaryColor = "#DBD1CA",
    size = 20,
    ...props
  }, ref) {
    return (
      <%= jsx %>
    )
  })

  module.exports = <%= componentName %>
`;

const jsxTemplate = template(JSX_TEMPLATE);

function asComponent(componentName, jsx) {
  const component = jsxTemplate({ jsx, componentName });

  let { code } = babel.transformSync(component, {
    plugins: [
      [require("@babel/plugin-transform-react-jsx"), { useBuiltIns: true }],
    ],
  });

  return code;
}

function createReactComponent(componentName, src, output) {
  console.log(`Creating react component for: ${src}`);

  const data = fs.readFileSync(src, "utf8");

  const cleaned = optimize(data, {
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
  });
  const parsed = parser.parse(cleaned.data);
  const jsx = asJSX(parsed.children[0]);
  const component = asComponent(componentName, jsx);
  fs.writeFileSync(output, component);
}

module.exports = createReactComponent;
