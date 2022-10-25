<a href="https://kidogoicons.com" target="_blank">
  <img src="./website/app/images/cover.png" alt="Kidogo icons" width="100%">
</a>

# Get Started

Install the icon pack from npm.

```
npm install kidogo
```

You can now import each icon that you want to use.

```js
import { Box } from "kidogo/duoline";

function MyComponent() {
  return (
    <div>
      <Box />
      ...
    </div>
  );
}
```

You can control the color of each icon using the `color` and `secondaryColor` props.

```jsx
<Box color="#00CBA6" secondaryColor="#C6DFDB" />
```

## License

This library is MIT licensed.
