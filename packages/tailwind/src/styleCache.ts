import { Style } from "@react-pdf/stylesheet"

// Import pre-generated styles
// In a real implementation, we would dynamically import these
// but for now, we'll use a comprehensive object with common styles
//
// Note about react-pdf CSS support:
// - react-pdf supports most CSS properties that make sense in a PDF context
// - Uses pt as the default unit (1rem = 12pt by default)
// - Some defaults differ from web standards (e.g., flex-direction defaults to column)
// - Font family classes are excluded since custom fonts need to be included separately
// - See https://react-pdf.org/styling#valid-css-properties for the full list of supported properties

// Helper function to convert CSS units to react-pdf compatible values
const convertUnit = (value: string): string | number => {
  // If it's a number without a unit, return as is
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value)
  }

  // Handle rem units (1rem = 12pt in react-pdf by default)
  if (/^-?\d+(\.\d+)?rem$/.test(value)) {
    const remValue = parseFloat(value.replace("rem", ""))
    return `${remValue * 12}pt`
  }

  // Handle px units (convert to pt for react-pdf)
  if (/^-?\d+(\.\d+)?px$/.test(value)) {
    const pxValue = parseFloat(value.replace("px", ""))
    // Approximate conversion: 1px ≈ 0.75pt
    return `${pxValue * 0.75}pt`
  }

  // Handle percentage, vh, vw, etc. - keep as is
  return value
}

