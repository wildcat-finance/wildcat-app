import { useNavigate } from "react-router-dom";

import { Input, Paper } from '../../../components/ui-components';
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { Button } from '../../../components/ui-components/Button';
import VaultCard from './VaultCard';

import { mockedVaults } from './mocks'

const MyVaults = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="text-xs font-black flex-col">
            <p className='text-xs font-normal underline'>My Vaults</p>
                <div className='text-green text-2xl font-black justify-between items-center flex mt-8'>
                    Active Vaults for borrower peaches.eth
                    <Button onClick={() => navigate('/borrower/add-new-vault')} variant='blue'>
                        New Vault
                    </Button>
                </div>
                <div className='flex items-center justify-between my-8 gap-5'>
                    <Input className='w-full' />
                    <Input className='w-full' />
                    <Input className='w-full' />
                </div>
            </div>

            <Paper className=" border-tint-8 flex items-center flex-wrap gap-5 border-0 bg-sand">
                <div className='flex w-full flex-wrap -mx-2.5"'>
                    {mockedVaults.map((vault) => (
                        <div className="w-1/3 px-2.5 py-2.5">
                            <VaultCard key={vault.name} vault={vault} className='w-full' />
                        </div>
                    ))}
                </div>
            </Paper>

            <ServiceAgreementCard
                className="mt-10"
                title='Wildcat Service Agreement'
                description='You agreed to the Wildcat Service Agreement on 12-Sept-2023'
            />
        </div>
    );

}

export default MyVaults;
