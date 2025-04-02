import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Style } from '@react-pdf/stylesheet';
import { 
  View as PDFView, 
  Text as PDFText,
  Image as PDFImage,
  Link as PDFLink,
  Page as PDFPage,
  Document as PDFDocument,
  Canvas as PDFCanvas,
  Note as PDFNote,
  TextInput as PDFTextInput,
  Svg as PDFSvg,
  G as PDFG,
  Stop as PDFStop,
  Defs as PDFDefs,
  Line as PDFLine,
  Path as PDFPath,
  Rect as PDFRect,
  Circle as PDFCircle,
  Ellipse as PDFEllipse,
  Polygon as PDFPolygon,
  Polyline as PDFPolyline,
  Tspan as PDFTspan,
  ClipPath as PDFClipPath,
  LinearGradient as PDFLinearGradient,
  RadialGradient as PDFRadialGradient
} from '@react-pdf/renderer';

import { tw } from './index';
import withClassName, { ClassNameProps } from './withClassName';

// Props for the Tailwind component
interface TailwindProps {
  className?: string;
  style?: Style;
  children: ReactNode;
}

/**
 * Tailwind component for using Tailwind CSS classes in react-pdf
 * This component processes Tailwind classes and applies them to its children
 */
export const Tailwind: FC<TailwindProps> = ({ className, style, children }) => {
  const [processedStyle, setProcessedStyle] = useState<Style>(style || {});
  
  useEffect(() => {
    if (className) {
      // Process Tailwind classes
      tw(className).then((tailwindStyle) => {
        // Merge with any provided style prop (style prop takes precedence)
        setProcessedStyle({
          ...tailwindStyle,
          ...style,
        });
      });
    }
  }, [className, style]);
  
  // Clone the child element and apply the processed style
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    
    return React.cloneElement(child, {
      style: {
        ...(child.props.style || {}),
        ...processedStyle,
      },
    });
  });
};

// Create enhanced components with className support
export const View = withClassName(PDFView);
export const Text = withClassName(PDFText);
export const Image = withClassName(PDFImage);
export const Link = withClassName(PDFLink);
export const Page = withClassName(PDFPage);
export const Document = withClassName(PDFDocument);
export const Canvas = withClassName(PDFCanvas);
export const Note = withClassName(PDFNote);
export const TextInput = withClassName(PDFTextInput);

// SVG components
export const Svg = withClassName(PDFSvg);
export const G = withClassName(PDFG);
export const Stop = withClassName(PDFStop);
export const Defs = withClassName(PDFDefs);
export const Line = withClassName(PDFLine);
export const Path = withClassName(PDFPath);
export const Rect = withClassName(PDFRect);
export const Circle = withClassName(PDFCircle);
export const Ellipse = withClassName(PDFEllipse);
export const Polygon = withClassName(PDFPolygon);
export const Polyline = withClassName(PDFPolyline);
export const Tspan = withClassName(PDFTspan);
export const ClipPath = withClassName(PDFClipPath);
export const LinearGradient = withClassName(PDFLinearGradient);
export const RadialGradient = withClassName(PDFRadialGradient);

export default Tailwind;
