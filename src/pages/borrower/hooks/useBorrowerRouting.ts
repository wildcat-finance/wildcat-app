import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAgreementStore } from "../../../store/useAgreementStore"
import { useGetController } from "../../../hooks/useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { BORROWER_PATHS } from "../routes/constants"

export const useBorrowerRouting = () => {
  const { data, isLoading, isSuccess } = useGetController()
  const { hasSignedAgreement } = useAgreementStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const isWhitelistPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`
    const isAgreementPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`
    const isRegisteredBorrower = data?.isRegisteredBorrower

    if (isSuccess && (isWhitelistPage || isAgreementPage)) {
      navigate(BASE_PATHS.Borrower)
    }

    if (!isRegisteredBorrower) {
      navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`)
    }

    if (isRegisteredBorrower && !hasSignedAgreement) {
      navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`)
    }
  }, [isSuccess, data?.isRegisteredBorrower, pathname, hasSignedAgreement])

  return {
    isLoading,
  }
}
