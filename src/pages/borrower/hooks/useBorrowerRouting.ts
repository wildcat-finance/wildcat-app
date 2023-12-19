import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAccount } from "wagmi"
import { logger } from "@wildcatfi/wildcat-sdk"
import { useGetController } from "../../../hooks/useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { BORROWER_PATHS } from "../routes/constants"
import { useBorrowerInvitation } from "../../../hooks/useBorrowerInvitation"
import { TargetChainId } from "../../../config/networks"

export const useBorrowerRouting = () => {
  const { address } = useAccount()
  const { data, isLoading, isSuccess } = useGetController()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { data: invitation, isLoading: isLoadingInvitation } =
    useBorrowerInvitation(address)

  useEffect(() => {
    const isWhitelistPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`
    const isAgreementPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`
    const isRegisteredBorrower = data?.isRegisteredBorrower
    const isPendingRegistrationPage =
      pathname ===
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.PendingRegistration}`
    const isMarketPage = pathname.includes(
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.MarketDetails.replace(
        ":marketAddress",
        "",
      )}`,
    )

    console.log({
      isLoading,
      isRegisteredBorrower,
      isWhitelistPage,
      isAgreementPage,
      isSuccess,
      invitation,
    })

    if (!isLoading && !isLoadingInvitation) {
      if (isMarketPage) return

      if (invitation) {
        // If there is a pending un-signed invitation, go to agreement page
        if (!invitation.timeAccepted) {
          if (!isAgreementPage) {
            navigate(
              `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`,
            )
          }
        } else if (
          isRegisteredBorrower &&
          (isWhitelistPage || isAgreementPage || isPendingRegistrationPage)
        ) {
          // If there is a signed invitation and borrower is registered, go to index page
          navigate(BASE_PATHS.Borrower)
        } else if (!isPendingRegistrationPage) {
          navigate(
            `${BASE_PATHS.Borrower}/${BORROWER_PATHS.PendingRegistration}`,
          )
        }

        return
      }

      // Go to whitelisting page if borrower is not registered or invited
      if (isSuccess && !isRegisteredBorrower && !isWhitelistPage) {
        navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`)
        return
      }

      // Go to index page if borrower is registered and not on index page
      if (
        isSuccess &&
        isRegisteredBorrower &&
        (isWhitelistPage || isAgreementPage || isPendingRegistrationPage)
      ) {
        navigate(BASE_PATHS.Borrower)
      }
    }
  }, [isSuccess, data?.isRegisteredBorrower, pathname])

  return {
    isLoading,
    isLoadingInvitation,
  }
}
