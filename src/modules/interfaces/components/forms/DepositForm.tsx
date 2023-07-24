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

function useFaucetCallback(vaultAccount: VaultAccount) {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const { mutate: handleFaucet, isLoading: isCallingFaucet } = useMutation({
    mutationFn: async () => {
      return vaultAccount.vault.underlyingToken
        .faucet()
        .then((tx) => tx.wait());
    },
    onSuccess() {
      queryClient.invalidateQueries(["vaultsForUser", address]);
      queryClient.invalidateQueries(["allVaults"]);
      console.log(`invalidated queries!`);
    },
    onError(e) {
      console.log(e);
      window.alert("Error depositing!");
    },
  });

  const canUseFaucet = useMemo(() => {
    return vaultAccount.vault.underlyingToken.isMock;
  }, [vaultAccount]);

  return {
    handleFaucet,
    isCallingFaucet,
    canUseFaucet,
  };
}

export function DepositForm({ vaultAccount }: Props) {
  const queryClient = useQueryClient();

  const {
    register: depositRegister,
    handleSubmit: depositSubmit,
    watch: depositWatch,
    reset: depositReset,
  } = useForm({
    defaultValues: {
      depositAmount: 0,
    },
  });
  const { address } = useAccount();

  const depositAmountWatch = depositWatch("depositAmount");

  const [depositAmount, depositStatus] = useMemo(() => {
    const tokenAmount =
      vaultAccount.vault.underlyingToken.parseAmount(depositAmountWatch);
    const status = vaultAccount.checkDepositStep(tokenAmount);
    return [tokenAmount, status];
  }, [depositAmountWatch, vaultAccount]);

  // @todo handle deposit / approve
  const { mutate: handleDeposit, isLoading: isDepositing } = useMutation({
    mutationFn: async ({ depositAmount }: { depositAmount: number }) => {
      const amount =
        vaultAccount.vault.underlyingToken.parseAmount(depositAmount);
      const status = vaultAccount.checkDepositStep(amount);
      if (status.status === "InsufficientAllowance") {
        await vaultAccount
          .approveAllowanceRemainder(amount)
          .then((tx) => tx.wait());
        return status;
      } else if (status.status === "Ready") {
        await vaultAccount.deposit(amount).then((tx) => tx.wait());
        return status;
      } else {
        throw Error(`Deposit Status: ${status.status}`);
      }
    },
    onSuccess(status) {
      queryClient.invalidateQueries(["vaultsForUser", address]);
      queryClient.invalidateQueries(["allVaults"]);
      if (status.status === "InsufficientAllowance") {
        console.log("Approved!");
      } else {
        console.log("Deposited!");
        depositReset();
      }
    },
    onError(e) {
      console.log(e);
      window.alert("Error depositing!");
    },
  });

  const onSubmit = useCallback(
    (data: { depositAmount: number }) => handleDeposit(data),
    [handleDeposit]
  );

  const { handleFaucet, isCallingFaucet, canUseFaucet } =
    useFaucetCallback(vaultAccount);

  return (
    <Box>
      <form method="post" onSubmit={depositSubmit(onSubmit)}>
        <Flex alignItems="flex-end">
          <FormControl mr={2}>
            <FormLabel htmlFor="depositAmount" fontSize="12px">
              <Text display="inline" mr={1} fontWeight="bold">
                Available to Deposit:
              </Text>
              <Text display="inline" mr={1}>
                {vaultAccount.maximumDeposit.format(2)}
              </Text>
              <Text display="inline">
                {vaultAccount.underlyingBalance.symbol}
              </Text>
            </FormLabel>
            <NumberInput size="sm">
              <NumberInputField
                {...depositRegister("depositAmount")}
                min={0}
                max={+vaultAccount.maximumDeposit.toFixed(2)}
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
            isLoading={isDepositing}
            isDisabled={
              depositAmount.eq(0) ||
              vaultAccount.underlyingBalance.eq(0) ||
              isDepositing
            }
          >
            {depositStatus.status === "InsufficientAllowance"
              ? "Approve"
              : "Deposit"}
          </Button>

          {canUseFaucet && (
            <Button
              size="sm"
              colorScheme="green"
              px={6}
              isLoading={isCallingFaucet}
              isDisabled={isCallingFaucet || isDepositing}
              onClick={() => handleFaucet()}
              marginLeft={2}
            >
              Faucet
            </Button>
          )}
        </Flex>
      </form>
    </Box>
  );
}
