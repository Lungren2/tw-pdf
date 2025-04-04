// Import components and utilities
import {
  Tailwind,
  View,
  Text,
  Image,
  Link,
  Page,
  Document,
  Canvas,
  Note,
  TextInput,
  // SVG components
  Svg,
  G,
  Stop,
  Defs,
  Line,
  Path,
  Rect,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Tspan,
  ClipPath,
  LinearGradient,
  RadialGradient,
} from "./components"

import { default as withClassName } from "./withClassName"
import { tw, twSync, tailwind, TailwindProvider, StyleSheet } from "./tw"
import { cssToStyles } from "./cssToStyles"

// Export enhanced components with className support
export {
  Tailwind,
  View,
  Text,
  Image,
  Link,
  Page,
  Document,
  Canvas,
  Note,
  TextInput,
  // SVG components
  Svg,
  G,
  Stop,
  Defs,
  Line,
  Path,
  Rect,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Tspan,
  ClipPath,
  LinearGradient,
  RadialGradient,
} from "./components"

// Export the HOC for creating custom components with className support
export { default as withClassName } from "./withClassName"

// Export Tailwind utilities
export { tw, twSync, tailwind, StyleSheet, TailwindProvider } from "./tw"

// Export CSS utilities
export { cssToStyles } from "./cssToStyles"

// Create a convenience object with all exports
const TailwindPDF = {
  tw,
  twSync,
  tailwind,
  StyleSheet,
  TailwindProvider,
  cssToStyles,
  Tailwind,
  View,
  Text,
  Image,
  Link,
  Page,
  Document,
  Canvas,
  Note,
  TextInput,
  Svg,
  G,
  Stop,
  Defs,
  Line,
  Path,
  Rect,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Tspan,
  ClipPath,
  LinearGradient,
  RadialGradient,
  withClassName,
}

export default TailwindPDF
