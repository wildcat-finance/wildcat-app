import { Input, Paper } from '../../../components/ui-components';
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { Button } from '../../../components/ui-components/Button';

const MyVaults = () => {

    return (
        <div>
            <div className="text-xs font-black flex-col">
                My Vault
                <div className='text-green text-2xl font-black justify-between items-center flex mt-8'>
                    Active Vaults for borrower peaches.eth
                    <Button variant='blue'>New Vault</Button>
                </div>
                <div className='flex items-center justify-between my-8 gap-5'>
                    <Input className='w-full'/>
                    <Input className='w-full'/>
                    <Input className='w-full'/>
                                    </div>
            </div>

            <Paper className="p-8 bg-tint-10 border-tint-8">
                Vaults list
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