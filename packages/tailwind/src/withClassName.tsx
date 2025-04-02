import React, { ComponentType, forwardRef, useEffect, useState } from 'react';
import { Style } from '@react-pdf/stylesheet';
import { tw } from './index';

// Props that will be added to components
export interface ClassNameProps {
  className?: string;
  style?: Style | Style[];
}

/**
 * Higher-order component that adds className support to react-pdf components
 * 
 * @param Component - The react-pdf component to enhance
 * @returns A new component with className support
 */
export const withClassName = <P extends object>(
  Component: ComponentType<P & { style?: Style | Style[] }>
) => {
  // Create a new component with className support
  const WithClassName = forwardRef<unknown, P & ClassNameProps>(
    ({ className, style, ...props }, ref) => {
      const [processedStyle, setProcessedStyle] = useState<Style | Style[] | undefined>(style);
      
      useEffect(() => {
        if (className) {
          // Process Tailwind classes
          tw(className).then((tailwindStyle) => {
            if (style) {
              // Merge with any provided style prop (style prop takes precedence)
              if (Array.isArray(style)) {
                setProcessedStyle([tailwindStyle, ...style]);
              } else {
                setProcessedStyle([tailwindStyle, style]);
              }
            } else {
              setProcessedStyle(tailwindStyle);
            }
          });
        } else {
          setProcessedStyle(style);
        }
      }, [className, style]);
      
      // @ts-ignore - Spread props may not be valid
      return <Component ref={ref} {...props} style={processedStyle} />;
    }
  );
  
  // Set display name for debugging
  const componentName = Component.displayName || Component.name || 'Component';
  WithClassName.displayName = `withClassName(${componentName})`;
  
  return WithClassName;
};

export default withClassName;
