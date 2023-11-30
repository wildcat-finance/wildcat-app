import { Typography } from "../../../components/ui-components"
import { EtherscanBaseUrl } from "../../../config/networks"

const HomePage = () => (
  <div>
    <Typography variant="h1">Hello, Stranger!</Typography>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      We don’t recognise the address that you’ve connected as belonging to a
      registered borrower on the network that you’re currently connected to via
      your wallet.
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      If you’re a borrower interested in using Wildcat on Ethereum mainnet, then
      get in touch with us via our{" "}
      <a
        target="_blank"
        href="https://rvficirw76q.typeform.com/to/FKBzhnmo"
        rel="noreferrer"
        className="underline"
      >
        Typeform
      </a>
      .
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      If you’re interested in looking around on the Sepolia testnet instead,
      then you can be added as a borrower on our mock archcontroller either by{" "}
      <a
        target="_blank"
        href="mailto:laurence@wildcat.finance"
        rel="noreferrer"
        className="underline"
      >
        sending us{" "}
      </a>
      an address, or if you’re comfortable interacting with Etherscan, you can
      add yourself via the <i>registerBorrower</i> function{" "}
      <a
        target="_blank"
        href={`${EtherscanBaseUrl}/address/0xa476920af80B587f696734430227869795E2Ea78#writeContract`}
        rel="noreferrer"
        className="underline"
      >
        here
      </a>
      .
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      Once you’re authorised on either network, the world is your oyster.
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      Welcome to the Wildcat Protocol.
    </div>
  </div>
)

export default HomePage
