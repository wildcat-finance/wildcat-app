import { useNavigate } from "react-router-dom";
import { Button, Chip } from "../../../../components/ui-components";
import cn from 'classnames'

const VaultCard = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div className={cn("border border-tint-8 border-solid border-1 rounded-lg pt-4 pad", className)}>
      <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
        <div className="inline text-black text-xs font-bold">Blossom Dai Stablecoin</div>
        <Chip className="h-auto justify-center px-1 p-1 w-12">blsmDAI</Chip>
      </div>
      <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
        <div className="inline text-black text-xs font-bold">Annual Interest Rate</div>
        <div className="inline text-black text-xs">10%
        </div>
      </div>
      <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
        <div className="inline text-black text-xs font-bold">Maximum Capacity</div>
        <div className="inline text-black text-xs">50,000 DAI</div>
      </div>
      <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
        <div className="inline text-black text-xs font-bold">Current Reserve Ratio</div>
        <div className="inline text-black text-xs">144%</div>
      </div>
      <div className="w-full p-3">
        <Button onClick={() => navigate('/borrower/add-new-vault')} className="w-full" variant={"black"}>Go to Vault</Button>
      </div>
    </div>
  )
}

export default VaultCard;
