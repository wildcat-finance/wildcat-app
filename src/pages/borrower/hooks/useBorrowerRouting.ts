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

    console.log({
      isLoading,
      isRegisteredBorrower,
      hasSignedAgreement,
      isWhitelistPage,
      isAgreementPage,
      isSuccess,
    })

    if (!isLoading) {
      if (!isRegisteredBorrower) {
        console.log(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`)
        if (!isWhitelistPage) {
          navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`)
        }
        return
      }

      if (isRegisteredBorrower && !hasSignedAgreement) {
        console.log(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`)
        navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`)
        return
      }

      if (isSuccess && (isWhitelistPage || isAgreementPage)) {
        console.log(BASE_PATHS.Borrower)
        navigate(BASE_PATHS.Borrower)
      }
    }
  }, [
    isSuccess,
    data?.isRegisteredBorrower,
    pathname,
    hasSignedAgreement,
    isLoading,
  ])

  return {
    isLoading,
  }
}
