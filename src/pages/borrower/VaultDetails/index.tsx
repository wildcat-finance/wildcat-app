import { useNavigate } from "react-router-dom";
import { useState } from "react";

import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg";
import expandMore from "../../../components/ui-components/icons/expand_more.svg";
import expandLess from "../../../components/ui-components/icons/expand_less.svg";
import { Modal } from "../../../components/ui-components/Modal";
import {
  Button,
  FormItem,
  Input,
  Paper,
} from "../../../components/ui-components";
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import TableItem from "../../../components/ui-components/TableItem";
import canselRoundIcon from "../../../components/ui-components/icons/cancel.svg";
import canselRoundRedIcon from "../../../components/ui-components/icons/cancel_round_red.svg";

const VaultDetails = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

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
      lenderWallet: "0x987234oiwef8u234892384824309ljw0975a",
    },
    {
      lenderName: "Hudson",
      lenderWallet: "0x987234oiwef8u234892384824309ljw0975a",
    },
    {
      lenderName: "Hudson",
      lenderWallet: "0x987234oiwef8u234892384824309ljw0975a",
    },
  ];

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
              <Input
                className="w-full"
                placeholder="00,000.00"
                type="number"
                min={0}
                max={2750}
              />
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
                <Input
                  className="w-full"
                  placeholder="00,000.00"
                  type="number"
                  min={0}
                  max={9000}
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
                <Input
                  className="w-full"
                  placeholder="00,000.00"
                  type="number"
                  min={0}
                  max={9000}
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
              <Input
                className="w-full"
                placeholder="10.00"
                type="number"
                min={0}
              />
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
        <Modal
          buttonName={"Onboard Lender"}
          buttonColor={"blue"}
          buttonClassName="w-24 whitespace-nowrap"
        >
          <div className="text-base font-bold px-8">Onboard new Lender(s)</div>

          <div className="w-full border border-tint-10 my-3"></div>

          <div className="flex flex-col items-center gap-y-5 px-8">
            <div className="w-72 font-light text-xxs text-center ">
              Some text about what you are about to get yourself into and can
              you fulfill the params of doing this and make the text nice and
              descriptive but not too waffly.
            </div>
            <FormItem className="w-full" label="New Lender name" tooltip="test">
              <Input
                className="w-full bg-tint-11"
                placeholder="Enter name of Lender"
              />
            </FormItem>
            <FormItem
              className="w-full"
              label="New Lender wallet"
              tooltip="test"
            >
              <Input
                className="w-full bg-tint-11"
                placeholder="eg: 0x987234oiwef8u234892384824309ljw0975a"
              />
            </FormItem>
            <Button variant={"blue"} className="w-28">
              Add
            </Button>
            <div className="flex flex-col items-center gap-y-2">
              <div className="w-full border border-tint-10"></div>

              <div className="text-base font-bold">You have added:</div>
              {lenders.map((lender) => (
                <div key={lender.lenderWallet} className="flex gap-x-4">
                  <div className="flex flex-col justify-between w-full">
                    <div className="text-xs font-medium">
                      {lender.lenderName}
                    </div>
                    <div className="text-xs">{lender.lenderWallet}</div>
                  </div>
                  <button>
                    <img src={canselRoundRedIcon} className="w-5 h-5" alt=""/>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-x-3">
              <Button variant={"blue"} className="w-28">
                Submit
              </Button>
              <Button variant={"grey"} className="w-28">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>

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
          <Input className="w-72" />
        </FormItem>
        <FormItem
          className="w-72"
          label="Market contract address"
          tooltip="test"
        >
          <Input className="w-72" />
        </FormItem>
      </div>

      <div className="flex justify-between items-center">
        <ServiceAgreementCard
          title="Market Master Loan Agreement"
          description="You signed the blsmDAI Master Loan Agreement on 17-Sept-2023"
        />
        <Button variant={"red"}>Terminate Market</Button>
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
