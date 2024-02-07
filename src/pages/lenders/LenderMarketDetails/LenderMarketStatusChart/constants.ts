export const MARKET_BAR_DATA = {
  myLoan: {
    id: "myLoan",
    label: "My Loan",
    healthyBgColor: "#4971FF",
    delinquentBgColor: "",
    healthyTextColor: "#FFFFFF",
    delinquentTextColor: "",
  },
  otherLoans: {
    id: "otherLoans",
    label: "Other Loans",
    healthyBgColor: "#EFF0F4",
    delinquentBgColor: "",
    healthyTextColor: "#1414144D",
    delinquentTextColor: "",
  },
  availableToLend: {
    id: "availableToLend",
    label: "Available to Lend",
    healthyBgColor: "#E4EBFE",
    delinquentBgColor: "#EFF0F4",
    healthyTextColor: "#4971FF",
    delinquentTextColor: "#1414144D",
  },
}

export const MARKET_BAR_ORDER = {
  healthyBarchartOrder: [
    MARKET_BAR_DATA.myLoan.id,
    MARKET_BAR_DATA.otherLoans.id,
    MARKET_BAR_DATA.availableToLend.id,
  ],
  healthyLegendOrder: [
    MARKET_BAR_DATA.myLoan.id,
    MARKET_BAR_DATA.otherLoans.id,
    MARKET_BAR_DATA.availableToLend.id,
  ],
}
