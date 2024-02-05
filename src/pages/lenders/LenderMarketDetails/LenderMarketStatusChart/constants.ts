export const MARKET_BAR_DATA = {
  myLoan: {
    id: "myLoan",
    label: "My Loan",
    healthyBgColor: "#4971FF",
    delinquentBgColor: "",
    textColor: "",
  },
  otherLoans: {
    id: "otherLoans",
    label: "Other Loans",
    healthyBgColor: "#BEBECE",
    delinquentBgColor: "#D6D6DE",
    textColor: "",
  },
  availableToLend: {
    id: "availableToLend",
    label: "Available to Lend",
    healthyBgColor: "#D6D6DE",
    delinquentBgColor: "",
    textColor: "#1414144D",
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
