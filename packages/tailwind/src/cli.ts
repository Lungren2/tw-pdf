#!/usr/bin/env node

import { Command } from "commander"
import fs from "fs"
import path from "path"
import { execSync } from "child_process"
import { cssToStyles, cssFileToStyles } from "./cssToStyles"
import { saveStyles, clearCache } from "./styleCache"
import packageJson from "../package.json"

// Create a command-line program
const program = new Command()

program
  .name("tw-pdf")
  .description("CLI for tw-pdf")
  .version(packageJson.version)

// Initialize command
program
  .command("init")
  .description("Initialize tw-pdf in your project")
  .action(() => {
    console.log("Initializing tw-pdf...")

    // Update .gitignore
    try {
      const gitignorePath = path.join(process.cwd(), ".gitignore")
      let gitignoreContent = ""

      if (fs.existsSync(gitignorePath)) {
        gitignoreContent = fs.readFileSync(gitignorePath, "utf-8")
      }

      // Add node_modules/tw-pdf/cache to .gitignore if not already there
      if (!gitignoreContent.includes("node_modules/tw-pdf/cache")) {
        gitignoreContent += "\n# tw-pdf cache\nnode_modules/tw-pdf/cache\n"
        fs.writeFileSync(gitignorePath, gitignoreContent)
        console.log("Added tw-pdf cache to .gitignore")
      }
    } catch (error) {
      console.warn("Could not update .gitignore:", error)
    }

    console.log("tw-pdf initialized successfully!")
  })

// Generate development styles command
program
  .command("generate-dev")
  .description("Generate complete Tailwind styles for development")
  .action(() => {
    console.log("Generating complete Tailwind styles for development...")

    // Create a temporary directory
    const tempDir = path.join(process.cwd(), ".tw-pdf-temp")
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

    // Create a temporary HTML file with a div that has all possible classes
    // This is a hack to make Tailwind generate all possible classes
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
  <div class="all-classes-here"></div>
</body>
</html>
`
    )

    // Generate the CSS file with all Tailwind classes
    const outputPath = path.join(tempDir, "output.css")
    
    try {
      console.log("Running Tailwind CLI to generate styles...")
      execSync(
        `npx tailwindcss -i ${cssPath} -o ${outputPath} --content "${htmlPath}" --minify=false`,
        { stdio: "inherit" }
      )

      // Convert the CSS to styles
      console.log("Converting CSS to styles...")
      const styles = cssFileToStyles(outputPath)

      // Save the styles
      saveStyles(styles, false)

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
  })

// Generate production styles command
program
  .command("generate-prod")
  .description("Generate optimized Tailwind styles for production")
  .action(() => {
    console.log("Generating optimized Tailwind styles for production...")

    // Create a temporary directory
    const tempDir = path.join(process.cwd(), ".tw-pdf-temp")
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

    // Generate the CSS file with optimized Tailwind classes
    const outputPath = path.join(tempDir, "output.css")
    
    try {
      console.log("Running Tailwind CLI to generate styles...")
      execSync(
        `npx tailwindcss -i ${cssPath} -o ${outputPath} --minify=true`,
        { stdio: "inherit" }
      )

      // Convert the CSS to styles
      console.log("Converting CSS to styles...")
      const styles = cssFileToStyles(outputPath)

      // Save the styles
      saveStyles(styles, true)

      console.log("Production styles generated successfully!")
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
  })

// Clear cache command
program
  .command("clear-cache")
  .description("Clear the tw-pdf cache")
  .action(() => {
    console.log("Clearing tw-pdf cache...")
    clearCache()
    console.log("Cache cleared successfully!")
  })

// Parse command-line arguments
program.parse()
