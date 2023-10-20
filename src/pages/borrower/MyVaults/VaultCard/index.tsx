import { useNavigate } from "react-router-dom"
import cn from "classnames"

import { Button, Chip, TableItem } from "../../../../components/ui-components"
import { VaultCardProps } from "./interface"
import { VaultStatus } from "../../../../types/vaults"
import { ChipColorVariants } from "../../../../components/ui-components/Chip/interface"

function getVaultStatusColor(status: VaultStatus): ChipColorVariants {
  switch (status) {
    case VaultStatus.ACTIVE:
      return "green"
    case VaultStatus.PENDING:
      return "yellow"
    case VaultStatus.DELINQUENT:
    case VaultStatus.PENALTY:
    case VaultStatus.REMOVED:
      return "red"
    case VaultStatus.TERMINATED:
    default:
      return "gray"
  }
}

function VaultCard({ vault, className }: VaultCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className={cn(
        "border border-tint-8 border-solid border-1 rounded-lg pt-4 pad",
        className,
      )}
    >
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold">{vault.name}</div>
        <Chip
          color={getVaultStatusColor(vault.status)}
          className="h-auto justify-center px-1 p-1"
        >
          {vault.status}
        </Chip>
      </div>

      <div>
        <TableItem title="Token asset" value={`${vault.tokenSymbol}`} />
        <TableItem
          title="Annual Interest Rate"
          value={`${vault.annualInterestRate}%`}
        />
        <TableItem
          title="Maximum Capacity"
          value={`${vault.maximumCapacity} DAI`}
        />
        <TableItem
          title="Current Reserve Ratio"
          value={`${vault.reserveRatio}%`}
        />
        <TableItem title="Available" value={`${vault.availableCapacity} DAI`} />
      </div>

      <div className="w-full p-3 bg-tint-10">
        <Button
          onClick={() => navigate("/borrower/vault-details")}
          className="w-full"
          variant="black"
        >
          Go To Market
        </Button>
      </div>
    </div>
  )
}

export default VaultCard
