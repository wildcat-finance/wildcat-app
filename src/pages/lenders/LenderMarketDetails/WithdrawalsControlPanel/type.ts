type TableDataType = {
  lender: string
  dateSubmitted: string
  dateExecuted: string
  amount: string
  status: string
  wallet: string
  txID: string
}
export type WithdrawalsControlPanelProps = {
  tableData: TableDataType[]
}
