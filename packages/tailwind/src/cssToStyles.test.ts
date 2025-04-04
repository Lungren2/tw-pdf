import { describe, it, expect, vi } from "vitest"
import { cssToStyles } from "./cssToStyles"
import fs from "fs"

// Mock fs module
vi.mock("fs", () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}))

describe("cssToStyles", () => {
  it("should convert CSS to react-pdf style objects", () => {
    const css = `
      .bg-blue-500 {
        background-color: #3b82f6;
      }
      .text-white {
        color: #ffffff;
      }
      .p-4 {
        padding: 1rem;
      }
      .rounded {
        border-radius: 0.25rem;
      }
    `

    const styles = cssToStyles(css)

    expect(styles).toEqual({
      "bg-blue-500": { backgroundColor: "#3b82f6" },
      "text-white": { color: "#ffffff" },
      "p-4": { padding: "1rem" },
      "rounded": { borderRadius: "0.25rem" },
    })
  })

  it("should handle empty CSS", () => {
    const styles = cssToStyles("")
    expect(styles).toEqual({})
  })

  it("should handle CSS with no classes", () => {
    const css = `
      body {
        margin: 0;
        padding: 0;
      }
    `
    const styles = cssToStyles(css)
    expect(styles).toEqual({})
  })

  it("should convert kebab-case properties to camelCase", () => {
    const css = `
      .flex-row {
        flex-direction: row;
      }
      .text-center {
        text-align: center;
      }
    `
    const styles = cssToStyles(css)
    expect(styles).toEqual({
      "flex-row": { flexDirection: "row" },
      "text-center": { textAlign: "center" },
    })
  })

  it("should convert numeric values without units to numbers", () => {
    const css = `
      .flex-1 {
        flex: 1;
      }
      .z-10 {
        z-index: 10;
      }
    `
    const styles = cssToStyles(css)
    expect(styles).toEqual({
      "flex-1": { flex: 1 },
      "z-10": { zIndex: 10 },
    })
  })

  it("should keep numeric values with units as strings", () => {
    const css = `
      .w-10 {
        width: 2.5rem;
      }
      .h-50 {
        height: 50%;
      }
    `
    const styles = cssToStyles(css)
    expect(styles).toEqual({
      "w-10": { width: "2.5rem" },
      "h-50": { height: "50%" },
    })
  })
})
