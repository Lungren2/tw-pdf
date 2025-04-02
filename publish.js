#!/usr/bin/env node

/**
 * Automated publishing script for tw-pdf
 *
 * This script automates the following steps:
 * 1. Install dependencies
 * 2. Build packages
 * 3. Run tests
 * 4. Pack packages
 * 5. Check for errors
 * 6. Publish packages (if no errors)
 */

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Configuration
const config = {
  rootDir: process.cwd(),
  packagesDir: path.join(process.cwd(), "packages"),
  tempDir: path.join(process.cwd(), "temp"),
}

// Utility functions
const log = (message) => console.log(`\n\x1b[36m${message}\x1b[0m`)
const error = (message) => console.error(`\n\x1b[31mERROR: ${message}\x1b[0m`)
const success = (message) => console.log(`\n\x1b[32m${message}\x1b[0m`)

const exec = (command, options = {}) => {
  try {
    log(`Executing: ${command}`)
    return execSync(command, {
      stdio: "inherit",
      ...options,
    })
  } catch (err) {
    error(`Command failed: ${command}`)
    throw err
  }
}

// Create temp directory if it doesn't exist
if (!fs.existsSync(config.tempDir)) {
  fs.mkdirSync(config.tempDir, { recursive: true })
}

// Main process
async function main() {
  try {
    // Step 1: Install dependencies
    log("Installing dependencies...")
    exec("pnpm install")

    // Step 2: Build packages
    log("Building packages...")
    exec("pnpm build")

    // Step 3: Run tests
    log("Running tests...")
    exec("pnpm test")

    // Step 4: Pack packages
    log("Packing packages...")
    const packages = fs.readdirSync(config.packagesDir)

    for (const pkg of packages) {
      const pkgDir = path.join(config.packagesDir, pkg)
      if (fs.statSync(pkgDir).isDirectory()) {
        process.chdir(pkgDir)
        exec("pnpm pack --pack-destination ../../temp/")
        process.chdir(config.rootDir)
      }
    }

    // Step 5: Check for errors
    log("Checking for errors...")
    // This is already done by the build and test steps

    // Step 6: Publish packages (if no errors)
    const shouldPublish = process.argv.includes("--publish")
    if (shouldPublish) {
      log("Publishing packages...")
      exec("pnpm release")
      success("Packages published successfully!")
    } else {
      success("Build and pack completed successfully!")
      log("To publish packages, run this script with the --publish flag")
    }
  } catch (err) {
    error("Publishing process failed")
    process.exit(1)
  }
}

main()
