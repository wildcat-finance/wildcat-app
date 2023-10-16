import { useState } from "react";

import { LenderVaultItemProps } from "./interface";
import { VaultInfo } from "./VaultInfo";
import { VaultDeposit } from "./VaultDeposit";

import { Button, Chip, Paper } from "../../../../components/ui-components";
import expandMore from "../../../../components/ui-components/icons/expand_more.svg";
import expandLess from "../../../../components/ui-components/icons/expand_less.svg";

export const LenderVaultItem = ({ index, vault }: LenderVaultItemProps) => {
  const [toggleStatus, setToggleStatus] = useState(false);

  const [step, setStep] = useState(1);

  const toStep2 = () => {
    setStep(2);
  }

  const toggleAccordion = (index: number) => {
    setToggleStatus((currentToggleStatus) => !currentToggleStatus);
  };

  return (
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
        <button
          className="flex items-center gap-x-2 text-xxs underline cursor-pointer"
          onClick={() => toggleAccordion(index)}
        >
          {toggleStatus ? "Hide details" : "Show details"}
          {toggleStatus ? (
            <img src={expandLess} className="w-5" alt="Back" />
          ) : (
            <img src={expandMore} className="w-5" alt="Back" />
          )}
        </button>
      </div>

      {toggleStatus && step === 1 && <VaultInfo vault={vault} nextStep={toStep2} />}
      {toggleStatus && step === 2 && <VaultDeposit />}
    </Paper>
  );
};
