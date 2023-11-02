import { Token } from "@wildcatfi/wildcat-sdk"

import { NewMarketFormSchema } from "../validationSchema"

export type MarketPreviewModalProps = {
  newMarketParams: NewMarketFormSchema
  token?: Token
  handleSubmit: () => void
  isDeploying: boolean
}
