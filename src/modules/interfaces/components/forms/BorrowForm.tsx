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

export function BorrowForm({ vaultAccount }: Props) {
  const queryClient = useQueryClient();

  const {
    register: borrowRegister,
    handleSubmit: borrowSubmit,
    watch: borrowWatch,
    reset: borrowReset,
  } = useForm({
    defaultValues: {
      borrowAmount: 0,
    },
  });
  const { address } = useAccount();

  const borrowAmountWatch = borrowWatch("borrowAmount");

  const borrowAmountInvalid = useMemo(() => {
    const amount = vaultAccount.vault.vaultToken.parseAmount(borrowAmountWatch);

    return (
      borrowAmountWatch === 0 || amount.gt(vaultAccount.vault.borrowableAssets)
    );
  }, [borrowAmountWatch, vaultAccount]);

  // @todo handle deposit / approve
  const { mutate: handleBorrow, isLoading: isBorrowing } = useMutation({
    mutationFn: async ({ borrowAmount }: { borrowAmount: number }) => {
      const amount = vaultAccount.vault.vaultToken.parseAmount(borrowAmount);
      console.log(`Borrowing ${amount.raw} from ${vaultAccount.vault.address}`);
      return vaultAccount.vault.contract
        .borrow(amount.raw)
        .then((tx) => tx.wait());
    },
    onSuccess() {
      queryClient.invalidateQueries(["vaultsForUser", address]);
      queryClient.invalidateQueries(["allVaults"]);
      borrowReset();
    },
    onError(e) {
      console.log(e);
      window.alert("Error depositing!");
    },
  });

  const onSubmit = useCallback(
    (data: { borrowAmount: number }) => handleBorrow(data),
    [handleBorrow]
  );

  return (
    <Box>
      <form method="post" onSubmit={borrowSubmit(onSubmit)}>
        <Flex alignItems="flex-end">
          <FormControl mr={2}>
            <FormLabel htmlFor="borrowAmount" fontSize="12px">
              <Text display="inline" mr={1} fontWeight="bold">
                Available to Borrow:
              </Text>
              <Text display="inline" mr={1}>
                {vaultAccount.vault.borrowableAssets.format(2, true)}
              </Text>
            </FormLabel>
            <NumberInput size="sm">
              <NumberInputField
                {...borrowRegister("borrowAmount", {
                  min: 0,
                  max: +vaultAccount.vault.borrowableAssets.toFixed(2),
                })}
                min={0}
                max={+vaultAccount.vault.borrowableAssets.toFixed(2)}
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
            isLoading={isBorrowing}
            isDisabled={
              borrowAmountWatch === 0 ||
              borrowAmountWatch > +vaultAccount.vault.borrowableAssets.toFixed(2) ||
              isBorrowing
            }
          >
            Borrow
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
