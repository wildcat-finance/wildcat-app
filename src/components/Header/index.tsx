import * as React from "react"

import { Link } from "react-router-dom"
import { ReactComponent as WildcartLogo } from "../../images/wildcat-logo-white.svg"
import ConnectButton from "./ConnectButton"
import NavItem from "./NavItem"

export function Header() {
  const isMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ]

    return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem))
  }

  return (
    <div className="h-20 bg-black px-8 py-4 flex items-center justify-between bg-">
      <Link to="/" className="h-full">
        <WildcartLogo className="h-full" />
      </Link>
      {!isMobile() && (
        <div className="flex flex-1 items-center justify-center gap-10">
          <NavItem name="Borrowers" link="/borrower" linkName="borrower" />
          <NavItem name="Lenders" link="lender" linkName="lender" />
        </div>
      )}

      {!isMobile() && <ConnectButton />}
    </div>
  )
}
