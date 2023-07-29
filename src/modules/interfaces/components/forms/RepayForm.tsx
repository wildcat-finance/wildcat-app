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

export function RepayForm({ vaultAccount }: Props) {
  const queryClient = useQueryClient();

  const {
    register: repayRegister,
    handleSubmit: repaySubmit,
    watch: repayWatch,
    reset: repayReset,
  } = useForm({
    defaultValues: {
      repayAmount: 0,
    },
  });
  const { address } = useAccount();

  const repayAmountWatch = repayWatch("repayAmount");

  const [repayAmount, repayStatus] = useMemo(() => {
    const tokenAmount =
      vaultAccount.vault.underlyingToken.parseAmount(repayAmountWatch);
    const status = vaultAccount.checkRepayStep(tokenAmount);
    return [tokenAmount, status];
  }, [repayAmountWatch, vaultAccount]);

  // @todo handle repay / approve
  const { mutate: handleRepay, isLoading: isRepaying } = useMutation({
    mutationFn: async ({ repayAmount }: { repayAmount: number }) => {
      const amount =
        vaultAccount.vault.underlyingToken.parseAmount(repayAmount);
      const status = vaultAccount.checkRepayStep(amount);
      if (status.status === "InsufficientAllowance") {
        await vaultAccount
          .approveAllowanceRemainder(amount)
          .then((tx) => tx.wait());
        return status;
      } else if (status.status === "Ready") {
        await vaultAccount.repay(amount.raw).then((tx) => tx.wait());
        return status;
      } else {
        throw Error(`Repay Status: ${status.status}`);
      }
    },
    onSuccess(status) {
      queryClient.invalidateQueries(["vaultsForUser", address]);
      queryClient.invalidateQueries(["allVaults"]);
      if (status.status === "InsufficientAllowance") {
        console.log("Approved!");
      } else {
        console.log("Repayed!");
        repayReset();
      }
    },
    onError(e) {
      console.log(e);
      window.alert("Error repaying!");
    },
  });

  const onSubmit = useCallback(
    (data: { repayAmount: number }) => handleRepay(data),
    [handleRepay]
  );

  return (
    <Box>
      <form method="post" onSubmit={repaySubmit(onSubmit)}>
        <Flex alignItems="flex-end">
          <FormControl mr={2}>
            <FormLabel htmlFor="repayAmount" fontSize="12px">
              <Text display="inline" mr={1} fontWeight="bold">
                {vaultAccount.vault.isDelinquent ? "Required" : "Available"} to
                Repay:
              </Text>
              <Text display="inline" mr={1}>
                {vaultAccount.vault.isDelinquent
                  ? vaultAccount.vault.delinquentDebt.format(2, true)
                  : vaultAccount.maximumRepay.format(2, true)}
              </Text>
            </FormLabel>
            <NumberInput size="sm">
              <NumberInputField
                {...repayRegister("repayAmount")}
                min={0}
                max={+vaultAccount.maximumRepay.toFixed(2)}
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
            isLoading={isRepaying}
            isDisabled={
              repayAmount.eq(0) ||
              vaultAccount.underlyingBalance.eq(0) ||
              isRepaying
            }
          >
            {repayStatus.status === "InsufficientAllowance"
              ? "Approve"
              : "Repay"}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
