import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useBorrowerAgreementStore } from "../store/useBorrowerStore"
import { useGetController } from "./useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { BORROWER_PATHS } from "../routes"

export const useBorrowerRouting = () => {
  const { data, isLoading, isSuccess } = useGetController()
  const { hasSignedAgreement } = useBorrowerAgreementStore()
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
      navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.MyVaults}`)
    }
  }, [isSuccess, data?.isRegisteredBorrower, pathname, hasSignedAgreement])

  return {
    isLoading,
  }
}
