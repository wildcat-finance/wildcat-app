export const MARKET_BAR_DATA = {
  locked: {
    id: "locked",
    label: "Locked",
    healthyBgColor: "#4971FF",
    delinquentBgColor: "#4971FF",
    healthyTextColor: "#FFFFFF",
    delinquentTextColor: "#FFFFFF",
  },
  liquid: {
    id: "liquid",
    label: "Liquid",
    healthyBgColor: "#EFF0F4",
    delinquentBgColor: "#EFF0F4",
    healthyTextColor: "#1414144D",
    delinquentTextColor: "#1414144D",
  },
  borrowed: {
    id: "borrowed",
    label: "Borrowed",
    healthyBgColor: "#E4EBFE",
    delinquentBgColor: "#E4EBFE",
    healthyTextColor: "#4971FF",
    delinquentTextColor: "#4971FF",
  },
}

export const MARKET_BAR_ORDER = {
  healthyBarchartOrder: [
    MARKET_BAR_DATA.locked.id,
    MARKET_BAR_DATA.liquid.id,
    MARKET_BAR_DATA.borrowed.id,
  ],
  healthyLegendOrder: [
    MARKET_BAR_DATA.locked.id,
    MARKET_BAR_DATA.liquid.id,
    MARKET_BAR_DATA.borrowed.id,
  ],
}
