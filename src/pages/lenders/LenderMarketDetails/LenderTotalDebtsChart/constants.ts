export const MARKET_BAR_DATA = {
  locked: {
    id: "locked",
    label: "Locked",
    healthyBgColor: "#BEBECE",
    delinquentBgColor: "#BEBECE",
    healthyTextColor: "#FFFFFF",
    delinquentTextColor: "#FFFFFF",
  },
  liquid: {
    id: "liquid",
    label: "Liquid",
    healthyBgColor: "#D6D6DE",
    delinquentBgColor: "#D6D6DE",
    healthyTextColor: "#1414144D",
    delinquentTextColor: "#1414144D",
  },
  borrowed: {
    id: "borrowed",
    label: "Borrowed",
    healthyBgColor: "#EFF0F4",
    delinquentBgColor: "#EFF0F4",
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
