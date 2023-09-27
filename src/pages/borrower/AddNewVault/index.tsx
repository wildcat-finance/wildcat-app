import { Paper, Input, Chip } from '../../../components/ui-components';

export const AddNewVault = () => {

    return (
        <div>
            <div className="text-green text-2xl font-black mb-8 w-2/3">
                New Vault
            </div>

            <Paper className="p-8 bg-tint-10 border-tint-8">
                <div className="flex flex-col items-start">
                    <Input
                        label="Issued vault token name prefix"
                        className="mb-9"
                        inputClassName="w-72"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                    />
                    <Input
                        label="Issued vault token symbol prefix"
                        className="mb-9"
                        inputClassName="w-72"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                    />
                    <Input
                        label="Maximum amount I want to borrow"
                        className="mb-9"
                        inputClassName="w-72"
                        type="number"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                    />

                    <Input
                        label="Annual interest rate (APR)"
                        className="mb-9"
                        inputClassName="w-48"
                        type="number"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        tooltip={`The percentage APR that 
                        is added to your base APR, 
                        should your vault become delinquent`}
                    />
                    <Input
                        label="Penalty fee rate (APR) "
                        className="mb-9"
                        inputClassName="w-48"
                        type="number"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                    />
                    <Input
                        label="Reserve ratio"
                        className="mb-9"
                        inputClassName="w-48"
                        type="number"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                    />
                    <Input
                        label="Grace period"
                        className="mb-9"
                        inputClassName="w-48"
                        type="number"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                    />
                    <Input
                        label="Withdrawal cycle"
                        className="mb-9"
                        inputClassName="w-48"
                        type="number"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                    />
                </div>
            </Paper>
        </div>
    );

}

export default AddNewVault