import {useNavigate} from "react-router-dom";
import cn from 'classnames'

import {Button, Chip, TableItem} from "../../../../components/ui-components";
import {VaultCardProps} from "./interface";
import {VaultStatus} from "../../../../types/vaults";


function getVaultStatusColor(status: VaultStatus) {
    switch (status) {
        case VaultStatus.ACTIVE:
            return 'bg-green'
        case VaultStatus.PENDING:
            return 'bg-yellow'
        case VaultStatus.TERMINATED:
            return 'bg-gray'
        case VaultStatus.DELINQUENT:
        case VaultStatus.PENALTY:
        case VaultStatus.REMOVED:
            return 'bg-red text-white'
    }
}

const VaultCard = ({
 vault, className
}: VaultCardProps) => {
  const navigate = useNavigate();

  const statusCssClass = cn(
      'h-auto justify-center px-1 p-1',
      getVaultStatusColor(vault.status)
  )

  return (
    <div className={cn("border border-tint-8 border-solid border-1 rounded-lg pt-4 pad", className)}>
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold">{vault.name}</div>
        <Chip className={statusCssClass}>{vault.status}</Chip>
      </div>
      <div>
        <TableItem title='Token asset' value={`${vault.tokenSymbol}%`} />
        <TableItem title='Annual Interest Rate' value={`${vault.annualInterestRate}%`} />
        <TableItem title='Maximum Capacity' value={`${vault.maximumCapacity} DAI`} />
        <TableItem title='Current Reserve Ratio' value={`${vault.reserveRatio}%`} />
        <TableItem title='Available' value={`${vault.availableCapacity} DAI`} />
      </div>

      <div className="w-full p-3 bg-tint-10">
        <Button onClick={() => navigate('/borrower/vault-details')} className="w-full" variant={"black"}>Go to Vault</Button>
      </div>
    </div>
  )
}

export default VaultCard;
