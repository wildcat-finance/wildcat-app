import { useNavigate } from "react-router-dom";
import { Button, Chip } from "../../../../components/ui-components";
import cn from 'classnames'
import TableItem from "../../../../components/ui-components/TableItem";

const VaultCard = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div className={cn("border border-tint-8 border-solid border-1 rounded-lg pt-4 pad", className)}>
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold">Blossom Dai Stablecoin</div>
        <Chip className="h-auto justify-center px-1 p-1 w-12">blsmDAI</Chip>
      </div>
      <div>
        <TableItem title='Annual Interest Rate' value='10%' />
        <TableItem title='Maximum Capacity' value='50,000 DAI' />
        <TableItem title='Current Reserve Ratio' value='144%' />
      </div>
      <div className="w-full p-3 bg-tint-10">
        <Button onClick={() => navigate('/borrower/add-new-vault')} className="w-full" variant={"black"}>Go To Market</Button>
      </div>
    </div>
  )
}

export default VaultCard;
