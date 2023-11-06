import { Token } from "@wildcatfi/wildcat-sdk"

import { useNewMarketForm } from "../hooks/useNewMarketForm"

export type MarketPreviewModalProps = {
  getValues: ReturnType<typeof useNewMarketForm>["getValues"]
  validateForm: ReturnType<typeof useNewMarketForm>["trigger"]
  selectedVaultType: string
  token?: Token
  handleSubmit: () => void
  isDeploying: boolean
  disabled: boolean
}
