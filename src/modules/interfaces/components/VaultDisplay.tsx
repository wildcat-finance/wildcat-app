import * as CSS from "csstype";
import {
  Box,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";
import moment from "moment";

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
type Color = CSS.Property.Color;
const VaultDatum = ({
  label,
  value,
  enable,
  labelColor,
  valueColor,
  labelTooltip,
  valueTooltip,
}: {
  label: string;
  value: string;
  enable: boolean;
  labelColor?: Color;
  valueColor?: Color;
  labelTooltip?: string;
  valueTooltip?: string;
}) => {
  const Wrapper = ({
    children,
    tooltip,
  }: {
    children: React.ReactNode;
    tooltip?: string;
  }) => {
    if (tooltip) {
      return <Tooltip label={tooltip}>{children}</Tooltip>;
    }
    return <>{children}</>;
  };
  return enable ? (
    <Box>
      <Wrapper tooltip={labelTooltip}>
        <Text color={labelColor} display="inline" mr={1} fontWeight="bold">
          {label}:
        </Text>
      </Wrapper>
      <Wrapper tooltip={valueTooltip}>
        <Text color={valueColor} display="inline">
          {value}
        </Text>
      </Wrapper>
    </Box>
  ) : null;
};

const stripTrailingZeroes = (str: string) =>
  str.replace(/((?<=\.\d+)|(\.))0+$/, "");

const pctString = (num: number) => `${stripTrailingZeroes(num.toFixed(2))}%`;

const DelinquencyInfo = ({ vaultAccount }: { vaultAccount: VaultAccount }) => {
  return (
    <Box>
      <Text color={"red"} display="inline" mr={1} fontWeight="bold">
        Vault is Delinquent
      </Text>
      <VaultDatum
        labelColor="red"
        valueColor="red"
        label="Delinquent Debt"
        value={vaultAccount.vault.delinquentDebt.format(2, true)}
        valueTooltip={vaultAccount.vault.delinquentDebt.raw.toString()}
        enable={true}
      />
    </Box>
  );
};

const Collateralization = ({
  vaultAccount,
}: {
  vaultAccount: VaultAccount;
}) => {
  return (
    <>
      <VaultDatum
        label="Collateral"
        valueColor={vaultAccount.vault.isDelinquent ? "red" : undefined}
        value={`${vaultAccount.vault.totalAssets.format(2, true)} (${pctString(
          vaultAccount.vault.collateralization.actualRatio
        )})`}
        valueTooltip={`${vaultAccount.vault.totalAssets.format(
          undefined,
          true
        )} (${vaultAccount.vault.collateralization.actualRatio}%)`}
        enable
      />
      {vaultAccount.vault.isDelinquent && (
        <DelinquencyInfo vaultAccount={vaultAccount} />
      )}
      <VaultDatum
        label="Required Collateral"
        value={`${vaultAccount.vault.coverageLiquidity.format(
          2,
          true
        )} (${pctString(vaultAccount.vault.collateralization.targetRatio)})`}
        enable
      />
    </>
  );
};

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
      {/* <VaultDatum
        label="Current Liquidity Ratio"
        value={`${vaultAccount.vault.collateralization.actualRatio}%`}
        enable={currentLiquidityRatio}
      /> */}
      {collateral && <Collateralization vaultAccount={vaultAccount} />}
      {allowedLiquidityRatio &&
        (vaultAccount.vault.collateralization.isTemporary ? (
          <>
            <VaultDatum
              label="Temporary Minimum Liquidity Ratio"
              value={`${vaultAccount.vault.collateralization.targetRatio}%`}
              enable={true}
              labelColor="red"
            />
            <VaultDatum
              label="Normal Minimum Liquidity Ratio"
              value={`${vaultAccount.vault.collateralization.originalTargetRatio}%`}
              enable={true}
            />
            <VaultDatum
              label="Temporary Ratio Expiry"
              value={`${moment
                .unix(
                  vaultAccount.vault.collateralization.temporaryExpiry as number
                )
                .fromNow()}`}
              enable={true}
              valueTooltip={moment
                .unix(
                  vaultAccount.vault.collateralization.temporaryExpiry as number
                )
                .format("dddd, MMMM Do YYYY, h:mm a")}
            />
          </>
        ) : (
          <VaultDatum
            label="Minimum Liquidity Ratio"
            value={`${vaultAccount.vault.collateralization.targetRatio}%`}
            enable={allowedLiquidityRatio}
          />
        ))}

      <VaultDatum
        label="Grace Period (hours)"
        value={`${vaultAccount.vault.gracePeriod}`}
        enable={gracePeriod}
      />
    </VStack>
  );
};
