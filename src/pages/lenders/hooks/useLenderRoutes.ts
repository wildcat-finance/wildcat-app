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

  console.log(`logging from useLenderRouting.ts`)

  console.log({
    isLoading,
    isSuccess,
    hasSignedAgreement,
    isLoadingSla,
  })

  useEffect(() => {
    if (!isLoading && !isLoadingSla) {
      const isIndexPage = pathname === BASE_PATHS.Lender
      const isAgreementPage =
        pathname === `${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`
      const isMarketPage = pathname.includes(
        `${BASE_PATHS.Lender}/${LENDERS_PATH.MarketDetails.replace(
          ":marketAddress",
          "",
        )}`,
      )

      console.log(
        `hasSignedAgreement: ${hasSignedAgreement} ${pathname} ind ${isIndexPage} agr ${isAgreementPage}`,
      )

      if ((isSuccess && isIndexPage && hasSignedAgreement) || isMarketPage) {
        return
      }

      if (!hasSignedAgreement) {
        if (!isAgreementPage) {
          console.log(`navigate to agreement`)
          navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`)
        }
        return
      }

      if (isSuccess && (isIndexPage || isAgreementPage)) {
        navigate(`${BASE_PATHS.Lender}`)
      }
    }
  }, [isSuccess, pathname, hasSignedAgreement, isLoading, isLoadingSla])

  return {
    isLoading,
  }
}
