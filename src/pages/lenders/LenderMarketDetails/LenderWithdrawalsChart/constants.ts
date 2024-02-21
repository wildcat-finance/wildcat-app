export const MARKET_BAR_DATA = {
  claimable: {
    id: "claimable",
    label: "Claimable",
    healthyBgColor: "#4971FF",
    delinquentBgColor: "#4971FF",
    healthyTextColor: "#FFFFFF",
    delinquentTextColor: "#FFFFFF",
  },
  ongoing: {
    id: "ongoing",
    label: "Ongoing",
    healthyBgColor: "#D6D6DE",
    delinquentBgColor: "#EFF0F4",
    healthyTextColor: "#1414144D",
    delinquentTextColor: "#1414144D",
  },
  outstanding: {
    id: "outstanding",
    label: "Outstanding",
    healthyBgColor: "",
    delinquentBgColor: "",
    healthyTextColor: "",
    delinquentTextColor: "",
  },
}

export const MARKET_BAR_ORDER = {
  healthyBarchartOrder: [
    MARKET_BAR_DATA.claimable.id,
    MARKET_BAR_DATA.ongoing.id,
  ],
  healthyLegendOrder: [
    MARKET_BAR_DATA.claimable.id,
    MARKET_BAR_DATA.ongoing.id,
    MARKET_BAR_DATA.outstanding.id,
  ],
}
