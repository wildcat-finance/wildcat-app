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
    const isAgreementPage =
      pathname === `${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`

    if (!hasSignedAgreement) {
      navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`)
    }

    if (isSuccess && hasSignedAgreement && isAgreementPage) {
      navigate(`${BASE_PATHS.Lender}`)
    }
  }, [isSuccess, pathname, hasSignedAgreement])

  return {
    isLoading,
  }
}
