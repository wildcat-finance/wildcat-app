type TableDataType = {
    lender: string,
    dateSubmitted: string,
    dateExecuted: string,
    amount: string,
    status: string,
    wallet: string,
    txID: string,
}
export type LenderMarketDetailsProps = {
    tableData: TableDataType[]
}