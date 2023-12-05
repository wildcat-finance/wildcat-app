/* eslint-disable react/no-unescaped-entities */
import { Typography } from "../../../components/ui-components"
import { TargetChainId } from "../../../config/networks"

const HomePage = () => {
  if (TargetChainId === 1) {
    return (
      <div>
        <Typography variant="h1">Hello, Stranger!</Typography>

        <div className="max-w-m text-m mb-4">
          We don't recognise the address that you've connected as belonging to a
          registered borrower on Ethereum mainnet.
        </div>

        <div className="max-w-m text-m mb-4">
          If you're a borrower interested in using Wildcat, then get in touch
          with us via our{" "}
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

        <div className="max-w-m text-m mb-4">
          If you're interested in looking around on the Sepolia testnet instead,
          then you should head over{" "}
          <a
            target="_blank"
            href="https://testnet.wildcat.finance"
            rel="noreferrer"
            className="underline"
          >
            here{" "}
          </a>
          and you'll see instructions on how to add yourself as a borrower
          there.
        </div>

        <div className="max-w-m text-m mb-4">
          Once you're authorised, the world is your oyster.
        </div>

        <div className="max-w-m text-m mb-4">
          Welcome to the Wildcat Protocol.
        </div>
      </div>
    )
  }
  return (
    <div>
      <Typography variant="h1">Hello, Stranger!</Typography>

      <div className="max-w-m text-m mb-4">
        We don't recognise the address that you've connected as belonging to a
        registered borrower on the Sepolia testnet.
      </div>

      <div className="max-w-m text-m mb-4">
        If you're interested in looking around here instead, then you can be
        added as a borrower on our mock archcontroller by either{" "}
        <a
          target="_blank"
          href="mailto:laurence@wildcat.finance"
          rel="noreferrer"
          className="underline"
        >
          sending us{" "}
        </a>
        an address, or if you're comfortable interacting with Etherscan, adding
        yourself via the <i>registerBorrower</i> function which you can access{" "}
        <a
          target="_blank"
          href="https://sepolia.etherscan.io/address/0xa476920af80B587f696734430227869795E2Ea78#writeContract"
          rel="noreferrer"
          className="underline"
        >
          here
        </a>
        .
      </div>

      <div className="max-w-m text-m mb-4">
        If you need to get a hold of some Sepolia ETH, you can generate some
        quickly using this faucet:{" "}
        <a
          target="_blank"
          href="https://sepolia-faucet.pk910.de"
          rel="noreferrer"
          className="underline"
        >
          https://sepolia-faucet.pk910.de
        </a>
        .
      </div>

      <div className="max-w-m text-m mb-4">
        Once you're authorised, the world is your oyster.
      </div>

      <div className="max-w-m text-m mb-4">
        Welcome to the Wildcat Protocol.
      </div>
    </div>
  )
}

// const HomePage = () => (
//   <div>
//     <Typography variant="h1">Hello, Stranger!</Typography>

//     <div className="max-w-m text-m mb-4">
//       We don’t recognise the address that you’ve connected as belonging to a
//       registered borrower on the network that you’re currently connected to via
//       your wallet.
//     </div>

//     <div className="max-w-m text-m mb-4">
//       If you’re a borrower interested in using Wildcat on Ethereum mainnet, then
//       get in touch with us via our{" "}
//       <a
//         target="_blank"
//         href="https://rvficirw76q.typeform.com/to/FKBzhnmo"
//         rel="noreferrer"
//         className="underline"
//       >
//         Typeform
//       </a>
//       .
//     </div>

//     <div className="max-w-m text-m mb-4">
//       If you’re interested in looking around on the Sepolia testnet instead,
//       then you can be added as a borrower on our mock archcontroller either by{" "}
//       <a
//         target="_blank"
//         href="mailto:laurence@wildcat.finance"
//         rel="noreferrer"
//         className="underline"
//       >
//         sending us{" "}
//       </a>
//       an address, or if you’re comfortable interacting with Etherscan, you can
//       add yourself via the <i>registerBorrower</i> function{" "}
//       <a
//         target="_blank"
//         href={`${EtherscanBaseUrl}/address/0xa476920af80B587f696734430227869795E2Ea78#writeContract`}
//         rel="noreferrer"
//         className="underline"
//       >
//         here
//       </a>
//       .
//     </div>

//     <div className="max-w-m text-m mb-4">
//       Once you’re authorised on either network, the world is your oyster.
//     </div>

//     <div className="max-w-m text-m mb-4">
//       Welcome to the Wildcat Protocol.
//     </div>
//   </div>
// )

export default HomePage
