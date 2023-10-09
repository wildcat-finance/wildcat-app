import { useState } from 'react';

import { Paper, Input, Chip, Tooltip, Button, FormItem } from '../../../components/ui-components';
import { SignIcon } from "../../../components/ui-components/icons";
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { TokenSelector } from './TokenSelector'
import arrowBack from '../../../components/ui-components/icons/arrow_back_ios.svg'
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../../components/Dropdown';

export const AddNewVault = () => {
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});
    const navigate = useNavigate()

    const setError = (fieldName: string, errorText: string | undefined) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: errorText,
        }));
    };

    const handleClickMyVaults = () => {
        navigate('/borrower/my-vaults')
    }

    return (
        <div>
            <button className='flex items-center gap-x-2 mb-8' onClick={handleClickMyVaults}>
                <img src={arrowBack} alt="Back" />
                <p className='text-xs font-normal underline'>My Vaults</p>
            </button>
            <div className="text-green text-2xl font-bold mb-8 w-2/3">
                New Vault
            </div>

            <Paper className="p-8 bg-tint-10 border-tint-8">
                <div className="flex flex-col items-start">

                <FormItem
                        label="Select vault type"
                        className="mb-5 pb-4"
                        tooltip="Lorem ipsum"
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']}
                    >
                        <Dropdown />
                    </FormItem>

                    <FormItem
                        label="Underlying token (token you want to borrow)"
                        className="mb-5 pb-4"
                        tooltip="Lorem ipsum"
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']}
                    >
                        <TokenSelector />
                    </FormItem>

                    <FormItem 
                        label="Issued vault token name prefix"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-32 ml-3">Dai Stablecoin</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-72" error={!!errors['namePrefix']} />
                    </FormItem>

                    <FormItem 
                        label="Issued vault token symbol prefix"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-72" error={!!errors['namePrefix']} />
                    </FormItem>

                    <FormItem 
                        label="Maximum amount I want to borrow"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-72" error={!!errors['namePrefix']} type="number"/>
                    </FormItem>

                    <FormItem 
                        label="Annual interest rate (APR)"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0} max={100}/>
                    </FormItem>

                    <FormItem 
                        label="Penalty fee rate (APR) "
                        className="mb-5 pb-4" 
                        tooltip={`The percentage APR that 
                        is added to your base APR, 
                        should your vault become delinquent`}
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0} max={100}/>
                    </FormItem>

                    <FormItem 
                        label="Reserve ratio"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0} max={100}/>
                    </FormItem>

                    <FormItem 
                        label="Grace period"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0}/>
                    </FormItem>

                    <FormItem 
                        label="Withdrawal cycle"
                        className="mb-5 pb-4" 
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0}/>
                    </FormItem>

                    <div>
                        <div className="flex justify-between items-start mb-5" style={{ width: '236px' }}>
                            <label className="font-bold text-xxs">
                                Master Loan Agreement
                            </label>

                            <Tooltip content={
                                `We have prepared a Master Loan Agreement for you to use, 
                                which the Lender may or may not countersign. This saves you having 
                                to prepare a legal document for your counterparties should they require one.`}
                            />
                        </div>

                        <div className="text-xxs">
                            Please read and agree to the
                            <span className="text-xxs font-bold"> Wildcat Master Loan Agreement</span>
                        </div>

                        <Button className="mt-5" variant='blue' icon={<SignIcon />}>
                            Sign
                        </Button>
                    </div>

                    <Button className="mt-10" variant='blue' disabled>
                        Submit and create vault
                    </Button>
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

export default AddNewVault