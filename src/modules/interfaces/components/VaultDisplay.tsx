import { Box, Text, VStack } from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";

interface Props {
  vaultAccount: VaultAccount;
  interestRate?: boolean;
  maximumCapacity?: boolean;
  deposits?: boolean;
  collateral?: boolean;
  currentLiquidityRatio?: boolean;
  allowedLiquidityRatio?: boolean;
  gracePeriod?: boolean;
}

const VaultDatum = ({
  label,
  value,
  enable,
}: {
  label: string;
  value: string;
  enable: boolean;
}) =>
  enable ? (
    <Box>
      <Text display="inline" mr={1} fontWeight="bold">
        {label}:
      </Text>
      <Text display="inline">{value}</Text>
    </Box>
  ) : null;

export const VaultInfoSidebar = ({
  vaultAccount,
  interestRate = true,
  maximumCapacity = true,
  deposits = true,
  collateral = true,
  currentLiquidityRatio = true,
  allowedLiquidityRatio = true,
  gracePeriod = true,
}: Props) => {
  return (
    <VStack spacing={1} fontSize="12px" maxWidth="50%" align="stretch" mr={8}>
      <VaultDatum
        label="Interest Rate"
        value={`${vaultAccount.vault.annualInterestBips / 100}%`}
        enable={interestRate}
      />

      <VaultDatum
        label="Maximum Capacity"
        value={vaultAccount.vault.maxTotalSupply.format(2, true)}
        enable={maximumCapacity}
      />

      <VaultDatum
        label="Deposits"
        value={`${vaultAccount.vault.totalSupply.format(2, true)}`}
        enable={deposits}
      />
      <VaultDatum
        label="Collateral"
        value={`${vaultAccount.vault.totalAssets.format(2, true)}`}
        enable={collateral}
      />
      <VaultDatum
        label="Current Liquidity Ratio"
        value={`${
          vaultAccount.vault.collateralization.actualRatio
        }%`}
        enable={currentLiquidityRatio}
      />
      {/* @todo replace liq ratio ternary when sdk updated */}
      <VaultDatum
        label="Minimum Liquidity Ratio"
        value={`${
          vaultAccount.vault.collateralization.targetRatio
        }%`}
        enable={allowedLiquidityRatio}
      />
      <VaultDatum
        label="Grace Period (hours)"
        value={`${vaultAccount.vault.gracePeriod}`}
        enable={gracePeriod}
      />
    </VStack>
  );
};
