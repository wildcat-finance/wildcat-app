import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { LenderVaultItem } from "./LenderVaultItem";

const demoVaults = [
  {
    name: "Blossom Dai Stablecoin Vault",
    tokenSymbol: "DAI",
    maximumCapacity: "1000",
    reserveRatio: "20",
    annualInterestRate: "5",
    deposits: "25000",
    amountBorrowed: "16000",
    currentReserves: "9000",
    currentReserveRatio: "144",
    requiredReserves: "6250",
    minimumReserveRatio: "25",
    gracePeriod: "24",
    withdrawalCycle: "48",
    reservedAssets: "10",
    pendingWithdrawals: "0",
    accruedProtocolFees: "3",
    withdrawalCycleCountdown: { hours: 28, minutes: 39 },
    masterLoanAgreement: "false",
  },
  {
    name: "Blossom Dai Stablecoin Vault",
    tokenSymbol: "DAI",
    maximumCapacity: "1000",
    reserveRatio: "20",
    annualInterestRate: "5",
    deposits: "25000",
    amountBorrowed: "16000",
    currentReserves: "9000",
    currentReserveRatio: "144",
    requiredReserves: "6250",
    minimumReserveRatio: "25",
    gracePeriod: "24",
    withdrawalCycle: "48",
    reservedAssets: "10",
    pendingWithdrawals: "0",
    accruedProtocolFees: "3",
    withdrawalCycleCountdown: { hours: 28, minutes: 39 },
    masterLoanAgreement: "false",
  },
];

const ActiveVaults = () => {
  return (
    <>
      <div className="text-green text-2xl font-bold mb-12 w-2/3">
        Active Vaults
      </div>
      <div className="space-y-2">
        {demoVaults.map((vault, index) => (
          <LenderVaultItem key={index} index={index} vault={vault} />
        ))}
      </div>
      <ServiceAgreementCard
        className="mt-12"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </>
  );
};

export default ActiveVaults;
