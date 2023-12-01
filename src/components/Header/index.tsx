import * as React from "react"

import { useMedia } from "react-use"
import { ReactComponent as WildcartLogo } from "../../images/wildcat-logo-white.svg"
import ConnectButton from "./ConnectButton"
import NavItem from "./NavItem"

export function Header() {
  const isDesktop = useMedia("(min-width: 768px)")

  return (
    <div className="h-20 bg-black px-8 py-4 flex items-center justify-between bg-">
      <WildcartLogo className="h-full" />
      {isDesktop && (
        <div className="flex flex-1 items-center justify-center gap-10">
          <NavItem name="Borrowers" link="/borrower" linkName="borrower" />
          <NavItem name="Lenders" link="/lender/agreement" linkName="lender" />
        </div>
      )}

      {isDesktop && <ConnectButton />}
    </div>
  )
}
