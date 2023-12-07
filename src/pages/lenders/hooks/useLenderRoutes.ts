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
    const isIndexPage = pathname === BASE_PATHS.Lender
    const isAgreementPage =
      pathname === `${BASE_PATHS.Lender}/${LENDERS_PATH.Agreement}`

    console.log(
      `hasSignedAgreement: ${hasSignedAgreement} ${pathname} ind ${isIndexPage} agr ${isAgreementPage}`,
    )

    if (isSuccess && isIndexPage) {
      navigate(BASE_PATHS.Lender)
      return
    }

    if (!hasSignedAgreement) {
      console.log(`navigate to agreement`)
      navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.Agreement}`)
      return
    }

    if (isSuccess && (isIndexPage || isAgreementPage)) {
      navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.ActiveVaults}`)
    }
  }, [isSuccess, pathname, hasSignedAgreement, isLoadingSla])

  return {
    isLoading,
  }
}
