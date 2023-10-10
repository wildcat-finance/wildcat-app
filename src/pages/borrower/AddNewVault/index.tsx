import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import { Paper, Input, Chip, Tooltip, Button, FormItem } from '../../../components/ui-components';
import { SignIcon } from "../../../components/ui-components/icons";
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { TokenSelector } from './TokenSelector'
import arrowBack from '../../../components/ui-components/icons/arrow_back_ios.svg'
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../../components/Dropdown';
import NumberVaultInput from './NumberVaultInput';
import { validationSchema, FormSchema } from './validationSchema';

const defaultVault: FormSchema = {
    vaultType: "",
    underlyingToken: "",
    namePrefix: "",
    symbolPrefix: "",
    maxAmount: 0,
    annualRate: 0,
    penaltyRate: 0,
    reserveRatio: 0,
    gracePeriod: 0,
    withdrawalCycle: 0,
};

export const AddNewVault = () => {
    const {
        control,
        formState: {
            errors: formErrors,
        },
    } = useForm<FormSchema>({
        defaultValues: defaultVault,
        resolver: zodResolver(validationSchema),
        mode: "onBlur"
    });
    const navigate = useNavigate()

    const handleClickMyVaults = () => {
        navigate('/borrower/my-vaults')
    }

    const { field: namePrefixField } = useController({
        name: 'namePrefix',
        control,
    });

    const { field: symbolPrefixField } = useController({
        name: 'symbolPrefix',
        control,
    });

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
                <form className="flex flex-col items-start">

                    <FormItem
                        label="Select vault type"
                        className="mb-5 pb-4"
                        tooltip="Lorem ipsum"
                        error={Boolean(formErrors.vaultType?.message)}
                        errorText={formErrors.vaultType?.message}
                    >
                        <Dropdown />
                    </FormItem>

                    <FormItem
                        label="Underlying token (token you want to borrow)"
                        className="mb-5 pb-4"
                        tooltip="Lorem ipsum"
                        error={Boolean(formErrors.underlyingToken?.message)}
                        errorText={formErrors.underlyingToken?.message}
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
                        error={Boolean(formErrors.namePrefix?.message)}
                        errorText={formErrors.namePrefix?.message}
                    >
                        <Input {...namePrefixField} className="w-72" error={Boolean(formErrors.namePrefix?.message)} />
                    </FormItem>

                    <FormItem
                        label="Issued vault token symbol prefix"
                        className="mb-5 pb-4"
                        tooltip="Lorem ipsum"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                        error={Boolean(formErrors.symbolPrefix?.message)}
                        errorText={formErrors.symbolPrefix?.message}
                    >
                        <Input {...symbolPrefixField} className="w-72" error={Boolean(formErrors.symbolPrefix?.message)} />
                    </FormItem>

                    <NumberVaultInput
                        label="Maximum amount I want to borrow"
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="maxAmount"
                        tooltip="Lorem ipsum"
                        inputClass="w-72"
                    />

                    <NumberVaultInput
                        label="Annual interest rate (APR)"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="annualRate"
                        tooltip="Lorem ipsum"
                    />

                    <NumberVaultInput
                        label="Penalty fee rate (APR)"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="penaltyRate"
                        tooltip="Lorem ipsum"
                    />

                    <NumberVaultInput
                        label="Reserve ratio"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="reserveRatio"
                        tooltip="Lorem ipsum"
                    />

                    <NumberVaultInput
                        label="Grace period"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="gracePeriod"
                        tooltip="Lorem ipsum"
                    />

                    <NumberVaultInput
                        label="Withdrawal cycle"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="withdrawalCycle"
                        tooltip="Lorem ipsum"
                    />

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
                </form>
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