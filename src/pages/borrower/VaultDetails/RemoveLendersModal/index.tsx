import { Modal } from "../../../../components/ui-components";
import React from "react";
import { useState } from "react";

import { RemoveLendersModalProps, Lender } from "./interface";


const RemoveLendersModal = ({ lenders }: RemoveLendersModalProps) => {
    const [selectedLenders, setSelectedLenders] = useState<string[]>([]);

    const isSelected = (lenderWallet: string) => {
        return selectedLenders.includes(lenderWallet);
    }

    const handleSelectLenderWallet = (lenderWallet: string) => {
        if (isSelected(lenderWallet)) {
            setSelectedLenders(selectedLenders.filter((lender) => lender !== lenderWallet));
        } else {
            setSelectedLenders([...selectedLenders, lenderWallet]);
        }
    }
console.log("debug", selectedLenders)

    return (
        <Modal buttonName={"Remove lenders"} buttonColor={"red"}>
            <div className="text-base font-bold px-8">Remove Lenders</div>

            <div className="w-full border border-tint-10 my-3"></div>

            <div className="px-8">
                <div className="w-72 font-light text-xxs text-center mx-auto">
                    Some text about what you are about to get yourself into and can
                    you fulfill the params of doing this and make the text nice and
                    descriptive but not too waffly.
                </div>

                <div className="flex flex-col items-center gap-y-2 mt-3">
                    <div className="w-full border border-tint-10"></div>

                    <div className="text-base font-bold">You have added:</div>
                    {lenders.map((lender) => (
                        <div className="flex gap-x-4">
                            <div className="flex flex-col justify-between w-full">
                                <div className="text-xs font-medium">
                                    {lender.lenderName}
                                </div>
                                <div className="text-xs">{lender.lenderWallet}</div>
                            </div>
                            <div className='mt-2'>
                                <input
                                    type="checkbox"
                                    name="RemoveLenderCheckbox"
                                    onChange={() => handleSelectLenderWallet(lender.lenderWallet)}
                                    checked={isSelected(lender.lenderWallet)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}

export default RemoveLendersModal;