import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useAccount } from "wagmi"
import { logger } from "@wildcatfi/wildcat-sdk"
import { useGetController } from "../../../hooks/useGetController"
import { BASE_PATHS } from "../../../routes/constants"
import { BORROWER_PATHS } from "../routes/constants"
import { useBorrowerInvitation } from "../../../hooks/useBorrowerInvitation"
import { TargetChainId } from "../../../config/networks"
import { useCurrentNetwork } from "../../../hooks/useCurrentNetwork"

export enum BorrowerAuthStatus {
  NotLoggedIn,
  Registered,
  NotInvited,
  PendingInvitation,
  PendingRegistration,
}

export const useBorrowerInvitationRedirect = () => {
  const { address } = useAccount()
  const { data, isLoading, isSuccess, isPaused } = useGetController()
  const { data: invitation, isLoading: isLoadingInvitation } =
    useBorrowerInvitation(address)
  const isRegisteredBorrower = data?.isRegisteredBorrower

  // - If user is not logged in, no redirect
  if (!address) {
    return { hideNewMarketButton: true }
  }
  if (isRegisteredBorrower) {
    return {}
  }
  if (isLoading || isLoadingInvitation || !isSuccess) {
    return { hideNewMarketButton: true }
  }
  if (!invitation) {
    return {
      message: `Want to borrow on Wildcat?`,
      buttonText: "Go to whitelisting",
      url: `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`,
    }
  }
  if (!invitation.timeAccepted) {
    return {
      message: "You have been invited to register as a Wildcat borrower.",
      buttonText: "Accept",
      url: `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`,
    }
  }
  return {
    message: "The Wildcat team is reviewing your registration.",
  }
}

export const useBorrowerRouting = () => {
  const { address } = useAccount()
  const { data, isLoading, isSuccess, isPaused, isFetching } =
    useGetController()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // const { isTestnet } = useCurrentNetwork()
  const { data: invitation, isLoading: isLoadingInvitation } =
    useBorrowerInvitation(address)

  // console.log(
  //   `logging from useBorrowerRouting.ts paused: ${isPaused} | loading: ${isLoading} | fetching: ${isFetching} | success: ${isSuccess} | address: ${address} | pathname: ${pathname} | data: ${data} | invitation: ${invitation}}`,
  // )
  useEffect(() => {
    const isWhitelistPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`
    const isAgreementPage =
      pathname === `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`
    const isRegisteredBorrower = data?.isRegisteredBorrower
    const isIndexPage = pathname === BASE_PATHS.Borrower
    const isPendingRegistrationPage =
      pathname ===
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.PendingRegistration}`
    const isMarketPage = pathname.includes(
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.MarketDetails.replace(
        ":marketAddress",
        "",
      )}`,
    )

    const temporaryPages = [
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`,
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`,
      `${BASE_PATHS.Borrower}/${BORROWER_PATHS.PendingRegistration}`,
    ]
    const isOnAnyTemporaryPage = temporaryPages.some(
      (page) => pathname === page,
    )

    const invitationFlowPage = () => {
      // - If user is registered borrower, go to index page
      if (isRegisteredBorrower) return BASE_PATHS.Borrower
      if (!isSuccess) return undefined
      // - If user does not have an invitation, go to whitelisting page
      if (!invitation)
        return `${BASE_PATHS.Borrower}/${BORROWER_PATHS.Whitelisting}`
      // - If user has an unsigned invitation, go to agreement page
      if (!invitation.timeAccepted)
        return `${BASE_PATHS.Borrower}/${BORROWER_PATHS.ServiceAgreement}`
      // - If user has a signed invitation, go to pending registration page
      return `${BASE_PATHS.Borrower}/${BORROWER_PATHS.PendingRegistration}`
    }
    /*
    On market page and index page, skip.

    Invitation page:
      - If user is registered borrower, go to index page
      - If user does not have an invitation, go to whitelisting page
      - If user has an unsigned invitation, go to agreement page
      - If user has a signed invitation, go to pending registration page

    Skip routing logic if:
      - User is a registered borrower and not on a temporary page
    */

    const goTo = (page: string | undefined) => {
      if (page && pathname !== page) {
        navigate(page)
      }
    }

    if (!address || (!isLoading && !isLoadingInvitation)) {
      if (isMarketPage || isIndexPage) return
      if (!isRegisteredBorrower || isOnAnyTemporaryPage) {
        const invitationPage = invitationFlowPage()
        goTo(invitationPage)
      }
    }
  }, [
    isSuccess,
    isLoading,
    isLoadingInvitation,
    data?.isRegisteredBorrower,
    pathname,
    invitation?.timeAccepted,
  ])

  return {
    isLoading: address ? isLoading : false,
    isLoadingInvitation: address ? isLoadingInvitation : false,
  }
}
