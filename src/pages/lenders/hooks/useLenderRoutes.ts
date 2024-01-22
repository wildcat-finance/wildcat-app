import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAccount } from "wagmi"
import { BASE_PATHS } from "../../../routes/constants"
import { LENDERS_PATH } from "../routes/constants"
import { useHasSignedSla } from "../../../hooks/useHasSignedSla"

export const useLenderRouting = () => {
  const { address } = useAccount()
  const { hasSignedAgreement, isLoading: isLoadingSla } = useHasSignedSla()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (!address || !isLoadingSla) {
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

      // If user not logged in, no redirect
      if ((isIndexPage && (hasSignedAgreement || !address)) || isMarketPage) {
        return
      }

      if (!hasSignedAgreement) {
        if (!isAgreementPage) {
          console.log(`navigate to agreement`)
          navigate(`${BASE_PATHS.Lender}/${LENDERS_PATH.ServiceAgreement}`)
        }
        return
      }

      if (isIndexPage || isAgreementPage) {
        navigate(`${BASE_PATHS.Lender}`)
      }
    }
  }, [pathname, hasSignedAgreement, isLoadingSla])

  return {
    isLoading: address && isLoadingSla,
  }
}
