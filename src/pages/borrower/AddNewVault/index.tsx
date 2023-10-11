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
                <p className='text-xs font-normal underline'>My Markets</p>
            </button>
            <div className="text-green text-2xl font-bold mb-8 w-2/3">
                New Market
            </div>

            <Paper className="p-8 bg-tint-10 border-tint-8">
                <div className="flex flex-col items-start">

                <FormItem
                        label="Select Market Type:"
                        className="mb-5 pb-4"
                        tooltip="Decides the type of controller that will deploy your market.
                                 Controllers dictate market logic and enforce minimum and maximum
                                 values on the parameters you provide below."
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']}
                    >
                        <Dropdown />
                    </FormItem>

                    <FormItem
                        label="Underlying Asset:"
                        className="mb-5 pb-4"
                        tooltip="The token that you want to borrow, e.g. WETH, DAI, CRV."
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']}
                    >
                        <TokenSelector />
                    </FormItem>

                    <FormItem 
                        label="Market Token Name Prefix:"
                        className="mb-5 pb-4" 
                        tooltip="The identifier that attaches to the front of the name of the underlying
                                 asset in order to distinguish the market token issued to lenders.
                                 For example, entering 'Test' here when he underlying asset is Dai 
                                 Stablecoin will result in your lenders being issued a market token
                                 named Test Dai Stablecoin."
                        endDecorator={
                            <Chip className="w-32 ml-3">Dai Stablecoin</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-72" error={!!errors['namePrefix']} />
                    </FormItem>

                    <FormItem 
                        label="Market Token Symbol Prefix:"
                        className="mb-5 pb-4" 
                        tooltip="The identifier that attaches to the front of the symbol of the underlying
                        asset in order to distinguish the market token issued to lenders.
                        For example, entering 'TST' here when he underlying asset is DAI will result in
                        your lenders being issued a market token with the symbol TSTDAI."
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-72" error={!!errors['namePrefix']} />
                    </FormItem>

                    <FormItem 
                        label="Market Capacity:"
                        className="mb-5 pb-4" 
                        tooltip="The maximum number of whole units of the underlying asset that you wish lenders to deposit.
                                 For example, if you wish to borrow ten million USDC, here you would enter 10,000,000.
                                 You do not need to be concerned about how many decimals the underlying asset has
                                 (i.e. WBTC has 6, DAI has 18) - the front end will calculate that for you."
                        endDecorator={
                            <Chip className="w-32 ml-3">DAI</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-72" error={!!errors['namePrefix']} type="number"/>
                    </FormItem>

                    <FormItem 
                        label="Lender APR (%)"
                        className="mb-5 pb-4" 
                        tooltip="The annual interest rate that you are offering to your lenders for depositing their assets
                                 into this market for you to borrow. Note that the actual rate you pay will be higher than this
                                 if you have selected a market type that imposes a protocol APR in addition to the lender APR."
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0} max={100}/>
                    </FormItem>

                    <FormItem 
                        label="Penalty APR (%)"
                        className="mb-5 pb-4" 
                        tooltip={`The annual interest rate that you are offering to your lenders - in addition to the lender APR - 
                                  in the event that the reserves in your market are below your specified reserve ratio percentage
                                  (i.e. the market is delinquent) for a period that is - in aggregate - longer than the grace period you define.`}
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0} max={100}/>
                    </FormItem>

                    <FormItem 
                        label="Reserve Ratio (%)"
                        className="mb-5 pb-4" 
                        tooltip="The percentage of deposits in your market - the current supply - that must be kept within the market.
                                 These assets act as a liquid buffer for lender withdrawal requests and cannot be borrowed, but still
                                 accrue interest. Failing to maintain this percentage for an extended period of time may
                                 result in having to pay the additional penalty APR."
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0} max={100}/>
                    </FormItem>

                    <FormItem 
                        label="Grace Period Length (Hours):"
                        className="mb-5 pb-4" 
                        tooltip="The length of time for which a market is permitted to be delinquent before the penalty APR activates.
                                 The grace period is an aggregate length of time for delinquency: the borrower *does not* have this much
                                 time to rectify delinquency every single time it triggers. An internal variable tracks the time a market
                                 has been delinquent (counting back down to zero while it is not), and the penalty APR will be active for as long
                                 as that variable exceeds the grace period."
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        error={!!errors['namePrefix']}
                        errorText={errors['namePrefix']} 
                    >
                        <Input className="w-48" error={!!errors['namePrefix']} type="number" min={0}/>
                    </FormItem>

                    <FormItem 
                        label="Withdrawal Cycle Length (Hours):"
                        className="mb-5 pb-4" 
                        tooltip="Amount of time that a lender who places a withdrawal request when no cycle is currently active must wait before being able to reclaim assets
                                 from the market. Withdrawal cycles are not rolling: at the conclusion of one cycle, the next one will not
                                 begin until the next withdrawal request. Multiple lenders attempting to request withdrawal amounts in
                                 excess of the available reserves in the same cycle will share the reserves pro rata."
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
                            You must read and sign the
                            <span className="text-xxs font-bold"> Wildcat Master Loan Agreement </span>
                            for this market before creation.
                        </div>

                        <Button className="mt-5" variant='blue' icon={<SignIcon />}>
                            Sign
                        </Button>
                    </div>

                    <Button className="mt-10" variant='blue' disabled>
                        Submit and Create Market
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