// Define a comprehensive set of Tailwind classes mapped to react-pdf compatible styles
const DEFAULT_STYLES: Record<string, Style> = {
  // Display
  block: { display: "block" },
  inline: { display: "inline" },
  "inline-block": { display: "inline-block" },
  flex: { display: "flex" },
  "inline-flex": { display: "inline-flex" },
  hidden: { display: "none" },

  // Flex Direction (note: react-pdf defaults to column)
  "flex-row": { flexDirection: "row" },
  "flex-row-reverse": { flexDirection: "row-reverse" },
  "flex-col": { flexDirection: "column" },
  "flex-col-reverse": { flexDirection: "column-reverse" },

  // Flex Wrap
  "flex-wrap": { flexWrap: "wrap" },
  "flex-wrap-reverse": { flexWrap: "wrap-reverse" },
  "flex-nowrap": { flexWrap: "nowrap" },

  // Flex Properties
  "flex-1": { flex: 1 },
  "flex-auto": { flex: "auto" },
  "flex-initial": { flex: "initial" },
  "flex-none": { flex: "none" },
  "flex-grow": { flexGrow: 1 },
  "flex-grow-0": { flexGrow: 0 },
  "flex-shrink": { flexShrink: 1 },
  "flex-shrink-0": { flexShrink: 0 },

  // Justify Content
  "justify-start": { justifyContent: "flex-start" },
  "justify-end": { justifyContent: "flex-end" },
  "justify-center": { justifyContent: "center" },
  "justify-between": { justifyContent: "space-between" },
  "justify-around": { justifyContent: "space-around" },
  "justify-evenly": { justifyContent: "space-evenly" },

  // Align Items
  "items-start": { alignItems: "flex-start" },
  "items-end": { alignItems: "flex-end" },
  "items-center": { alignItems: "center" },
  "items-baseline": { alignItems: "baseline" },
  "items-stretch": { alignItems: "stretch" },

  // Align Self
  "self-auto": { alignSelf: "auto" },
  "self-start": { alignSelf: "flex-start" },
  "self-end": { alignSelf: "flex-end" },
  "self-center": { alignSelf: "center" },
  "self-stretch": { alignSelf: "stretch" },

  // Align Content
  "content-center": { alignContent: "center" },
  "content-start": { alignContent: "flex-start" },
  "content-end": { alignContent: "flex-end" },
  "content-between": { alignContent: "space-between" },
  "content-around": { alignContent: "space-around" },

  // Width
  "w-0": { width: 0 },
  "w-px": { width: "1pt" }, // Convert px to pt
  "w-0.5": { width: "0.125rem" }, // Will be converted to pt
  "w-1": { width: "0.25rem" },
  "w-2": { width: "0.5rem" },
  "w-4": { width: "1rem" },
  "w-8": { width: "2rem" },
  "w-12": { width: "3rem" },
  "w-16": { width: "4rem" },
  "w-24": { width: "6rem" },
  "w-32": { width: "8rem" },
  "w-40": { width: "10rem" },
  "w-48": { width: "12rem" },
  "w-56": { width: "14rem" },
  "w-64": { width: "16rem" },
  "w-auto": { width: "auto" },
  "w-1/2": { width: "50%" },
  "w-1/3": { width: "33.333333%" },
  "w-2/3": { width: "66.666667%" },
  "w-1/4": { width: "25%" },
  "w-3/4": { width: "75%" },
  "w-1/5": { width: "20%" },
  "w-2/5": { width: "40%" },
  "w-3/5": { width: "60%" },
  "w-4/5": { width: "80%" },
  "w-full": { width: "100%" },

  // Height
  "h-0": { height: 0 },
  "h-px": { height: "1pt" }, // Convert px to pt
  "h-0.5": { height: "0.125rem" }, // Will be converted to pt
  "h-1": { height: "0.25rem" },
  "h-2": { height: "0.5rem" },
  "h-4": { height: "1rem" },
  "h-8": { height: "2rem" },
  "h-10": { height: "2.5rem" },
  "h-12": { height: "3rem" },
  "h-16": { height: "4rem" },
  "h-24": { height: "6rem" },
  "h-32": { height: "8rem" },
  "h-40": { height: "10rem" },
  "h-48": { height: "12rem" },
  "h-56": { height: "14rem" },
  "h-64": { height: "16rem" },
  "h-auto": { height: "auto" },
  "h-full": { height: "100%" },

  // Margin
  "m-0": { margin: 0 },
  "m-1": { margin: "0.25rem" },
  "m-2": { margin: "0.5rem" },
  "m-3": { margin: "0.75rem" },
  "m-4": { margin: "1rem" },
  "m-5": { margin: "1.25rem" },
  "m-6": { margin: "1.5rem" },
  "m-8": { margin: "2rem" },
  "m-10": { margin: "2.5rem" },
  "m-12": { margin: "3rem" },
  "m-16": { margin: "4rem" },
  "m-auto": { margin: "auto" },

  "mx-0": { marginLeft: 0, marginRight: 0 },
  "mx-1": { marginLeft: "0.25rem", marginRight: "0.25rem" },
  "mx-2": { marginLeft: "0.5rem", marginRight: "0.5rem" },
  "mx-4": { marginLeft: "1rem", marginRight: "1rem" },
  "mx-8": { marginLeft: "2rem", marginRight: "2rem" },
  "mx-auto": { marginLeft: "auto", marginRight: "auto" },

  "my-0": { marginTop: 0, marginBottom: 0 },
  "my-1": { marginTop: "0.25rem", marginBottom: "0.25rem" },
  "my-2": { marginTop: "0.5rem", marginBottom: "0.5rem" },
  "my-4": { marginTop: "1rem", marginBottom: "1rem" },
  "my-8": { marginTop: "2rem", marginBottom: "2rem" },
  "my-auto": { marginTop: "auto", marginBottom: "auto" },

  "mt-0": { marginTop: 0 },
  "mt-1": { marginTop: "0.25rem" },
  "mt-2": { marginTop: "0.5rem" },
  "mt-4": { marginTop: "1rem" },
  "mt-8": { marginTop: "2rem" },

  "mr-0": { marginRight: 0 },
  "mr-1": { marginRight: "0.25rem" },
  "mr-2": { marginRight: "0.5rem" },
  "mr-4": { marginRight: "1rem" },
  "mr-8": { marginRight: "2rem" },

  "mb-0": { marginBottom: 0 },
  "mb-1": { marginBottom: "0.25rem" },
  "mb-2": { marginBottom: "0.5rem" },
  "mb-4": { marginBottom: "1rem" },
  "mb-8": { marginBottom: "2rem" },

  "ml-0": { marginLeft: 0 },
  "ml-1": { marginLeft: "0.25rem" },
  "ml-2": { marginLeft: "0.5rem" },
  "ml-4": { marginLeft: "1rem" },
  "ml-8": { marginLeft: "2rem" },

  // Padding
  "p-0": { padding: 0 },
  "p-1": { padding: "0.25rem" },
  "p-2": { padding: "0.5rem" },
  "p-3": { padding: "0.75rem" },
  "p-4": { padding: "1rem" },
  "p-5": { padding: "1.25rem" },
  "p-6": { padding: "1.5rem" },
  "p-8": { padding: "2rem" },
  "p-10": { padding: "2.5rem" },
  "p-12": { padding: "3rem" },
  "p-16": { padding: "4rem" },

  "px-0": { paddingLeft: 0, paddingRight: 0 },
  "px-1": { paddingLeft: "0.25rem", paddingRight: "0.25rem" },
  "px-2": { paddingLeft: "0.5rem", paddingRight: "0.5rem" },
  "px-4": { paddingLeft: "1rem", paddingRight: "1rem" },
  "px-8": { paddingLeft: "2rem", paddingRight: "2rem" },

  "py-0": { paddingTop: 0, paddingBottom: 0 },
  "py-1": { paddingTop: "0.25rem", paddingBottom: "0.25rem" },
  "py-2": { paddingTop: "0.5rem", paddingBottom: "0.5rem" },
  "py-4": { paddingTop: "1rem", paddingBottom: "1rem" },
  "py-8": { paddingTop: "2rem", paddingBottom: "2rem" },

  "pt-0": { paddingTop: 0 },
  "pt-1": { paddingTop: "0.25rem" },
  "pt-2": { paddingTop: "0.5rem" },
  "pt-4": { paddingTop: "1rem" },
  "pt-8": { paddingTop: "2rem" },

  "pr-0": { paddingRight: 0 },
  "pr-1": { paddingRight: "0.25rem" },
  "pr-2": { paddingRight: "0.5rem" },
  "pr-4": { paddingRight: "1rem" },
  "pr-8": { paddingRight: "2rem" },

  "pb-0": { paddingBottom: 0 },
  "pb-1": { paddingBottom: "0.25rem" },
  "pb-2": { paddingBottom: "0.5rem" },
  "pb-4": { paddingBottom: "1rem" },
  "pb-8": { paddingBottom: "2rem" },

  "pl-0": { paddingLeft: 0 },
  "pl-1": { paddingLeft: "0.25rem" },
  "pl-2": { paddingLeft: "0.5rem" },
  "pl-4": { paddingLeft: "1rem" },
  "pl-8": { paddingLeft: "2rem" },

  // Border Width
  border: { borderWidth: "1pt" }, // Convert 1px to 1pt
  "border-0": { borderWidth: 0 },
  "border-2": { borderWidth: "2pt" },
  "border-4": { borderWidth: "4pt" },
  "border-8": { borderWidth: "8pt" },

  "border-t": { borderTopWidth: "1pt" },
  "border-r": { borderRightWidth: "1pt" },
  "border-b": { borderBottomWidth: "1pt" },
  "border-l": { borderLeftWidth: "1pt" },

  // Border Style
  "border-solid": { borderStyle: "solid" },
  "border-dashed": { borderStyle: "dashed" },
  "border-dotted": { borderStyle: "dotted" },

  // Border Radius
  "rounded-none": { borderRadius: 0 },
  rounded: { borderRadius: "0.25rem" },
  "rounded-sm": { borderRadius: "0.125rem" },
  "rounded-md": { borderRadius: "0.375rem" },
  "rounded-lg": { borderRadius: "0.5rem" },
  "rounded-xl": { borderRadius: "0.75rem" },
  "rounded-2xl": { borderRadius: "1rem" },
  "rounded-3xl": { borderRadius: "1.5rem" },
  "rounded-full": { borderRadius: "9999px" },

  // Border Color (just a few examples)
  "border-transparent": { borderColor: "transparent" },
  "border-black": { borderColor: "#000000" },
  "border-white": { borderColor: "#ffffff" },
  "border-gray-100": { borderColor: "#f3f4f6" },
  "border-gray-200": { borderColor: "#e5e7eb" },
  "border-gray-300": { borderColor: "#d1d5db" },
  "border-gray-400": { borderColor: "#9ca3af" },
  "border-gray-500": { borderColor: "#6b7280" },
  "border-red-500": { borderColor: "#ef4444" },
  "border-blue-500": { borderColor: "#3b82f6" },
  "border-green-500": { borderColor: "#10b981" },
  "border-blue-200": { borderColor: "#bfdbfe" },

  // Background Color (just a few examples)
  "bg-transparent": { backgroundColor: "transparent" },
  "bg-black": { backgroundColor: "#000000" },
  "bg-white": { backgroundColor: "#ffffff" },
  "bg-gray-100": { backgroundColor: "#f3f4f6" },
  "bg-gray-200": { backgroundColor: "#e5e7eb" },
  "bg-gray-300": { backgroundColor: "#d1d5db" },
  "bg-gray-400": { backgroundColor: "#9ca3af" },
  "bg-gray-500": { backgroundColor: "#6b7280" },
  "bg-red-500": { backgroundColor: "#ef4444" },
  "bg-blue-100": { backgroundColor: "#dbeafe" },
  "bg-blue-500": { backgroundColor: "#3b82f6" },
  "bg-green-500": { backgroundColor: "#10b981" },

  // Text Color (just a few examples)
  "text-transparent": { color: "transparent" },
  "text-black": { color: "#000000" },
  "text-white": { color: "#ffffff" },
  "text-gray-100": { color: "#f3f4f6" },
  "text-gray-200": { color: "#e5e7eb" },
  "text-gray-300": { color: "#d1d5db" },
  "text-gray-400": { color: "#9ca3af" },
  "text-gray-500": { color: "#6b7280" },
  "text-red-500": { color: "#ef4444" },
  "text-blue-500": { color: "#3b82f6" },
  "text-blue-600": { color: "#2563eb" },
  "text-blue-800": { color: "#1e40af" },
  "text-green-500": { color: "#10b981" },

  // Font Size
  "text-xs": { fontSize: "0.75rem" }, // 9pt
  "text-sm": { fontSize: "0.875rem" }, // 10.5pt
  "text-base": { fontSize: "1rem" }, // 12pt
  "text-lg": { fontSize: "1.125rem" }, // 13.5pt
  "text-xl": { fontSize: "1.25rem" }, // 15pt
  "text-2xl": { fontSize: "1.5rem" }, // 18pt
  "text-3xl": { fontSize: "1.875rem" }, // 22.5pt
  "text-4xl": { fontSize: "2.25rem" }, // 27pt
  "text-5xl": { fontSize: "3rem" }, // 36pt
  "text-6xl": { fontSize: "3.75rem" }, // 45pt

  // Font Weight
  "font-thin": { fontWeight: 100 },
  "font-extralight": { fontWeight: 200 },
  "font-light": { fontWeight: 300 },
  "font-normal": { fontWeight: 400 },
  "font-medium": { fontWeight: 500 },
  "font-semibold": { fontWeight: 600 },
  "font-bold": { fontWeight: 700 },
  "font-extrabold": { fontWeight: 800 },
  "font-black": { fontWeight: 900 },

  // Text Alignment
  "text-left": { textAlign: "left" },
  "text-center": { textAlign: "center" },
  "text-right": { textAlign: "right" },
  "text-justify": { textAlign: "justify" },

  // Text Decoration
  underline: { textDecoration: "underline" },
  "line-through": { textDecoration: "line-through" },
  "no-underline": { textDecoration: "none" },

  // Text Transform
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  "normal-case": { textTransform: "none" },

  // Line Height
  "leading-none": { lineHeight: 1 },
  "leading-tight": { lineHeight: 1.25 },
  "leading-snug": { lineHeight: 1.375 },
  "leading-normal": { lineHeight: 1.5 },
  "leading-relaxed": { lineHeight: 1.625 },
  "leading-loose": { lineHeight: 2 },

  // Letter Spacing
  "tracking-tighter": { letterSpacing: "-0.05em" },
  "tracking-tight": { letterSpacing: "-0.025em" },
  "tracking-normal": { letterSpacing: "0em" },
  "tracking-wide": { letterSpacing: "0.025em" },
  "tracking-wider": { letterSpacing: "0.05em" },
  "tracking-widest": { letterSpacing: "0.1em" },

  // Opacity
  "opacity-0": { opacity: 0 },
  "opacity-25": { opacity: 0.25 },
  "opacity-50": { opacity: 0.5 },
  "opacity-75": { opacity: 0.75 },
  "opacity-100": { opacity: 1 },

  // Position
  static: { position: "static" },
  fixed: { position: "fixed" },
  absolute: { position: "absolute" },
  relative: { position: "relative" },

  // Top / Right / Bottom / Left
  "inset-0": { top: 0, right: 0, bottom: 0, left: 0 },
  "inset-y-0": { top: 0, bottom: 0 },
  "inset-x-0": { right: 0, left: 0 },
  "top-0": { top: 0 },
  "right-0": { right: 0 },
  "bottom-0": { bottom: 0 },
  "left-0": { left: 0 },

  // Z-Index
  "z-0": { zIndex: 0 },
  "z-10": { zIndex: 10 },
  "z-20": { zIndex: 20 },
  "z-30": { zIndex: 30 },
  "z-40": { zIndex: 40 },
  "z-50": { zIndex: 50 },
  "z-auto": { zIndex: "auto" },

  // Overflow
  "overflow-auto": { overflow: "auto" },
  "overflow-hidden": { overflow: "hidden" },
  "overflow-visible": { overflow: "visible" },
  "overflow-scroll": { overflow: "scroll" },

  // Object Fit (not supported in react-pdf, but included for completeness)
  // "object-contain": { objectFit: "contain" },
  // "object-cover": { objectFit: "cover" },
  // "object-fill": { objectFit: "fill" },
  // "object-none": { objectFit: "none" },
  // "object-scale-down": { objectFit: "scale-down" },

  // Visibility
  visible: { visibility: "visible" },
  invisible: { visibility: "hidden" },

  // Note: react-pdf doesn't support box-shadow directly, so we use the native PDF shadow properties
  "shadow-sm": {
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  shadow: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  "shadow-md": {
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  "shadow-lg": {
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  "shadow-xl": {
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
  },
  "shadow-none": {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
}

/**
 * Load styles
 *
 * @param production - Whether to load production styles (not used in this implementation)
 * @returns A mapping of class names to react-pdf style objects
 */
export function loadStyles(_production = false): Record<string, Style> {
  // In a real implementation, we would load different styles based on the environment
  // For now, we'll just return the default styles
  return DEFAULT_STYLES
}

/**
 * Save styles to the cache (not used in this implementation)
 *
 * @param styles - A mapping of class names to react-pdf style objects
 * @param production - Whether to save as production styles
 */
export function saveStyles(
  _styles: Record<string, Style>,
  _production = false
) {
  // In a real implementation, we would save the styles to a cache file
  // For now, this is a no-op
}

/**
 * Clear the style cache (not used in this implementation)
 */
export function clearCache() {
  // In a real implementation, we would clear the cache files
  // For now, this is a no-op
}
