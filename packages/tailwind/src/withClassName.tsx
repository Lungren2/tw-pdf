import React, { ComponentType, forwardRef } from "react"
import { Style } from "@react-pdf/stylesheet"
import { tw } from "./tw"

// Props that will be added to components
export interface ClassNameProps {
  className?: string
  style?: Style | Style[]
}

/**
 * Higher-order component that adds className support to react-pdf components
 *
 * @param Component - The react-pdf component to enhance
 * @returns A new component with className support
 */
export const withClassName = <P extends object>(
  Component: ComponentType<P>
) => {
  // Create a new component with className support
  const WithClassName = forwardRef<unknown, P & ClassNameProps>(
    ({ className, style, ...props }, ref) => {
      // Process className and style
      let processedStyle: Style | Style[] | undefined = style

      if (className) {
        // Process Tailwind classes (now synchronous)
        const tailwindStyle = tw(className)

        if (style) {
          // Merge with any provided style prop (style prop takes precedence)
          if (Array.isArray(style)) {
            processedStyle = [tailwindStyle, ...style]
          } else {
            processedStyle = [tailwindStyle, style]
          }
        } else {
          processedStyle = tailwindStyle
        }
      }

      // @ts-ignore - Spread props may not be valid
      return <Component ref={ref} {...props} style={processedStyle} />
    }
  )

  // Set display name for debugging
  const componentName = Component.displayName || Component.name || "Component"
  WithClassName.displayName = `withClassName(${componentName})`

  return WithClassName
}

export default withClassName
