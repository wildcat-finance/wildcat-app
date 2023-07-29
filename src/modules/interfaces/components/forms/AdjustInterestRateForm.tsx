import { useCallback, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

interface Props {
  vaultAccount: VaultAccount;
}

export function AdjustInterestRateForm({ vaultAccount }: Props) {
  const queryClient = useQueryClient();

  const { address } = useAccount();

  const {
    register: aprAdjustRegister,
    handleSubmit: aprAdjustSubmit,
    formState,
    watch,
  } = useForm({
    defaultValues: {
      newAprAmount: 0,
    },
  });

  const { mutate: handleSetAPR, isLoading: isSettingAPR } = useMutation({
    mutationFn: async ({ newAprAmount }: { newAprAmount: number }) => {
      const amount = newAprAmount * 100;
      await vaultAccount.setAPR(amount);
    },
    onSuccess() {
      queryClient.invalidateQueries(["vaultsForUser", address]);
      queryClient.invalidateQueries(["allVaults"]);
    },
    onError(e) {
      console.log(e);
      window.alert("Error setting new vault APR!");
    },
  });

  const aprAmountWatch = watch("newAprAmount");

  const isReducingAPR = useMemo(() => {
    return aprAmountWatch < vaultAccount.vault.annualInterestBips / 100 && aprAmountWatch > 0;
  }, [aprAmountWatch, vaultAccount]);

  return (
    <Box>
      <form
        method="post"
        onSubmit={aprAdjustSubmit((data) => handleSetAPR(data))}
      >
        <Flex alignItems="flex-end">
          <FormControl isInvalid={typeof formState.errors.newAprAmount !== "undefined" || (isReducingAPR && !vaultAccount.vault.canReduceAPR)}>
            <FormLabel fontSize="12px" fontWeight="bold" htmlFor="newAprAmount">
              New Interest Rate
            </FormLabel>
            <InputGroup size="sm">
              <NumberInput precision={2} step={0.1} min={0} max={100}>
                <NumberInputField
                  min={0}
                  max={100}
                  {...aprAdjustRegister("newAprAmount")}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <InputRightAddon children="%" />
            </InputGroup>
          <FormErrorMessage>
            {formState.errors.newAprAmount &&
              formState.errors.newAprAmount.message}
            {!vaultAccount.vault.canReduceAPR &&
              isReducingAPR && 
              `Vault has insufficient collateral to reduce interest rate.`}
            {isReducingAPR &&
              `Reducing interest rate will set collateral requirement to 90% for two weeks.`}
          </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            size="sm"
            colorScheme="blue"
            px={6}
            isDisabled={
              isSettingAPR ||
              (isReducingAPR && !vaultAccount.vault.canReduceAPR)
            }
            isLoading={isSettingAPR}
          >
            Adjust
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
