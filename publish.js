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
const { tryCatch } = require("@maxmorozoff/try-catch-tuple")

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
  log(`Executing: ${command}`)
  const [result, err] = tryCatch(() =>
    execSync(command, {
      stdio: "inherit",
      ...options,
    })
  )
  if (err) {
    error(`Command failed: ${command}`)
    throw err
  }
  return result
}

// Create temp directory if it doesn't exist
if (!fs.existsSync(config.tempDir)) {
  fs.mkdirSync(config.tempDir, { recursive: true })
}

// Main process
async function main() {
  const [_, err] = await tryCatch(async () => {
    // Step 1: Install dependencies
    log("Installing dependencies...")
    exec("pnpm install")

    // Step 2: Build packages
    log("Building packages...")
    exec("pnpm build")

    // Step 3: Run tests
    log("Running tests...")
    exec("pnpm test")

    // Validate packages directory
    if (!fs.existsSync(config.packagesDir)) {
      error(`Packages directory not found: ${config.packagesDir}`)
      process.exit(1)
    }

    // Step 4: Pack packages
    log("Packing packages...")
    const packages = fs.readdirSync(config.packagesDir)

    if (packages.length === 0) {
      error(`No packages found in: ${config.packagesDir}`)
      process.exit(1)
    }

    for (const pkg of packages) {
      const pkgDir = path.join(config.packagesDir, pkg)
      if (fs.statSync(pkgDir).isDirectory()) {
        process.chdir(pkgDir)
        const [_, packError] = await tryCatch(() =>
          exec("pnpm pack --pack-destination ../../temp/")
        )
        if (packError) {
          error(`Failed to pack ${pkg}`)
          process.exit(1)
        }
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
      log("Cleaning up temporary files...")
      fs.rmSync(config.tempDir, { recursive: true, force: true })
      success("Build and pack completed successfully!")
      log("To publish packages, run this script with the --publish flag")
    }
  })

  if (err) {
    error("Publishing process failed")
    process.exit(1)
  }
}

main()
