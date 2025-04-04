# tw-pdf

> A fork of react-pdf with Tailwind CSS integration

## Overview

tw-pdf is a fork of the excellent react-pdf library that adds native Tailwind CSS support. It allows you to use Tailwind classes directly in your react-pdf components through a `className` prop, just like you would in a regular React application.

This package works by pre-processing Tailwind classes and converting them to react-pdf compatible styles. It leverages Tailwind's existing infrastructure to generate optimized styles that are then used by your react-pdf components. Unlike other approaches, tw-pdf doesn't run the Tailwind processor in the browser, resulting in better performance and smaller bundle sizes.

The package provides two main ways to use Tailwind CSS with react-pdf:

1. **Using the `className` prop** - Enhanced react-pdf components that accept a `className` prop for Tailwind classes
2. **Using the `tw()` function** - A function that converts Tailwind classes to react-pdf styles

## Installation

```sh
npm install tw-pdf tailwindcss
# or
yarn add tw-pdf tailwindcss
# or
pnpm add tw-pdf tailwindcss
```

## Setup

After installing tw-pdf, you can start using it immediately. No additional setup is required!

```jsx
import { Document, Page, Text, View } from 'tw-pdf';

const MyDocument = () => (
  <Document>
    <Page>
      <View className="flex flex-col items-center p-10 bg-blue-100">
        <Text className="text-2xl font-bold text-blue-600">
          Hello, Tailwind CSS!
        </Text>
      </View>
    </Page>
  </Document>
);
```

## Usage

### Using the className prop (Recommended)

```jsx
import React from 'react';
import { Document, Page, Text, View } from 'tw-pdf';

// Create a PDF with Tailwind classes directly in className prop
const MyDocument = () => (
  <Document>
    <Page>
      <View className="flex flex-col items-center p-10 bg-blue-100">
        <Text className="text-2xl font-bold text-blue-600">
          Hello, Tailwind CSS!
        </Text>
      </View>
    </Page>
  </Document>
);
```

### Using the tw() function

If you prefer to use the standard react-pdf components, you can use the `tw()` function:

```jsx
import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { tw } from 'tw-pdf';

const MyDocument = () => {
  // Process Tailwind classes (now synchronous)
  const containerStyle = tw('flex flex-col items-center p-10 bg-blue-100');
  const textStyle = tw('text-2xl font-bold text-blue-600');

  return (
    <Document>
      <Page>
        <View style={containerStyle}>
          <Text style={textStyle}>
            Hello, Tailwind CSS!
          </Text>
        </View>
      </Page>
    </Document>
  );
};
```

### Using the Tailwind Component (Legacy)

For backward compatibility, you can still use the `Tailwind` component:

```jsx
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { View, Text } from '@react-pdf/renderer';
import { Tailwind } from 'tw-pdf';

// Create a PDF with Tailwind styles using the Tailwind component
const MyDocument = () => (
  <Document>
    <Page>
      <Tailwind className="flex flex-col items-center p-10 bg-blue-100">
        <View>
          <Tailwind className="text-2xl font-bold text-blue-600">
            <Text>Hello, Tailwind CSS!</Text>
          </Tailwind>
        </View>
      </Tailwind>
    </Page>
  </Document>
);
```

### Combining className with style prop

You can combine Tailwind classes with regular react-pdf styles:

```jsx
import React from 'react';
import { Document, Page, Text, View } from 'tw-pdf';

const MyDocument = () => (
  <Document>
    <Page>
      <View
        className="bg-blue-100 rounded-lg p-5"
        style={{ borderWidth: 1, borderColor: 'blue' }}
      >
        <Text className="text-blue-800 font-bold">
          Combining className with style prop
        </Text>
      </View>
    </Page>
  </Document>
);
```

### Supported Tailwind Classes

tw-pdf includes support for many common Tailwind classes, including:

- Layout: `flex`, `flex-row`, `grid`, `container`, etc.
- Spacing: `p-4`, `m-2`, `px-4`, etc.
- Typography: `text-lg`, `font-bold`, `text-center`, etc.
- Colors: `text-blue-500`, `bg-red-100`, etc.
- Borders: `border`, `rounded-lg`, etc.
- Effects: `shadow-md`, etc.

If you need to use a class that isn't supported, you can always use the regular style prop alongside className.

### React-PDF CSS Support Notes

When using tw-pdf, it's important to understand some key differences in how CSS works in react-pdf:

