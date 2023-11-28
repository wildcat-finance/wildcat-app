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
    const isIndexPage = pathname === BASE_PATHS.Borrower
    const isAgreementPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Agreement}`
    const isRegisteredBorrower = data?.isRegisteredBorrower

    if (isSuccess && !isRegisteredBorrower && !isIndexPage) {
      navigate(BASE_PATHS.Borrower)
      return
    }

    if (isRegisteredBorrower && !hasSignedAgreement) {
      navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.Agreement}`)
      return
    }

    if (isSuccess && isRegisteredBorrower && (isIndexPage || isAgreementPage)) {
      navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.MarketsList}`)
    }
  }, [isSuccess, data?.isRegisteredBorrower, pathname, hasSignedAgreement])

  return {
    isLoading,
  }
}
