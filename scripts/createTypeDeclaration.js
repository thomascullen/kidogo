const fs = require("fs");
const { template } = require("lodash");

const TS_TEMPLATE = `
  import * as React from 'react';
  declare function <%= componentName %>(props: React.ComponentProps<'svg'> & { color?: string, secondaryColor?: string }): JSX.Element;
  export default <%= componentName %>;
`;

const tsTemplate = template(TS_TEMPLATE);

function createTypeDeclaration(componentName, output) {
  const content = tsTemplate({ componentName });
  fs.writeFileSync(output, content);
}

module.exports = createTypeDeclaration;
