import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import { Style } from '@react-pdf/stylesheet';

/**
 * TailwindProcessor class for processing Tailwind CSS classes
 * This uses a single PostCSS processor instance for better performance
 */
export class TailwindProcessor {
  private processor: postcss.Processor;
  private cache: Map<string, Style>;

  /**
   * Create a new TailwindProcessor
   */
  constructor() {
    this.cache = new Map();
    this.processor = postcss([
      tailwindcss(), // Use default Tailwind configuration
    ]);
  }

  /**
   * Process Tailwind CSS classes and convert them to react-pdf style object
   *
   * @param classNames - Tailwind CSS class names
   * @returns Promise resolving to react-pdf style object
   */
  async process(classNames: string): Promise<Style> {
    // Check cache first
    if (this.cache.has(classNames)) {
      return this.cache.get(classNames) as Style;
    }

    // Create a temporary HTML content with the class names
    const html = `<div class="${classNames}"></div>`;

    // Process the HTML with Tailwind CSS
    // Use a basic CSS file with Tailwind directives
    const css = `
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
    `;

    const result = await this.processor.process(css, {
      from: undefined,
      to: undefined,
      map: false,
      // @ts-ignore - Tailwind specific options
      content: [{ raw: html, extension: 'html' }],
    });

    // Parse the CSS and convert to react-pdf style
    const style = this.parseCssToStyle(result.css, classNames);

    // Cache the result
    this.cache.set(classNames, style);

    return style;
  }

  /**
   * Parse CSS and convert to react-pdf style object
   *
   * @param css - Processed CSS
   * @param classNames - Original class names for reference
   * @returns react-pdf style object
   */
  private parseCssToStyle(css: string, classNames: string): Style {
    const style: Style = {};
    const classes = classNames.split(' ').filter(Boolean);

    // Extract CSS rules for our classes
    const cssRules = this.extractCssRules(css, classes);

    // Convert CSS rules to react-pdf style
    for (const [property, value] of Object.entries(cssRules)) {
      // Convert kebab-case to camelCase
      const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

      // Add the property to the style object
      style[camelCaseProperty] = this.convertCssValue(value);
    }

    return style;
  }

  /**
   * Extract CSS rules for specific classes
   *
   * @param css - Processed CSS
   * @param classes - Array of class names
   * @returns CSS rules object
   */
  private extractCssRules(css: string, classes: string[]): Record<string, string> {
    const rules: Record<string, string> = {};

    // Simple CSS parser to extract rules
    const cssRules = css.match(/\.[\w-]+\s*{[^}]*}/g) || [];

    for (const rule of cssRules) {
      const selectorMatch = rule.match(/\.([\w-]+)\s*{/);
      if (!selectorMatch) continue;

      const selector = selectorMatch[1];

      // Check if this selector is one of our classes
      if (classes.includes(selector)) {
        const propertiesMatch = rule.match(/{([^}]*)}/);
        if (!propertiesMatch) continue;

        const properties = propertiesMatch[1].trim();
        const declarations = properties.split(';').filter(Boolean);

        for (const declaration of declarations) {
          const [property, value] = declaration.split(':').map(s => s.trim());
          if (property && value) {
            rules[property] = value;
          }
        }
      }
    }

    return rules;
  }

  /**
   * Convert CSS value to appropriate JavaScript value
   *
   * @param value - CSS value
   * @returns JavaScript value
   */
  private convertCssValue(value: string): any {
    // Convert numeric values with units
    if (/^-?\d+(\.\d+)?(px|pt|rem|em|vh|vw|%)$/.test(value)) {
      // Keep the unit for react-pdf
      return value;
    }

    // Convert numeric values without units
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      return parseFloat(value);
    }

    // Handle colors, strings, etc.
    return value;
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}
