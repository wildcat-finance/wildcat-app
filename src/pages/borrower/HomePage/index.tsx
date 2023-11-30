import { Typography } from "../../../components/ui-components"
import { getEtherscanLink } from "../../../utils/links"

const HomePage = () => (
  <div>
    <Typography variant="h1">Hello, Stranger!</Typography>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      We don’t recognise the address that you’ve connected as belonging to a
      registered borrower on the <b>Sepolia testnet</b>.{"\n\n"}
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      If you’re helping us to test while we’re prepping for mainnet launch (or
      just want a look around), you can be added as a borrower on our mock
      archcontroller by{" "}
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
        href={getEtherscanLink(
          "0x43f1db4e70ccb43ccd5d4a7bc033245254cc3909#writeContract",
          "address",
        )}
        rel="noreferrer"
        className="underline"
      >
        here
      </a>
      .
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      Once you’re authorised, you’ll be able to deploy markets, add your own
      lenders, and generally tinker around.
    </div>

    <div className="max-w-m text-m" style={{ padding: "1rem" }}>
      Welcome, and thanks for checking out Wildcat!
    </div>
  </div>
)

export default HomePage
