import * as React from "react"
import cn from "classnames"
import { ReactComponent as WildcatLogo } from "../../images/wildcat-logo-white.svg"

const FooterLinks = [
  ["protocol", <WildcatLogo className="h-full" />, "https://wildcat.finance"],
  ["Documentation", "Documentation", "https://docs.wildcat.finance"],
  ["Github", "Github", "https://github.com/wildcat-finance"],
  ["Twitter", "Twitter", "https://twitter.com/wildcatfi"],
  ["Immunefi", "Immunefi", "https://immunefi.com/bounty/wildcatprotocol/"],
  [
    "Privacy Policy",
    "Privacy Policy",
    "https://docs.wildcat.finance/legal/protocol-ui-privacy-policy",
  ],
] as const

export function Footer() {
  return (
    <footer className="flex justify-between flex-row px-96 py-8 bg-black w-full gap-x-3">
      {FooterLinks.map(([key, name, link]) => (
        <a
          className={cn(
            "hover:underline",
            "text-xs",
            "items-center",
            "justify-center",
            "flex",
            "text-white",
            "h-12",
          )}
          key={key}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>
      ))}
    </footer>
  )
}
