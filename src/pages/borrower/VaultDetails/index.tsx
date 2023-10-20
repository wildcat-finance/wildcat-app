import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Button,
  FormItem,
  Paper,
  NumberInput,
  TableItem,
} from "../../../components/ui-components";
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";

import canselRoundIcon from "../../../components/ui-components/icons/cancel.svg";
import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg";
import expandMore from "../../../components/ui-components/icons/expand_more.svg";
import expandLess from "../../../components/ui-components/icons/expand_less.svg";
import { useForm } from "react-hook-form";
import { FormSchema, validationSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import  RemoveLendersModal from "./RemoveLendersModal";
import NewLendersModal from "./NewLendersModal";

const defaultDetails: FormSchema = {
  borrow: "",
  repay: "",
  annualInterestRate: "",
  capacity: "",
};

const VaultDetails = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    setValue,
} = useForm<FormSchema>({
    defaultValues: defaultDetails,
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
});

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickMyVaults = () => {
    navigate("/borrower/my-vaults");
  };

  const expandIcon = isExpanded ? expandLess : expandMore;

  const lenders = [
    {
      lenderName: "Hudson",
      lenderWallet: "0x987234oiwef8u234892384824309ljw09751",
    },
    {
      lenderName: "Hudson",
      lenderWallet: "0x987234oiwef8u234892384824309ljw09752",
    },
    {
      lenderName: "Hudson",
      lenderWallet: "0x987234oiwef8u234892384824309ljw09753",
    },
  ];

  const handleFieldChange = (field: string, value: string | number) => {
    setValue(field as keyof typeof defaultDetails, String(value))
  }

  return (
    <div>
      <button
        className="flex items-center gap-x-2 mb-8"
        onClick={handleClickMyVaults}
      >
        <img src={arrowBack} alt="Back" />
        <p className="text-xs font-normal underline">My Markets</p>
      </button>
      <div className="text-green text-2xl font-bold mb-8 w-2/3">
        Blossom Dai Stablecoin
      </div>
      <Paper className="flex flex-col gap-y-5 border-0 px-6 py-5 mb-8 bg-tint-10 border-tint-8 rounded-3xl">
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="font-bold">Borrow</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <NumberInput decimalScale={4} onChange={(value) => handleFieldChange('borrow', value)} className="w-full" placeholder="00,000.00" />
              <Button variant={"green"} className="w-64">
                Borrow
              </Button>
            </div>
          </div>
          <div className="text-xxs text-right mt-1.5 mr-48">
            <span className="font-semibold">Borrow up to </span>
            2,750 DAI
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Repay</div>
            <div className="flex items-center gap-x-3.5 w-full max-w-lg">
              <div className="w-full">
                <NumberInput
                  decimalScale={4}
                  className="w-full"
                  placeholder="00,000.00"
                  min={0}
                  max={9000}
                  onChange={(value) => handleFieldChange('repay', value)}
                />
                <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
                  <span className="font-semibold">Repay up to </span>
                  9,000 DAI
                </div>
              </div>
              <div className="w-44 flex flex-col gap-y-1.5">
                <Button variant={"green"} className="w-full">
                  Repay
                </Button>
                <Button
                  variant={"green"}
                  className="w-full px-2 whitespace-nowrap"
                >
                  Repay to minimum reserve ratio
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between">
            <div className="font-bold mt-3">Annual interest rate (%)</div>
            <div className="flex items-center gap-x-3.5 w-full max-w-lg">
              <div className="w-full">
                <NumberInput
                  decimalScale={2}
                  className="w-full"
                  placeholder="00,000.00"
                  min={0}
                  max={9000}
                  onChange={(value) => handleFieldChange('annualInterestRate', value)}
                />
                <div className="text-xxs text-right mt-1.5 mr-auto pr-1.5 w-full">
                  <span className="font-semibold">Current </span>
                  10%
                </div>
              </div>
              <div className="w-44 flex flex-col gap-y-1.5">
                <Button variant={"green"} className="w-full">
                  Adjust
                </Button>
                <Button variant={"red"} className="w-44 px-2 whitespace-nowrap">
                  Terminate Market
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex justify-between items-center">
            <div className="font-bold">Capacity</div>
            <div className="flex gap-x-3.5 w-full max-w-lg">
              <NumberInput decimalScale={4} onChange={(value) => handleFieldChange('capacity', value)} className="w-full" placeholder="10.00" min={0} />
              <Button variant={"green"} className="w-64">
                Adjust
              </Button>
            </div>
          </div>
          <div className="text-xxs text-right mt-1.5 mr-48">
            <span className="font-semibold">Current </span>
            10%
          </div>
        </div>
      </Paper>
      <div className="text-base font-bold">Details</div>
      <div className="flex w-full mt-5 mb-8">
        <div className="w-full">
          <TableItem
            title="Capacity"
            value="50,000 DAI"
            className="pl-6 pr-24"
          />
          <TableItem title="APR" value="" className="pl-6 pr-24" />
          <TableItem title="Penalty Rate" value="10%" className="pl-6 pr-24" />
          <TableItem
            title="Minimum Reserve Ratio"
            value="25%"
            className="pl-6 pr-24"
          />
          <TableItem
            title="Withdrawal Cycle"
            value="48 hours"
            className="pl-6 pr-24"
          />
          <TableItem
            title="Grace Period"
            value="24 hours"
            className="pl-6 pr-24"
          />
          <TableItem title="" value="" className="pl-6 pr-24" />
          <TableItem title="" value="" className="pl-6 pr-24" />
        </div>
        <div className="w-full">
          <TableItem
            title="Current Supply"
            value="24 hours"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Minimum Reserves Required"
            value="25%"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Current Reserves"
            value="9,000 DAI"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Current Reserve Ratio"
            value="144%"
            className="pr-6 pl-24"
          />
          <TableItem title="Withdrawn" value="0 DAI" className="pr-6 pl-24" />
          <TableItem
            title="Upcoming Withdrawals"
            value="0 DAI"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Incurred Interests"
            value="10%"
            className="pr-6 pl-24"
          />
          <TableItem
            title="Available for Withdrawal"
            value="3 DAI"
            className="pr-6 pl-24"
          />
        </div>
      </div>

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Lenders</div>
        <div className="flex gap-x-2">
           <NewLendersModal />
          <RemoveLendersModal lenders={lenders} />
        </div>
      </div>
      <div className="mt-5 mb-8 flex w-full">
        <div className="w-52">
          <TableItem title="Name" className="pl-6" />
          <TableItem className="pl-6">
            <div className="inline text-black text-xs">Polygon Something</div>
          </TableItem>
          <TableItem className="pl-6">
            <div className="inline text-black text-xs">Polygon Something</div>
          </TableItem>
          <TableItem className="pl-6">
            <div className="inline text-black text-xs">Polygon Something</div>
          </TableItem>
          <TableItem className="pl-6">
            <div className="inline text-black text-xs">Polygon Something</div>
          </TableItem>
          <TableItem className="pl-6">
            <div className="inline text-black text-xs">Polygon Something</div>
          </TableItem>
          <TableItem className="pl-6">
            <div className="inline text-black text-xs">Polygon Something</div>
          </TableItem>
        </div>
        <div className="w-full">
          <TableItem title="Wallet" className="px-0" />
          <TableItem className="px-0 pr-6">
            <div className="inline text-black text-xs">
              0x287324837498sjdf098234lkjsef08234af
            </div>
            <Button variant={"white-brown"} className="w-24 max-h-5 gap-x-2.5">
              Pending
              <img src={canselRoundIcon} alt="Cancel" />
            </Button>
          </TableItem>
          <TableItem className="px-0 pr-6">
            <div className="inline text-black text-xs">
              0x287324837498sjdf098234lkjsef08234af
            </div>
            <Button variant={"white-brown"} className="w-24 max-h-5 gap-x-2.5">
              Pending
              <img src={canselRoundIcon} alt="Cancel" />
            </Button>
          </TableItem>
          <TableItem className="px-0 pr-6">
            <div className="inline text-black text-xs">
              0x287324837498sjdf098234lkjsef08234af
            </div>
            <Button variant={"red"} className="w-24 max-h-5 gap-x-2.5">
              Remove
              <img src={canselRoundIcon} alt="Cancel" />
            </Button>
          </TableItem>
          <TableItem className="px-0 pr-6">
            <div className="inline text-black text-xs">
              0x287324837498sjdf098234lkjsef08234af
            </div>
            <Button variant={"red"} className="w-24 max-h-5 gap-x-2.5">
              Remove
              <img src={canselRoundIcon} alt="Cancel" />
            </Button>
          </TableItem>
          <TableItem className="px-0 pr-6">
            <div className="inline text-black text-xs">
              0x287324837498sjdf098234lkjsef08234af
            </div>
            <Button variant={"red"} className="w-24 max-h-5 gap-x-2.5">
              Remove
              <img src={canselRoundIcon} alt="Cancel" />
            </Button>
          </TableItem>
          <TableItem className="px-0 pr-6">
            <div className="inline text-black text-xs">
              0x287324837498sjdf098234lkjsef08234af
            </div>
            <Button variant={"red"} className="w-24 max-h-5 gap-x-2.5">
              Remove
              <img src={canselRoundIcon} alt="Cancel" />
            </Button>
          </TableItem>
        </div>
      </div>

      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Market interaction history</div>
        <button className="flex items-center gap-x-2" onClick={toggleAccordion}>
          <p className="text-xs font-normal underline cursor-pointer">
            {isExpanded ? "Hide History" : "Show History"}
          </p>
          <img src={expandIcon} className="w-5" alt="Back" />
        </button>
      </div>
      {isExpanded && (
        <Paper className="border-tint-10 mt-5 bg-white h-48 p-5 flex flex-col gap-y-6 overflow-auto">
          <div className="text-xs">
            <div>1 Sep 2023; 13:37:00</div>
            Lender 0xdeadbeef deposited 10 DAI (example)
          </div>
          <div className="text-xs">
            <div>28 Aug 2023; 14:24:38</div>
            Borrower returned 1,000 DAI to market, new reserve ratio XX%
            (example)
          </div>
          <div className="text-xs">
            <div>28 Aug 2023; 14:24:38</div>
            Lender 0xcatcafe made withdrawal request for 9,000 DAI: 4,000 DAI
            added to the reserved assets pool, 5,000 DAI pending (example)
          </div>
        </Paper>
      )}

      <div className="text-base font-bold mt-8">
        Market Controller / Some title
      </div>
      <div className="flex flex-wrap gap-x-7 mb-8 mt-5">
        <FormItem className="w-72" label="Market type" tooltip="test">
          <NumberInput className="w-72" />
        </FormItem>
        <FormItem
          className="w-72"
          label="Market contract address"
          tooltip="test"
        >
          <NumberInput className="w-72" />
        </FormItem>
      </div>

      <div className="flex justify-between items-center">
        <ServiceAgreementCard
          title="Market Master Loan Agreement"
          description="You signed the blsmDAI Master Loan Agreement on 17-Sept-2023"
        />
      </div>

      <ServiceAgreementCard
        className="mt-10"
        title="Wildcat Service Agreement"
        description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
      />
    </div>
  );
};

export default VaultDetails;
