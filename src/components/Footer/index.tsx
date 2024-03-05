import * as React from "react"
import cn from "classnames"

const FooterLinks = [
  ["Protocol", "https://wildcat.finance"],
  ["Documentation", "https://docs.wildcat.finance"],
  ["Github", "https://github.com/wildcat-finance"],
  ["Twitter", "https://twitter.com/wildcatfi"],
  ["Immunefi", "https://immunefi.com/bounty/wildcatprotocol/"],
  [
    "Privacy Policy",
    "https://docs.wildcat.finance/legal/protocol-ui-privacy-policy",
  ],
]

export function Footer() {
  return (
    <footer className="flex justify-between flex-row px-96 py-8 bg-black">
      {FooterLinks.map(([name, link]) => (
        <a
          className={cn(
            "hover:underline",
            "text-xs",
            "items-center",
            "justify-center",
            "flex",
            "flex-row",
            "gap-3",
            "text-white",
          )}
          key={name}
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
