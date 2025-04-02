# tw-pdf

> A fork of [react-pdf](https://github.com/diegomura/react-pdf) with Tailwind CSS integration

## Overview

tw-pdf is a fork of the excellent react-pdf library that adds native Tailwind CSS support. It allows you to use Tailwind classes directly in your react-pdf components through a `className` prop, just like you would in a regular React application.

## Features

- 🎨 **Native Tailwind Support**: Use Tailwind classes directly with `className` props
- 🔄 **Compatible with react-pdf**: Works with all react-pdf features and components
- 🚀 **JIT Compiler Integration**: Uses Tailwind's JIT compiler for on-demand styling
- 🧩 **Plugin Compatibility**: Works with Tailwind plugins and extensions
- 🔌 **Simple API**: Intuitive API that follows React conventions

## Installation

```sh
npm install tw-pdf
# or
yarn add tw-pdf
```

## Usage

```jsx
import React from 'react';
import { Document, Page, Text, View } from 'tw-pdf';

// Create a PDF with Tailwind classes
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

## Documentation

For detailed documentation, see the [tw-pdf documentation](https://github.com/Lungren2/tw-pdf#documentation).

For react-pdf specific features, refer to the [react-pdf documentation](https://react-pdf.org/).

## Acknowledgements

This project is a fork of [react-pdf](https://github.com/diegomura/react-pdf) created by [Diego Muracciole](https://github.com/diegomura). All credit for the core PDF functionality goes to the original author and contributors.

## License

MIT © [Ethan Ogle](https://github.com/Lungren2)