- react-pdf supports most CSS properties that make sense in a PDF context (see [valid CSS properties](https://react-pdf.org/styling#valid-css-properties))
- Default font family classes are excluded, since you have to include your own fonts anyway
- react-pdf internally uses pt as the default unit, with 1rem = 12pt by default (this can be changed in the options)
- Since react-pdf uses Yoga internally, some defaults differ from web standards (for example, flex-direction defaults to column, which can be fixed by adding the flex-row class where needed)
- Modifiers like breakpoints aren't currently supported

### Unit Conversion

tw-pdf automatically handles unit conversion for react-pdf:

- `rem` units are converted to `pt` (1rem = 12pt by default in react-pdf)
- `px` units are converted to `pt` (1px ≈ 0.75pt)
- Percentage, vh, vw, and other relative units are preserved as-is
- Numeric values without units are preserved as-is

### Combining with Regular Styles

You can combine Tailwind classes with regular react-pdf styles:

```jsx
<View
  className="p-4 bg-blue-100 rounded"
  style={{ borderWidth: 1, borderColor: 'blue' }}
>
  <Text>Combined styles</Text>
</View>
```

The style prop takes precedence over className styles when there are conflicts.

#### Configuration Requirements

For optimal performance and to ensure all your styles are properly processed, make sure your `tailwind.config.js` includes the correct content paths:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust these paths to match your project structure
    './components/**/*.{js,jsx,ts,tsx}',
    // Add any other paths where you use Tailwind classes
  ],
  // Your other Tailwind configurations...
};
```

#### How the Processing Works

1. **Style Pre-Processing**: tw-pdf includes a set of pre-processed Tailwind styles
2. **Class Parsing**: When you use a `className` prop or the `tw()` function, tw-pdf extracts the Tailwind class strings
3. **Style Lookup**: These classes are used to look up the pre-processed styles
4. **Style Merging**: The styles are merged with any explicitly provided style props
5. **Application**: The resulting styles are applied to your react-pdf components

#### Key Benefits

- **Performance**: No runtime processing of Tailwind classes in the browser
- **Simplicity**: No complex setup or build configuration required
- **Compatibility**: Works with any React project, not just specific build tools
- **Developer Experience**: Familiar API with className props

## Development

### Building the Package

To build the package locally:

```sh
# Install dependencies
npm install

# Build the package
npm run build
```

This will create the `lib` directory with the compiled JavaScript and TypeScript declaration files.

### Publishing

The package includes automated scripts to verify and publish:

```sh
# Verify the package (build and dry-run pack)
npm run verify-package

# Release (verify and publish)
npm run release
```

These scripts ensure that the package is properly built and contains all necessary files before publishing.

## API

### Enhanced Components

All standard react-pdf components with added `className` support:

```jsx
import {
  Document, Page, Text, View, Image, Link,
  // ... and all other react-pdf components
} from 'tw-pdf';
```

These components accept a `className` prop for Tailwind classes in addition to all standard react-pdf props.

### `withClassName(Component)`

Higher-order component that adds `className` support to any react-pdf component.

```jsx
import { withClassName } from 'tw-pdf';
import { MyCustomComponent } from './my-components';

const MyEnhancedComponent = withClassName(MyCustomComponent);
```

### `tw(classNames: string): Style`

Processes Tailwind CSS classes and returns a react-pdf style object.

- `classNames`: Tailwind CSS class names (space-separated)

### `twSync(classNames: string): Style`

Alias for `tw()` function.

### `tailwind(classNames: string): Style`

Alias for `tw()`.

### `<Tailwind className="..." style={...}>`

Component that processes Tailwind classes and applies them to its children.

- `className`: Tailwind CSS class names
- `style` (optional): Additional react-pdf style object to merge with the processed Tailwind styles

### `TailwindProvider`

Legacy utility for backward compatibility. These methods don't do anything in the current implementation.

- `TailwindProvider.reset()`: No-op function for backward compatibility
- `TailwindProvider.clearCache()`: No-op function for backward compatibility

### `StyleSheet`

Utility similar to react-pdf's StyleSheet.

- `StyleSheet.create(styles)`: Create a stylesheet object

## License

MIT © [Ethan Ogle](https://github.com/Lungren2)

## Acknowledgements

This project is a fork of [react-pdf](https://github.com/diegomura/react-pdf) created by [Diego Muracciole](https://github.com/diegomura). All credit for the core PDF functionality goes to the original author and contributors.
