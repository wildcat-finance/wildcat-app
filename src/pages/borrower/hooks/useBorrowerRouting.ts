import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAccount } from "wagmi"
import { useGetController } from "../../../hooks/useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { BORROWER_PATHS } from "../routes/constants"
import { useBorrowerInvitation } from "../../../hooks/useBorrowerInvitation"

export const useBorrowerRouting = () => {
  const { address } = useAccount()
  const { data, isLoading, isSuccess } = useGetController()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { data: invitation, isLoading: isLoadingInvitation } =
    useBorrowerInvitation(address)

  useEffect(() => {
    const isIndexPage = pathname === BASE_PATHS.Borrower
    const isAgreementPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Agreement}`
    const isRegisteredBorrower = data?.isRegisteredBorrower

    if (!isRegisteredBorrower && invitation) {
      if (!invitation.timeAccepted) {
        navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.Agreement}`)
      } else {
        navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.PendingRegistration}`)
      }
    }

    if (isSuccess && !isRegisteredBorrower && !isIndexPage) {
      navigate(BASE_PATHS.Borrower)
      return
    }

    if (isSuccess && isRegisteredBorrower && (isIndexPage || isAgreementPage)) {
      navigate(`${BASE_PATHS.Borrower}/${BORROWER_PATHS.MarketsList}`)
    }
  }, [isSuccess, data?.isRegisteredBorrower, pathname])

  return {
    isLoading,
    isLoadingInvitation,
  }
}
