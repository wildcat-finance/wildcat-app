import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetController } from "../../../hooks/useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { LENDERS_PATH } from "../routes/constants"
import { useHasSignedSla } from "../../../hooks/useHasSignedSla"

export const useLenderRouting = () => {
  const { isLoading, isSuccess } = useGetController()
  const { hasSignedAgreement, isLoading: isLoadingSla } = useHasSignedSla()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const isAgreementPage =
      pathname === `${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`

    console.log(
      `hasSignedAgreement: ${hasSignedAgreement} ${pathname} ind ${isAgreementPage} agr ${isAgreementPage}`,
    )

    if (isSuccess && isAgreementPage) {
      navigate(BASE_PATHS.Lender)
      return
    }

    if (!hasSignedAgreement) {
      console.log(`navigate to agreement`)
      navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`)
      return
    }

    if (isSuccess && hasSignedAgreement && isAgreementPage) {
      navigate(`${BASE_PATHS.Lender}`)
    }
  }, [isSuccess, pathname, hasSignedAgreement, isLoadingSla])

  return {
    isLoading,
  }
}
