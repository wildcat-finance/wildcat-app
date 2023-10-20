import { useState } from "react"
import { Paper, Button } from "../../../../../components/ui-components"
import expandMore from "../../../../../components/ui-components/icons/expand_more.svg"
import expandLess from "../../../../../components/ui-components/icons/expand_less.svg"
import { ServiceAgreementCard } from "../../../../../components/ServiceAgreementCard"

function VaultInterationHistory() {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded)
  }

  const expandIcon = isExpanded ? expandLess : expandMore

  return (
    <>
      <div className="flex w-full justify-between content-center">
        <div className="text-base font-bold">Market interaction history</div>
        <Button className="flex items-center gap-x-2" onClick={toggleAccordion}>
          <p className="text-xs font-normal underline cursor-pointer">
            {isExpanded ? "Hide History" : "Show History"}
          </p>
          <img src={expandIcon} className="w-5" alt="Back" />
        </Button>
      </div>
      {isExpanded && (
        <>
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
          <ServiceAgreementCard
            className="mt-10"
            title="Wildcat Service Agreement"
            description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
          />
        </>
      )}
    </>
  )
}

export default VaultInterationHistory
