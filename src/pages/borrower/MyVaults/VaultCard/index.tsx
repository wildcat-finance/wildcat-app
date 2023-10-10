import { useNavigate } from "react-router-dom";
import { Button, Chip } from "../../../../components/ui-components";
import cn from 'classnames'
import TableItem from "../../../../components/ui-components/TableItem";
import {VaultCardProps} from "./interface";

const VaultCard = ({
 vault, className
}: VaultCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("border border-tint-8 border-solid border-1 rounded-lg pt-4 pad", className)}>
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold">{vault.name}</div>
        <Chip className="h-auto justify-center px-1 p-1 w-12">{vault.tokenSymbol}</Chip>
      </div>
      <div>
        <TableItem title='Annual Interest Rate' value={`${vault.annualInterestRate}%`} />
        <TableItem title='Maximum Capacity' value={`${vault.maximumCapacity} DAI`} />
        <TableItem title='Current Reserve Ratio' value={`${vault.reserveRatio}%`} />
      </div>

      <div className="w-full p-3 bg-tint-10">
        <Button onClick={() => navigate('/borrower/vault-details')} className="w-full" variant={"black"}>Go to Vault</Button>
      </div>
    </div>
  )
}

export default VaultCard;
