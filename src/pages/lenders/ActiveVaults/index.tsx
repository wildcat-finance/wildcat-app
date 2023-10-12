import { useState } from "react";
import { Button, Chip, Paper } from "../../../components/ui-components";

import TableItem from "../../../components/ui-components/TableItem";
import { BluePaper } from "../../../components/ui-components/BluePaper";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";

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
  const [activeIndexes, setActiveIndexes] = useState<boolean[]>(
    new Array(demoVaults.length).fill(false)
  );

  const toggleAccordion = (index: number) => {
    const newActiveIndexes = [...activeIndexes];
    newActiveIndexes[index] = !newActiveIndexes[index];
    setActiveIndexes(newActiveIndexes);
  };
  

  return (
    <>
      <div className="text-green text-2xl font-bold mb-12 w-2/3">
        Active Vaults
      </div>
      <div className="space-y-2">
        {demoVaults.map((vault, index) => (
          <Paper key={index} className="border-tint-8">
            <div className="flex justify-between items-center p-5">
              <div className="flex items-center">
                <div className="font-bold">{vault.name}</div>
                <Chip className="h-auto justify-center p-1 ml-4 mr-3 bg-tint-11">
                  blsmDAI
                </Chip>
                <Button variant={"blue"} className="pl-1 w-16">
                  Add
                </Button>
              </div>
              <div
                className="text-xxs underline cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                {activeIndexes[index] ? "Hide details" : "Show details"}
              </div>
            </div>
            {activeIndexes[index] && (
              <div>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Annual Interest Rate
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.annualInterestRate}%
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Grace Period
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.annualInterestRate} hours
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Maximum Capacity
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.maximumCapacity} {vault.tokenSymbol}
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Withdrawal Cycle
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.withdrawalCycle} hours
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Deposits
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.deposits} {vault.tokenSymbol}
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Reserved Assets
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.reservedAssets} {vault.tokenSymbol}
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Amount Borrowed
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.amountBorrowed} {vault.tokenSymbol}
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Pending Withdrawals
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.pendingWithdrawals} {vault.tokenSymbol}
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Current Reserves
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.currentReserves} {vault.tokenSymbol}
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Accured Protocol Fees
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.accruedProtocolFees} {vault.tokenSymbol}
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Current Reserve Ratio
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.currentReserveRatio}%
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Withdrawal Cycle Countdown
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.withdrawalCycleCountdown.hours} hrs{" "}
                      {vault.withdrawalCycleCountdown.minutes} min
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Required Reserves
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.requiredReserves} {vault.tokenSymbol}
                    </div>
                  </div>

                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Master Loan Agreement
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.masterLoanAgreement === "true"
                        ? "Acceptable"
                        : "N/A"}
                    </div>
                  </div>
                </TableItem>
                <TableItem className="grid grid-cols-2 gap-x-36">
                  <div className="w-full flex px-3 items-center flex-row leading-8 justify-between">
                    <div className="inline text-black text-xs font-bold">
                      Minimum Reserve Ratio
                    </div>
                    <div className="inline text-black text-xs">
                      {vault.minimumReserveRatio}%
                    </div>
                  </div>
                </TableItem>
                <BluePaper className="mt-11 mb-8">
                  <AiOutlineExclamationCircle height={24} />
                  <div className="text-xxs text-center max-w-xs">
                    Before you can interact with this vault please confirm
                    whether you would like an MLA (a Master Loan Agreement) on
                    this vault.
                  </div>
                </BluePaper>
                <div className="flex gap-x-5 pb-10 mx-auto w-fit">
                  <Button variant={"green"} className="w-40">
                    Show me the MLA
                  </Button>
                  <Button variant={"red"} className="w-40">
                    I don’t want the MLA
                  </Button>
                </div>
              </div>
            )}
          </Paper>
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
