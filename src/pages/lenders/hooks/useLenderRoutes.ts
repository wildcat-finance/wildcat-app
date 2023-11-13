import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAgreementStore } from "../../../store/useAgreementStore"
import { useGetController } from "../../../hooks/useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { LENDERS_PATH } from "../routes/constants"

export const useLenderRouting = () => {
  const { isLoading, isSuccess } = useGetController()
  const { hasSignedAgreement } = useAgreementStore()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const isIndexPage = pathname === BASE_PATHS.Lender
    const isAgreementPage =
      pathname === `${BASE_PATHS.Lender}/${LENDERS_PATH.Agreement}`

    if (isSuccess && isIndexPage) {
      navigate(BASE_PATHS.Lender)
      return
    }

    if (!hasSignedAgreement) {
      navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.Agreement}`)
      return
    }

    if (isSuccess && (isIndexPage || isAgreementPage)) {
      navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.ActiveVaults}`)
    }
  }, [isSuccess, pathname, hasSignedAgreement])

  return {
    isLoading,
  }
}
