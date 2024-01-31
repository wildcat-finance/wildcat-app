export const MARKET_BAR_DATA = {
  availableToBorrow: {
    id: "availableToBorrow",
    label: "Available to borrow",
    healthyBgColor: "#4971FF",
    delinquentBgColor: null,
    textColor: null,
  },
  borrowed: {
    id: "borrowed",
    label: "Borrowed",
    healthyBgColor: "#BEBECE",
    delinquentBgColor: "#D6D6DE",
    textColor: null,
  },
  collateralObligations: {
    id: "collateralObligations",
    label: "Collateral Obligations",
    healthyBgColor: "#D6D6DE",
    delinquentBgColor: null,
    textColor: "#1414144D",
  },
  nonCollateralInterest: {
    id: "nonCollateralInterest",
    label: "Non-collateral Interest",
    healthyBgColor: "#EFF0F4",
    delinquentBgColor: "#EFF0F4",
    textColor: "#14141433",
  },
  delinquentDebt: {
    id: "delinquentDebt",
    label: "Delinquent Debt",
    healthyBgColor: null,
    delinquentBgColor: "#F1464B",
    textColor: null,
  },
  currentReserves: {
    id: "currentReserves",
    label: "Current Reserves",
    healthyBgColor: null,
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
