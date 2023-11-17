import { DepositStatus } from "@wildcatfi/wildcat-sdk"
import { UseMutateFunction } from "@tanstack/react-query"

export const getDepositButtonText = (checkDepositStep: DepositStatus) => {
  switch (checkDepositStep.status) {
    case "InsufficientRole": {
      return "Insufficient Role"
    }
    case "InsufficientAllowance": {
      return "Approve"
    }
    default:
      return "Deposit"
  }
}

export const getDepositButtonAction = (
  checkDepositStep: DepositStatus,
  deposit: UseMutateFunction<void, unknown, string, unknown>,
  approve: UseMutateFunction<void, unknown, string, unknown>,
) => {
  switch (checkDepositStep.status) {
    case "InsufficientAllowance": {
      return approve
    }
    default:
      return deposit
  }
}
