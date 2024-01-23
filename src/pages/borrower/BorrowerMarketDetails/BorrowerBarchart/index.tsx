import { MarketBarchart } from "../../../../components/ui-components/MarketBarchart"

const MOCK = [
  {
    label: "Available to borrow",
    value: "50",
    asset: "ETH",
    width: "50%",
    color: "#7DA58A",
  },
  {
    label: "Borrowed",
    value: "35",
    asset: "ETH",
    width: "35%",
    color: "#78BFC9",
  },
  {
    label: "Collateral Obligations",
    value: "15",
    asset: "ETH",
    width: "15%",
    color: "#656561",
  },
]

export const BorrowerBarchart = () => <MarketBarchart data={MOCK} />
