export const MARKET_BAR_DATA = {
  availableToBorrow: {
    id: "availableToBorrow",
    label: "Available to borrow",
    healthyBgColor: "#4971FF",
    delinquentBgColor: "",
    healthyTextColor: "#FFFFFF",
    delinquentTextColor: "",
  },
  borrowed: {
    id: "borrowed",
    label: "Borrowed",
    healthyBgColor: "#E4EBFE",
    delinquentBgColor: "#EFF0F4",
    healthyTextColor: "#4971FF",
    delinquentTextColor: "#1414144D",
  },
  collateralObligations: {
    id: "collateralObligations",
    label: "Collateral Obligations",
    healthyBgColor: "#EFF0F4",
    delinquentBgColor: "",
    healthyTextColor: "#1414144D",
    delinquentTextColor: "",
  },
  delinquentDebt: {
    id: "delinquentDebt",
    label: "Delinquent Debt",
    healthyBgColor: "",
    delinquentBgColor: "#F1464B",
    healthyTextColor: "",
    delinquentTextColor: "#FFFFFF",
    hide: true,
    legendDotClassName: "delinquent_dot",
  },
  currentReserves: {
    id: "currentReserves",
    label: "Current Reserves",
    healthyBgColor: "",
    delinquentBgColor: "#F7BEC1",
    healthyTextColor: "",
    delinquentTextColor: "#BD1D22",
  },
}
export const MARKET_BAR_ORDER = {
  healthyBarchartOrder: [
    MARKET_BAR_DATA.availableToBorrow.id,
    MARKET_BAR_DATA.borrowed.id,
    MARKET_BAR_DATA.collateralObligations.id,
  ],
  delinquentBarsOrder: [
    MARKET_BAR_DATA.delinquentDebt.id,
    MARKET_BAR_DATA.currentReserves.id,
    MARKET_BAR_DATA.borrowed.id,
  ],
  healthyLegendOrder: [
    MARKET_BAR_DATA.availableToBorrow.id,
    MARKET_BAR_DATA.borrowed.id,
    MARKET_BAR_DATA.collateralObligations.id,
  ],
  delinquentLegendOrder: [
    MARKET_BAR_DATA.collateralObligations.id,
    MARKET_BAR_DATA.borrowed.id,
  ],
}
