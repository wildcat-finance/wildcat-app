import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import {
    Paper,
    Input,
    Chip,
    Tooltip,
    Button,
    FormItem,
    Select,
} from "../../../components/ui-components";
import { SignIcon } from "../../../components/ui-components/icons";
import { ServiceAgreementCard } from "../../../components/ServiceAgreementCard";
import { TokenSelector } from "./TokenSelector";
import arrowBack from "../../../components/ui-components/icons/arrow_back_ios.svg";
import NumberInput from "../../../components/ui-components/FormNumberInput";
import { validationSchema, FormSchema } from "./validationSchema";
import { SelectOptionItem } from "../../../components/ui-components/Select/interface";
import { mockedVaultTypes } from "../../../mocks/vaults";
import FormNumberInput from "../../../components/ui-components/FormNumberInput";

const mockedVaultTypesOptions: SelectOptionItem[] = mockedVaultTypes.map(
    (vaultType) => ({
        id: vaultType,
        label: vaultType,
        value: vaultType,
    })
);

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
        formState: { errors: formErrors },
    } = useForm<FormSchema>({
        defaultValues: defaultVault,
        resolver: zodResolver(validationSchema),
        mode: "onBlur",
    });
    const navigate = useNavigate();

    const [selectedVault, setSelectedVault] = useState<SelectOptionItem | null>(
        null
    );

    const handleClickMyVaults = () => {
        navigate("/borrower/my-vaults");
    };

    const { field: namePrefixField } = useController({
        name: "namePrefix",
        control,
    });

    const { field: symbolPrefixField } = useController({
        name: "symbolPrefix",
        control,
    });

    const handleVaultSelect = (value: SelectOptionItem | null) => {
        setSelectedVault(value);
    };

    return (
        <div>
            <button
                className="flex items-center gap-x-2 mb-8"
                onClick={handleClickMyVaults}
            >
                <img src={arrowBack} alt="Back" />
                <p className="text-xs font-normal underline">My Markets</p>
            </button>
            <div className="text-green text-2xl font-bold mb-8 w-2/3">New Market</div>

            <Paper className="p-8 bg-tint-10 border-tint-8">
                <form className="flex flex-col items-start">
                    <FormItem
                        label="Select Market Type:"
                        className="mb-5 pb-4"
                        error={Boolean(formErrors.vaultType?.message)}
                        errorText={formErrors.vaultType?.message}
                        tooltip="Decides the type of controller that will deploy your market.
                                Controllers dictate market logic and enforce minimum and maximum
                                values on the parameters you provide below."
                    >
                        <Select
                            selected={selectedVault}
                            options={mockedVaultTypesOptions}
                            onChange={handleVaultSelect}
                        />
                    </FormItem>

                    <FormItem
                        label="Underlying Asset:"
                        className="mb-5 pb-4"
                        error={Boolean(formErrors.underlyingToken?.message)}
                        errorText={formErrors.underlyingToken?.message}
                        tooltip="The token that you want to borrow, e.g. WETH, DAI, CRV."
                    >
                        <TokenSelector />
                    </FormItem>

                    <FormItem
                        label="Market Token Name Prefix:"
                        className="mb-5 pb-4"
                        endDecorator={<Chip className="w-32 ml-3">Dai Stablecoin</Chip>}
                        error={Boolean(formErrors.namePrefix?.message)}
                        errorText={formErrors.namePrefix?.message}
                        tooltip="The identifier that attaches to the front of the name of the underlying
                                asset in order to distinguish the market token issued to lenders.
                                For example, entering 'Test' here when he underlying asset is Dai
                                Stablecoin will result in your lenders being issued a market token
                                named Test Dai Stablecoin."
                    >
                        <Input
                            {...namePrefixField}
                            className="w-72"
                            error={Boolean(formErrors.namePrefix?.message)}
                        />
                    </FormItem>

                    <FormItem
                        label="Market Token Symbol Prefix:"
                        className="mb-5 pb-4"
                        endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
                        error={Boolean(formErrors.symbolPrefix?.message)}
                        errorText={formErrors.symbolPrefix?.message}
                        tooltip="The identifier that attaches to the front of the symbol of the underlying
                        asset in order to distinguish the market token issued to lenders.
                        For example, entering 'TST' here when he underlying asset is DAI will result in
                        your lenders being issued a market token with the symbol TSTDAI."
                    >
                        <Input
                            {...symbolPrefixField}
                            className="w-72"
                            error={Boolean(formErrors.symbolPrefix?.message)}
                        />
                    </FormItem>

                    <FormNumberInput
                        label="Market Capacity:"
                        endDecorator={<Chip className="w-32 ml-3">DAI</Chip>}
                        control={control}
                        formErrors={formErrors}
                        name="maxAmount"
                        inputClass="w-72"
                        tooltip="The maximum number of whole units of the underlying asset that you wish lenders to deposit.
                                For example, if you wish to borrow ten million USDC, here you would enter 10,000,000.
                                You do not need to be concerned about how many decimals the underlying asset has
                                (i.e. WBTC has 6, DAI has 18) - the front end will calculate that for you."
                    />

                    <FormNumberInput
                        label="Lender APR (%)"
                        max={100}
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="annualRate"
                        tooltip="The annual interest rate that you are offering to your lenders for depositing their assets
                                into this market for you to borrow. Note that the actual rate you pay will be higher than this
                                if you have selected a market type that imposes a protocol APR in addition to the lender APR."
                    />

                    <FormNumberInput
                        label="Penalty APR (%)"
                        max={100}
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="penaltyRate"
                        tooltip={`The annual interest rate that you are offering to your lenders - in addition to the lender APR - 
                                  in the event that the reserves in your market are below your specified reserve ratio percentage
                                  (i.e. the market is delinquent) for a period that is - in aggregate - longer than the grace period you define.`}
                    />

                    <FormNumberInput
                        label="Reserve Ratio (%)"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">%</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="reserveRatio"
                        tooltip="The percentage of deposits in your market - the current supply - that must be kept within the market.
                                  These assets act as a liquid buffer for lender withdrawal requests and cannot be borrowed, but still
                                  accrue interest. Failing to maintain this percentage for an extended period of time may
                                  result in having to pay the additional penalty APR."
                    />

                    <FormNumberInput
                        label="Grace Period Length (Hours):"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="gracePeriod"
                        tooltip="The length of time for which a market is permitted to be delinquent before the penalty APR activates.
                                The grace period is an aggregate length of time for delinquency: the borrower *does not* have this much
                                time to rectify delinquency every single time it triggers. An internal variable tracks the time a market
                                has been delinquent (counting back down to zero while it is not), and the penalty APR will be active for as long
                                as that variable exceeds the grace period."
                    />

                    <FormNumberInput
                        label="Withdrawal Cycle Length (Hours):"
                        endDecorator={
                            <Chip className="w-11 justify-center font-bold">hours</Chip>
                        }
                        control={control}
                        formErrors={formErrors}
                        name="withdrawalCycle"
                        tooltip="Amount of time that a lender who places a withdrawal request when no cycle is currently active must wait before being able to reclaim assets
                                from the market. Withdrawal cycles are not rolling: at the conclusion of one cycle, the next one will not
                                begin until the next withdrawal request. Multiple lenders attempting to request withdrawal amounts in
                                excess of the available reserves in the same cycle will share the reserves pro rata."
                    />

                    <div>
                        <div
                            className="flex justify-between items-start mb-5"
                            style={{ width: "236px" }}
                        >
                            <label className="font-bold text-xxs">
                                Master Loan Agreement
                            </label>

                            <Tooltip
                                content={`We have prepared a Master Loan Agreement for you to use, 
                                which the Lender may or may not countersign. This saves you having 
                                to prepare a legal document for your counterparties should they require one.`}
                            />
                        </div>

                        <div className="text-xxs">
                            You must read and sign the
                            <span className="text-xxs font-bold">
                                {" "}
                                Wildcat Master Loan Agreement{" "}
                            </span>
                            for this market before creation.
                        </div>

                        <Button className="mt-5" variant="blue" icon={<SignIcon />}>
                            Sign
                        </Button>
                    </div>

                    <Button className="mt-10" variant="blue" disabled>
                        Submit and Create Market
                    </Button>
                </form>
            </Paper>

            <ServiceAgreementCard
                className="mt-10"
                title="Wildcat Service Agreement"
                description="You agreed to the Wildcat Service Agreement on 12-Sept-2023"
            />
        </div>
    );
};

export default AddNewVault;
