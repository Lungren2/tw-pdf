# @react-pdf/tailwind

> Tailwind CSS integration for react-pdf

## Overview

This package provides integration between Tailwind CSS and react-pdf, allowing you to use Tailwind classes directly in your react-pdf components. It works by processing Tailwind classes through the Tailwind JIT compiler (which is the default in Tailwind v4) and converting them to react-pdf compatible styles.

The package provides two main ways to use Tailwind CSS with react-pdf:

1. **Using the `className` prop** - Enhanced react-pdf components that accept a `className` prop for Tailwind classes
2. **Using the `tw()` function** - A function that converts Tailwind classes to react-pdf styles

## Installation

```sh
npm install @react-pdf/tailwind
# or
yarn add @react-pdf/tailwind
```

## Usage

### Using the className prop (Recommended)

```jsx
import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/tailwind';

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
import { tw } from '@react-pdf/tailwind';

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
import { Tailwind } from '@react-pdf/tailwind';

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
import { Document, Page, Text, View } from '@react-pdf/tailwind';

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
import { TailwindProvider } from '@react-pdf/tailwind';

// Clear the Tailwind cache if needed
TailwindProvider.clearCache();

// Reset the Tailwind processor
TailwindProvider.reset();
```

### Customizing Tailwind

To customize Tailwind, you can use Tailwind's built-in customization approach by creating a `tailwind.config.js` file in your project. The JIT compiler will automatically pick up these customizations.

## API

### Enhanced Components

All standard react-pdf components with added `className` support:

```jsx
import {
  Document, Page, Text, View, Image, Link,
  // ... and all other react-pdf components
} from '@react-pdf/tailwind';
```

These components accept a `className` prop for Tailwind classes in addition to all standard react-pdf props.

### `withClassName(Component)`

Higher-order component that adds `className` support to any react-pdf component.

```jsx
import { withClassName } from '@react-pdf/tailwind';
import { MyCustomComponent } from './my-components';

const MyEnhancedComponent = withClassName(MyCustomComponent);
```

### `tw(classNames: string): Promise<Style>`

Processes Tailwind CSS classes and returns a react-pdf style object.

- `classNames`: Tailwind CSS class names (space-separated)

### `twSync(classNames: string): Style`

Synchronous version of `tw()`. Currently a placeholder for future implementation.

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

MIT
