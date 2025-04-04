import { Style } from "@react-pdf/stylesheet"
import postcss from "postcss"
import fs from "fs"

/**
 * Convert CSS to a mapping of class names to react-pdf style objects
 * 
 * @param cssContent - CSS content as a string
 * @returns A mapping of class names to react-pdf style objects
 */
export function cssToStyles(cssContent: string): Record<string, Style> {
  // Parse the CSS
  const root = postcss.parse(cssContent)
  
  // Create a mapping of class names to styles
  const styleMap: Record<string, Style> = {}
  
  // Process each rule
  root.walkRules((rule) => {
    // Extract the class name from the selector
    // We're only handling simple class selectors for now
    const match = rule.selector.match(/\.([\w-]+)/)
    if (!match) return
    
    const className = match[1]
    const style: Style = {}
    
    // Process each declaration
    rule.walkDecls((decl) => {
      // Convert kebab-case to camelCase
      const property = decl.prop.replace(/-([a-z])/g, (_, letter) => 
        letter.toUpperCase()
      )
      
      // Convert value to appropriate type
      style[property] = convertCssValue(decl.value)
    })
    
    // Add to the mapping
    styleMap[className] = style
  })
  
  return styleMap
}

/**
 * Convert CSS value to appropriate JavaScript value
 * 
 * @param value - CSS value
 * @returns JavaScript value
 */
function convertCssValue(value: string): any {
  // Convert numeric values with units
  if (/^-?\d+(\.\d+)?(px|pt|rem|em|vh|vw|%)$/.test(value)) {
    // Keep the unit for react-pdf
    return value
  }
  
  // Convert numeric values without units
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value)
  }
  
  // Handle colors, strings, etc.
  return value
}

/**
 * Read a CSS file and convert it to a mapping of class names to react-pdf style objects
 * 
 * @param cssFilePath - Path to the CSS file
 * @returns A mapping of class names to react-pdf style objects
 */
export function cssFileToStyles(cssFilePath: string): Record<string, Style> {
  // Read the CSS file
  const css = fs.readFileSync(cssFilePath, "utf-8")
  
  // Convert to styles
  return cssToStyles(css)
}
