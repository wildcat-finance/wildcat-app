export const MARKET_BAR_DATA = {
  availableToBorrow: {
    id: "availableToBorrow",
    label: "Available to borrow",
    healthyBgColor: "#4971FF",
    delinquentBgColor: "",
    textColor: "",
  },
  borrowed: {
    id: "borrowed",
    label: "Borrowed",
    healthyBgColor: "#BEBECE",
    delinquentBgColor: "#D6D6DE",
    textColor: "",
  },
  collateralObligations: {
    id: "collateralObligations",
    label: "Collateral Obligations",
    healthyBgColor: "#D6D6DE",
    delinquentBgColor: "",
    textColor: "#1414144D",
  },
  delinquentDebt: {
    id: "delinquentDebt",
    label: "Delinquent Debt",
    healthyBgColor: "#D6D6DE",
    delinquentBgColor: "#D6D6DE",
    textColor: "#1414144D",
    hide: true,
    legendDotClassName: "delinquent_dot",
  },
  currentReserves: {
    id: "currentReserves",
    label: "Current Reserves",
    healthyBgColor: "",
    delinquentBgColor: "#F7BEC1",
    textColor: "#BD1D22",
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
  delinquentLegendOrder: [
    MARKET_BAR_DATA.collateralObligations.id,
    MARKET_BAR_DATA.borrowed.id,
  ],
}
