import { useState } from "react"
import { useNavigate } from "react-router-dom";

import { Select, TextInput } from '../../../components/ui-components';
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { Button } from '../../../components/ui-components/Button';
import VaultCard from './VaultCard';

import { mockedVaults, mockedUnderlyingAssets, mockedRatios } from '../../../mocks/vaults'
import {SelectOptionItem} from "../../../components/ui-components/Select/interface";
import {Text} from "@chakra-ui/react";

const mockedUnderlyingAssetsOptions: SelectOptionItem[] = mockedUnderlyingAssets.map((tokenSymbol) => ({
    id: tokenSymbol,
    label: tokenSymbol,
    value: tokenSymbol
}))

const mockedVaultRatioOptions: SelectOptionItem[] = mockedRatios
    .sort()
    .map((ratio) => ({
        id: ratio,
        label: ratio,
        value: ratio
    }))

const MyVaults = () => {
    const navigate = useNavigate();
    const [filterByName, setFilterByName] = useState<string>('')
    const [selectedUnderlyingAsset, setSelectedUnderlyingAsset] = useState<SelectOptionItem | null>(null)
    const [selectedVaultRatio, setSelectedVaultRatio] = useState<SelectOptionItem | null>(null)

    const handleFilterByName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target
        setFilterByName(value.toLowerCase());
    }

    const filteredMockedVaults = mockedVaults
    .filter((vault) => {
        if (!filterByName) return true;
        return vault.name.toLowerCase().includes(filterByName);
    })
    .filter((vault) => {
        if (!selectedUnderlyingAsset) return true;
        return vault.tokenSymbol === selectedUnderlyingAsset.value;
    })
    .filter((vault) => {
        if (!selectedVaultRatio) return true;
        return vault.reserveRatio === selectedVaultRatio.value;
    });

    return (
        <div>
            <div className="text-xs flex-col">
                <div className='text-xs font-normal underline'>My Markets</div>
                <div className='text-green text-2xl font-bold justify-between items-center flex mt-8'>
                    Active markets for borrower peaches.eth
                    <Button onClick={() => navigate('/borrower/add-new-vault')} variant='blue'>
                        New Market
                    </Button>
                </div>

                <div className='flex w-full flex-wrap -mx-2.5 mt-8'>
                    <div className='w-1/3 px-2.5 py-2.5'>
                        <TextInput
                            onChange={handleFilterByName}
                            placeholder="Filter by name"
                            className='w-full'
                        />
                    </div>
                    <div className='w-1/3 px-2.5 py-2.5'>
                        <Select
                            options={mockedUnderlyingAssetsOptions}
                            onChange={setSelectedUnderlyingAsset}
                            selected={selectedUnderlyingAsset}
                            placeholder="Underlying asset"
                            className='w-full'
                        />
                    </div>
                    <div className='w-1/3 px-2.5 py-2.5'>
                        <Select
                            options={mockedVaultRatioOptions}
                            onChange={setSelectedVaultRatio}
                            selected={selectedVaultRatio}
                            placeholder="Vault status"
                            className='w-full'
                        />
                    </div>
                </div>
            </div>

            <div className='flex w-full flex-wrap -mx-2.5 mt-5'>
                {filteredMockedVaults.map((vault) => (
                    <div className="w-1/3 px-2.5 py-2.5">
                        <VaultCard key={vault.name} vault={vault} className='w-full' />
                    </div>
                ))}
            </div>

            <ServiceAgreementCard
                className="mt-10"
                title='Wildcat Service Agreement'
                description='You agreed to the Wildcat Service Agreement on 12-Sept-2023'
            />
        </div>
    );

}

export default MyVaults;
