import { MarketAccount, TokenAmount } from "@wildcatfi/wildcat-sdk"

export type WithdrawalFormProps = {
  marketAccount: MarketAccount
  totalSupply: TokenAmount
}
