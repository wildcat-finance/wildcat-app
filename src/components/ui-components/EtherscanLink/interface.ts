export enum EtherscanLinkKind {
  block = "/block/{value}",
  tx = "/tx/{value}",
  address = "/address/{value}",
  code = "/address/{value}#code",
  token = "/token/{value}",
}

export type EtherscanLinkProps = {
  /** The kind of page to link to */
  kind: keyof typeof EtherscanLinkKind
  /** The value to link to - address, tx hash or block */
  value: string
  /** Text to display in the link */
  children?: React.ReactNode | string
}
