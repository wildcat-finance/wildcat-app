import { Button, Chip } from "../../../../components/ui-components";

const VaultCard = () => {

    return (
      <div className="w-60 border border-tint-8 border-solid border-1 rounded-lg pt-4">
        <div className="w-full flex justify-between items-center flex-row px-3 mb-4">
          <div className="inline text-black text-xs font-black">Blossom Dai Stablecoin</div>
          <Chip className="h-auto justify-center px-1 p-1 w-12">blsmDAI</Chip>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-black">Annual Interest Rate</div>
          <div className="inline text-black text-xs">10%
        </div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-black">Maximum Capacity</div>
          <div className="inline text-black text-xs">50,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-black">Current Reserve Ratio</div>
          <div className="inline text-black text-xs">144%</div>
        </div>
        <div className="w-full p-3">
          <Button className="w-full" variant={"black"}>Go to Vault</Button>
        </div>
      </div>
    )
}

export default VaultCard;