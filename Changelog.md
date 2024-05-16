# Changelog (since March 6, 2024)

**May 16, 2024**

- Added time until delinquency tracker to borrower market page
[ref](https://github.com/wildcat-finance/wildcat-app/pull/53)

**May 6, 2024**

- Fixed issue where closed markets had the withdrawal request button disabled.
[ref](https://github.com/wildcat-finance/wildcat-app/pull/51)

**April 30, 2024**
- Changed APR modal so it can be opened even if the proposed change is not possible, and to display more detailed information about how the change in APR will affect the reserve ratio 

**April 13, 2024**
- Fixed issue where markets list would not update on deployment of a new market
- Skip market update to avoid interest compounding on `authorizeLenders`

[ref](https://github.com/wildcat-finance/wildcat-app/pull/49)

**April 4, 2024**
- Replaced typeform application link with google form link

[ref](https://github.com/wildcat-finance/wildcat-app/commit/3a5ec1987327bf4fc919fa4684e2a4126b6cae07)

**March 16, 2024**
- Replaced payment history table with generic market history table
- Added editable lender aliases
- Increased polling interval for subgraph queries to reduce unnecessary load on TheGraph & client network queries
- Replaced text with Wildcat logo in landing page link in footer

[ref](https://github.com/wildcat-finance/wildcat-app/pull/48)

**March 13, 2024**
- Split up market queries into chunks to fix app failing to load due to Alchemy query limits 

[ref](https://github.com/wildcat-finance/wildcat-app/pull/47)

**March 6, 2024**
- Fixed modal closing in case of wrong network
- Changes to market details table:
  - Renamed "Market Address" to "Market Token"
  - Removed redundant "Market Name"
  - Added borrower field
- Changes to wallet connection:
  - Upgraded wagmi to newest 1.x version
  - Added WalletConnect and Coinbase Wallet as connect options
  - Removed Ledger as a connect option
    - The ledger connection had a security vulnerability and was deprecated, but Ledgers can still be used via WalletConnect.
- Added footer with links to docs, privacy policy, landing page, twitter, github and immunefi
- Made links more obvious
  - Set unvisited link color to blue and visited to purple
  - Added Etherscan icon to etherscan links

[ref](https://github.com/wildcat-finance/wildcat-app/pull/41)