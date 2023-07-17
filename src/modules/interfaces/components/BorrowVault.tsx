import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
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
} from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface Props {
  vaultAccount: VaultAccount;
}

export function BorrowVault({ vaultAccount }: Props) {
  const queryClient = useQueryClient();

  const { register: withdrawRegister, handleSubmit: withdrawSubmit } = useForm({
    defaultValues: {
      withdrawAmount: 0,
    },
  });

  const { register: repayRegister, handleSubmit: repaySubmit } = useForm({
    defaultValues: {
      repayAmount: 0,
    },
  });

  const { register: aprAdjustRegister, handleSubmit: aprAdjustSubmit } =
    useForm({
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
      queryClient.invalidateQueries(["allVaults"]);
    },
    onError(e) {
      console.log(e);
      window.alert("Error setting new vault APR!");
    },
  });

  return (
    <Box borderRadius="md" border="1px solid #cccccc" p={4}>
      <Box fontWeight="bold" fontSize="bold">
        <Text display="inline" mr={2}>
          {vaultAccount.vaultBalance.token.name.replace(
            vaultAccount.vault.underlyingToken.name,
            ""
          )}
        </Text>
        <Text display="inline" as="mark">
          {vaultAccount.vault.underlyingToken.name}
        </Text>
      </Box>

      <Flex mt={2}>
        <VStack
          spacing={1}
          fontSize="12px"
          maxWidth="50%"
          align="stretch"
          mr={8}
        >
          <Box>
            <Text display="inline" mr={1} fontWeight="bold">
              Interest Rate:
            </Text>
            <Text display="inline">
              {vaultAccount.vault.annualInterestBips / 100}%
            </Text>
          </Box>

          <Box>
            <Text display="inline" mr={1} fontWeight="bold">
              Maximum Capacity:
            </Text>
            <Text display="inline">
              {vaultAccount.vault.maxTotalSupply.format(2)}
            </Text>
          </Box>

          <Box>
            <Text display="inline" mr={1} fontWeight="bold">
              Current Capacity:
            </Text>
            <Text display="inline">69</Text>
          </Box>

          <Box>
            <Text display="inline" mr={1} fontWeight="bold">
              Current Liqidity Ratio:
            </Text>
            <Text display="inline">69</Text>
          </Box>

          <Box>
            <Text display="inline" mr={1} fontWeight="bold">
              Allowed Liqidity Ratio:
            </Text>
            <Text display="inline">69</Text>
          </Box>

          <Box>
            <Text display="inline" mr={1} fontWeight="bold">
              Grace Period (hours):
            </Text>
            <Text display="inline">{vaultAccount.vault.gracePeriod}</Text>
          </Box>
        </VStack>

        <VStack spacing={3} fontSize="12px" maxWidth="50%" align="stretch">
          <Box>
            <form
              method="post"
              onSubmit={withdrawSubmit(() =>
                console.log({
                  disabled:
                    vaultAccount.vault.borrowableAssets.format(2) === "0",
                })
              )}
            >
              <Flex alignItems="flex-end">
                <FormControl mr={2}>
                  <FormLabel htmlFor="withdrawAmount" fontSize="12px">
                    <Text display="inline" mr={1} fontWeight="bold">
                      Available to Withdraw:
                    </Text>
                    <Text display="inline" mr={1}>
                      {vaultAccount.vault.borrowableAssets.format(2)}
                    </Text>
                    <Text display="inline">
                      {vaultAccount.vaultBalance.token.symbol}
                    </Text>
                  </FormLabel>
                  <NumberInput size="sm">
                    <NumberInputField
                      {...withdrawRegister("withdrawAmount")}
                      min={0}
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
                  isDisabled={
                    vaultAccount.vault.borrowableAssets.format(2) === "0"
                  }
                >
                  Withdraw
                </Button>
              </Flex>
            </form>
          </Box>

          <Box>
            <form
              method="post"
              onSubmit={repaySubmit(() => console.log("repay submitted"))}
            >
              <Flex alignItems="flex-end">
                <FormControl mr={2}>
                  <FormLabel htmlFor="repayAmount" fontSize="12px">
                    <Text display="inline" mr={1} fontWeight="bold">
                      Required to Repay:
                    </Text>
                    <Text display="inline" mr={1}>
                      {vaultAccount.vault.collateralNeededForGoodStanding.format(
                        2
                      )}
                    </Text>
                    <Text display="inline">
                      {vaultAccount.vaultBalance.token.symbol}
                    </Text>
                  </FormLabel>
                  <NumberInput size="sm">
                    <NumberInputField
                      {...repayRegister("repayAmount")}
                      min={0}
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
                  isDisabled={
                    vaultAccount.vault.collateralNeededForGoodStanding.format(
                      2
                    ) === "0"
                  }
                >
                  Repay
                </Button>
              </Flex>
            </form>
          </Box>

          <Box>
            <form
              method="post"
              onSubmit={aprAdjustSubmit((data) => handleSetAPR(data))}
            >
              <Flex alignItems="flex-end">
                <FormControl>
                  <FormLabel
                    fontSize="12px"
                    fontWeight="bold"
                    htmlFor="newAprAmount"
                  >
                    New Interest Rate
                  </FormLabel>
                  <InputGroup size="sm">
                    <NumberInput precision={2} step={0.01}>
                      <NumberInputField
                        min={0}
                        {...aprAdjustRegister("newAprAmount")}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <InputRightAddon children="%" />
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  size="sm"
                  colorScheme="blue"
                  px={6}
                  isDisabled={!vaultAccount.vault.canChangeAPR || isSettingAPR}
                  isLoading={isSettingAPR}
                >
                  Adjust
                </Button>
              </Flex>
            </form>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
