import { getMarketStatus } from "../helpers"
import { VaultStatus } from "../../types/vaults"

describe("getMarketStatus", () => {
  it("should return VaultStatus.DELINQUENT", () => {
    const result = getMarketStatus(false, true, false)
    expect(result).toBe(VaultStatus.DELINQUENT)
  })
  it("should return VaultStatus.PENALTY", () => {
    const result = getMarketStatus(true, false, true)
    expect(result).toBe(VaultStatus.PENALTY)
  })
  it("should return VaultStatus.REMOVED", () => {
    const result = getMarketStatus(true, false, false)
    expect(result).toBe(VaultStatus.REMOVED)
  })
  it("should return VaultStatus.TERMINATED", () => {
    const result = getMarketStatus(false, false, false)
    expect(result).toBe(VaultStatus.TERMINATED)
  })
})
