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
} from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

interface Props {
  vaultAccount: VaultAccount;
}

export function WithdrawForm({ vaultAccount }: Props) {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const {
    register: withdrawRegister,
    handleSubmit: withdrawSubmit,
    watch: withdrawWatch,
  } = useForm({
    defaultValues: {
      withdrawAmount: 0,
    },
  });

  const withdrawAmountWatch = withdrawWatch("withdrawAmount");

  const withdrawAmount = useMemo(
    () => vaultAccount.vault.vaultToken.parseAmount(withdrawAmountWatch),
    [withdrawAmountWatch, vaultAccount]
  );

  // @todo handle withdraw / approve
  const { mutate: handleWithdraw, isLoading: isWithdrawing } = useMutation({
    mutationFn: async ({ withdrawAmount }: { withdrawAmount: number }) => {
      const amount =
        vaultAccount.vault.underlyingToken.parseAmount(withdrawAmount);
      await vaultAccount.withdraw(amount).then((tx) => tx.wait());
    },
    onSuccess() {
      queryClient.invalidateQueries(["vaultsForUser", address]);
      queryClient.invalidateQueries(["allVaults"]);
    },
    onError(e) {
      console.log(e);
      window.alert("Error withdrawing!");
    },
  });

  const onSubmit = useCallback(
    (data: { withdrawAmount: number }) => handleWithdraw(data),
    [handleWithdraw]
  );

  return (
    <Box>
      <form method="post" onSubmit={withdrawSubmit(onSubmit)}>
        <Flex alignItems="flex-end">
          <FormControl mr={2}>
            <FormLabel htmlFor="withdrawAmount" fontSize="12px">
              <Text display="inline" mr={1} fontWeight="bold">
                Available to Withdraw:
              </Text>
              <Text display="inline" mr={1}>
                {vaultAccount.vaultBalance.format(2, true)}
              </Text>
            </FormLabel>
            <NumberInput size="sm">
              <NumberInputField
                {...withdrawRegister("withdrawAmount")}
                min={0}
                max={+vaultAccount.maximumWithdrawal.toFixed(2)}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button
            type="submit"
            size="sm"
            colorScheme="blue"
            px={6}
            isLoading={isWithdrawing}
            isDisabled={
              withdrawAmount.eq(0) ||
              vaultAccount.vaultBalance.eq(0) ||
              isWithdrawing
            }
          >
            Withdraw
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
