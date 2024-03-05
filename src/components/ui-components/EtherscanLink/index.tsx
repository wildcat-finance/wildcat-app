import cn from "classnames"
import { EtherscanBaseUrl } from "../../../config/networks"
import { EtherscanIconCircle } from "../icons"
import { EtherscanLinkProps, EtherscanLinkKind } from "./interface"

export const EtherscanLink = ({
  kind,
  value,
  children,
}: EtherscanLinkProps) => (
  <a
    className={cn(
      "hover:underline",
      "text-xs",
      "items-center",
      "justify-center",
      "flex",
      "flex-row",
      "gap-3",
      "text-blue-500",
      "hover:text-blue-600",
      "visited:text-purple-600",
      "visited:hover:text-purple-700",
    )}
    href={`${EtherscanBaseUrl}${EtherscanLinkKind[kind].replace(
      "{value}",
      value,
    )}`}
    target="_blank"
    rel="noreferrer"
  >
    <EtherscanIconCircle width="1em" height="auto" />
    {children}
  </a>
)
