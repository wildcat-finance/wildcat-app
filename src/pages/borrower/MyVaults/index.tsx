import { Paper } from '../../../components/ui-components';
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";

export const MyVaults = () => {

    return (
        <div>
            <div className="text-green text-2xl font-black mb-8 w-2/3">
                New Vault
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