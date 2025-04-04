import { Style } from "@react-pdf/stylesheet"
import { tryCatch } from "@maxmorozoff/try-catch-tuple"
import { loadStyles } from "./styleCache"

// Helper function to process styles and convert units
const processStyles = (
  styles: Record<string, Style>
): Record<string, Style> => {
  const processed: Record<string, Style> = {}

  // Process each style
  for (const [className, style] of Object.entries(styles)) {
    const processedStyle: Style = {}

    // Process each property
    for (const [prop, value] of Object.entries(style)) {
      // Convert string values that might be units
      if (
        typeof value === "string" &&
        /^-?\d+(\.\d+)?(rem|px|pt|em|%)$/.test(value)
      ) {
        // Handle rem units (1rem = 12pt in react-pdf by default)
        if (value.endsWith("rem")) {
          const remValue = parseFloat(value.replace("rem", ""))
          processedStyle[prop] = `${remValue * 12}pt`
        }
        // Handle px units (convert to pt for react-pdf)
        else if (value.endsWith("px")) {
          const pxValue = parseFloat(value.replace("px", ""))
          // Approximate conversion: 1px ≈ 0.75pt
          processedStyle[prop] = `${pxValue * 0.75}pt`
        }
        // Keep other units as is
        else {
          processedStyle[prop] = value
        }
      } else {
        // Keep non-unit values as is
        processedStyle[prop] = value
      }
    }

    processed[className] = processedStyle
  }

  return processed
}

// Load styles based on environment and process them for react-pdf
const rawStyles = loadStyles(process.env.NODE_ENV === "production")
const styles = processStyles(rawStyles)

/**
 * Process Tailwind CSS classes and convert them to react-pdf style object
 * This is now a synchronous function that uses pre-generated styles
 *
 * @param classNames - Tailwind CSS class names
 * @returns react-pdf style object
 */
export const tw = (classNames: string): Style => {
  // Use try-catch-tuple pattern for error handling
  const [result, error] = tryCatch(() => {
    // Split class names
    const classes = classNames.split(" ").filter(Boolean)

    // Create a style object from the classes
    const tailwindStyle: Style = {}

    // Look up styles for each class
    for (const cls of classes) {
      if (styles[cls]) {
        Object.assign(tailwindStyle, styles[cls])
      }
    }

    return tailwindStyle
  })

  if (error) {
    console.warn("Error processing Tailwind classes:", error)
    return {}
  }

  return result
}

/**
 * Alias for tw function
 *
 * @param classNames - Tailwind CSS class names
 * @returns react-pdf style object
 */
export const twSync = tw

/**
 * Alias for tw function
 *
 * @param classNames - Tailwind CSS class names
 * @returns react-pdf style object
 */
export const tailwind = tw

/**
 * StyleSheet utility similar to react-pdf's StyleSheet
 */
export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
}

/**
 * TailwindProvider for managing Tailwind styles
 * This is now just a placeholder for backward compatibility
 */
export const TailwindProvider = {
  /**
   * This function no longer does anything
   * Styles are now loaded from the cache
   */
  reset: (): void => {
    // No-op
  },

  /**
   * This function no longer does anything
   * Styles are now loaded from the cache
   */
  clearCache: (): void => {
    // No-op
  },
}
