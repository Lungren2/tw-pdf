#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { fileURLToPath } from "url"

// Get the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create cache directory
const cacheDir = path.join(__dirname, "cache")
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true })
}

// Create a temporary directory
const tempDir = path.join(__dirname, ".tw-pdf-temp")
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true })
}

// Create a basic CSS file with Tailwind directives
const cssPath = path.join(tempDir, "input.css")
fs.writeFileSync(
  cssPath,
  `
@tailwind base;
@tailwind components;
@tailwind utilities;
`
)

// Create a temporary HTML file with common Tailwind classes
const htmlPath = path.join(tempDir, "index.html")
fs.writeFileSync(
  htmlPath,
  `
<!DOCTYPE html>
<html>
<head>
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <div class="flex flex-col items-center justify-center p-4 m-4 bg-blue-100 text-blue-800 rounded-lg shadow-md border border-blue-200"></div>
  <div class="grid grid-cols-2 gap-4 p-6 bg-gray-100 text-gray-800 font-bold text-lg"></div>
  <div class="w-full h-10 max-w-md mx-auto my-4 bg-red-500 text-white hover:bg-red-600"></div>
</body>
</html>
`
)

// Generate the CSS file with all Tailwind classes
const outputPath = path.join(tempDir, "output.css")

try {
  console.log("Running Tailwind CLI to generate all possible styles...")
  execSync(
    `npx tailwindcss -o ${outputPath} --content "NO_CONTENT_FILE" --minify`,
    { stdio: "inherit" }
  )

  // Create a simple mapping file
  console.log("Creating style mapping...")
  const css = fs.readFileSync(outputPath, "utf-8")

  // Extract class names and styles
  const styleMap = {}
  const cssRules = css.match(/\.[\w-]+\s*{[^}]*}/g) || []

  for (const rule of cssRules) {
    const selectorMatch = rule.match(/\.([\w-]+)\s*{/)
    if (!selectorMatch) continue

    const className = selectorMatch[1]
    const style = {}

    const propertiesMatch = rule.match(/{([^}]*)}/)
    if (!propertiesMatch) continue

    const properties = propertiesMatch[1].trim()
    const declarations = properties.split(";").filter(Boolean)

    for (const declaration of declarations) {
      const [property, value] = declaration.split(":").map((s) => s.trim())
      if (property && value) {
        // Convert kebab-case to camelCase
        const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter) =>
          letter.toUpperCase()
        )

        // Convert value to appropriate type
        let processedValue = value

        // Convert numeric values without units
        if (/^-?\d+(\.\d+)?$/.test(value)) {
          processedValue = parseFloat(value)
        }

        style[camelCaseProperty] = processedValue
      }
    }

    styleMap[className] = style
  }

  // Save the styles
  const devStylesPath = path.join(cacheDir, "styles-dev.json")
  fs.writeFileSync(devStylesPath, JSON.stringify(styleMap, null, 2))

  console.log("Development styles generated successfully!")
} catch (error) {
  console.error("Error generating styles:", error)
} finally {
  // Clean up
  try {
    fs.rmSync(tempDir, { recursive: true, force: true })
  } catch (error) {
    console.warn("Could not clean up temporary directory:", error)
  }
}
