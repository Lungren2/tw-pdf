# tw-pdf

> A fork of react-pdf with Tailwind CSS integration

## Overview

tw-pdf is a fork of the excellent react-pdf library that adds native Tailwind CSS support. It allows you to use Tailwind classes directly in your react-pdf components through a `className` prop, just like you would in a regular React application.

This package works by processing Tailwind classes through the Tailwind Just-In-Time (JIT) compiler (which is the default in Tailwind v4) and converting them to react-pdf compatible styles. The JIT compiler analyzes your Tailwind class strings at runtime, generates the corresponding CSS, and then transforms it into react-pdf compatible style objects.

The package provides two main ways to use Tailwind CSS with react-pdf:

1. **Using the `className` prop** - Enhanced react-pdf components that accept a `className` prop for Tailwind classes
2. **Using the `tw()` function** - A function that converts Tailwind classes to react-pdf styles

## Installation

```sh
npm install tw-pdf
# or
yarn add tw-pdf
# or
pnpm add tw-pdf
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
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { tw } from 'tw-pdf';

const MyDocument = () => {
  const [containerStyle, setContainerStyle] = useState({});
  const [textStyle, setTextStyle] = useState({});

  useEffect(() => {
    // Process Tailwind classes
    const loadStyles = async () => {
      setContainerStyle(await tw('flex flex-col items-center p-10 bg-blue-100'));
      setTextStyle(await tw('text-2xl font-bold text-blue-600'));
    };

    loadStyles();
  }, []);

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

### Managing the Tailwind Cache

You can manage the Tailwind processing cache:

```jsx
import { TailwindProvider } from 'tw-pdf';

// Clear the Tailwind cache if needed
TailwindProvider.clearCache();

// Reset the Tailwind processor
TailwindProvider.reset();
```

### Customizing Tailwind

To customize Tailwind, you can use Tailwind's built-in customization approach by creating a `tailwind.config.js` file in your project. The JIT compiler will automatically pick up these customizations.

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

#### How the JIT Processing Works

1. **Class Parsing**: When you use a `className` prop or the `tw()` function, tw-pdf extracts the Tailwind class strings
2. **JIT Compilation**: These classes are sent to the Tailwind JIT compiler, which generates the corresponding CSS
3. **Style Transformation**: The CSS is parsed and converted into react-pdf compatible style objects
4. **Caching**: Results are cached for performance, so identical class strings don't need to be reprocessed
5. **Application**: The resulting styles are applied to your react-pdf components

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

### `tw(classNames: string): Promise<Style>`

Processes Tailwind CSS classes and returns a react-pdf style object.

- `classNames`: Tailwind CSS class names (space-separated)

### `twSync(classNames: string): Style` [EXPERIMENTAL]

Synchronous version of `tw()` that is intended to use precompiled Tailwind classes for better performance.

> **Note:** This function is currently experimental and returns an empty object with a console warning. It is planned to be fully implemented in a future release (targeting v0.2.0). Please use `tw()` for full Tailwind support in the meantime.

### `tailwind(classNames: string): Promise<Style>`

Alias for `tw()`.

### `<Tailwind className="..." style={...}>`

Component that processes Tailwind classes and applies them to its children.

- `className`: Tailwind CSS class names
- `style` (optional): Additional react-pdf style object to merge with the processed Tailwind styles

### `TailwindProvider`

Utility for managing Tailwind processing.

- `TailwindProvider.reset()`: Reset the Tailwind processor
- `TailwindProvider.clearCache()`: Clear the Tailwind cache

### `StyleSheet`

Utility similar to react-pdf's StyleSheet.

- `StyleSheet.create(styles)`: Create a stylesheet object

## License

MIT © [Ethan Ogle](https://github.com/Lungren2)

## Acknowledgements

This project is a fork of [react-pdf](https://github.com/diegomura/react-pdf) created by [Diego Muracciole](https://github.com/diegomura). All credit for the core PDF functionality goes to the original author and contributors.
