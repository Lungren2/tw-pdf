import { describe, it, expect, vi, beforeEach } from "vitest"
import { tw, twSync, tailwind } from "./tw"
import * as styleCache from "./styleCache"

// Mock the styleCache module
vi.mock("./styleCache", () => ({
  loadStyles: vi.fn(() => ({
    "bg-blue-500": { backgroundColor: "#3b82f6" },
    "text-white": { color: "#ffffff" },
    "p-4": { padding: "1rem" },
    "rounded": { borderRadius: "0.25rem" },
  })),
}))

describe("tw function", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should process a single class", () => {
    const style = tw("bg-blue-500")
    expect(style).toEqual({ backgroundColor: "#3b82f6" })
  })

  it("should process multiple classes", () => {
    const style = tw("bg-blue-500 text-white p-4")
    expect(style).toEqual({
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "1rem",
    })
  })

  it("should ignore unknown classes", () => {
    const style = tw("bg-blue-500 unknown-class")
    expect(style).toEqual({ backgroundColor: "#3b82f6" })
  })

  it("should handle empty strings", () => {
    const style = tw("")
    expect(style).toEqual({})
  })
})

describe("twSync function", () => {
  it("should be an alias for tw", () => {
    expect(twSync).toBe(tw)
  })
})

describe("tailwind function", () => {
  it("should be an alias for tw", () => {
    expect(tailwind).toBe(tw)
  })
})
