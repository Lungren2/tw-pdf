import { Style } from "@react-pdf/stylesheet"
import { TailwindProcessor } from "./processor"
import { tryCatch } from "@maxmorozoff/try-catch-tuple"

// Create a default processor instance
let defaultProcessor: TailwindProcessor | null = null

/**
 * Get or create the default Tailwind processor
 */
const getDefaultProcessor = (): TailwindProcessor => {
  if (!defaultProcessor) {
    defaultProcessor = new TailwindProcessor()
  }
  return defaultProcessor
}

/**
 * Process Tailwind CSS classes and convert them to react-pdf style object
 *
 * @param classNames - Tailwind CSS class names
 * @returns Promise resolving to react-pdf style object
 */
export const tw = async (classNames: string): Promise<Style> => {
  // Use default processor
  const [classes, error] = await tryCatch(() =>
    getDefaultProcessor().process(classNames)
  )
  if (error) {
    console.error("Error processing Tailwind classes:", error)
    return {}
  }
  return classes
}

/**
 * [EXPERIMENTAL] Synchronous version of tw function that uses a predefined set of Tailwind classes
 * This is useful for static class names that are known at build time
 *
 * @experimental This function is not fully implemented yet and currently returns an empty object with a warning.
 * It is planned to be fully implemented in a future release (targeting v0.2.0) with precompiled common Tailwind classes.
 *
 * @param classNames - Tailwind CSS class names
 * @returns react-pdf style object (currently empty)
 */
export const twSync = (classNames: string): Style => {
  // For now, this is a simple implementation that returns an empty object
  // In a real implementation, we would precompile common Tailwind classes
  // and load them from a JSON file or similar
  console.warn(
    "[EXPERIMENTAL] twSync is not fully implemented yet and returns an empty object. Use tw() for full Tailwind support."
  )
  return {}
}

/**
 * Convert Tailwind classes to react-pdf style object
 * This is a convenience function that returns a Promise
 *
 * @param classNames - Tailwind CSS class names
 * @returns Promise resolving to react-pdf style object
 */
export const tailwind = tw

/**
 * StyleSheet utility similar to react-pdf's StyleSheet
 */
export const StyleSheet = {
  create: <T extends Record<string, any>>(styles: T): T => styles,
}

/**
 * TailwindProvider for managing Tailwind processing
 */
export const TailwindProvider = {
  /**
   * Reset the Tailwind processor
   */
  reset: (): void => {
    defaultProcessor = new TailwindProcessor()
  },

  /**
   * Clear the Tailwind cache
   */
  clearCache: (): void => {
    if (defaultProcessor) {
      defaultProcessor.clearCache()
    }
  },
}
