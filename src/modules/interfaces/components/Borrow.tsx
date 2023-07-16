import React, { useMemo } from "react";
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
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { DeployNewVaultButton } from "./DeployNewVaultButton";
import { useAllVaultsForUser } from "../../interfaces/hooks/useAllVaultsForUser";

export function Borrow() {
  const { address } = useAccount();

  const { data: allVaults } = useAllVaultsForUser();

  const userVaults = useMemo(() => {
    return allVaults.filter((vault) => vault.isBorrower());
  }, [allVaults]);

  const shortenedAddress = useMemo(() => {
    return address
      ? `${address.slice(0, 2)}..${address.slice(-4, address.length)}`
      : null;
  }, [address]);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        {address ? (
          <Text fontSize="lg" fontWeight="bold">
            Active Vaults for Borrower {shortenedAddress}
          </Text>
        ) : (
          <Text fontSize="lg" fontWeight="bold">
            Connect Wallet to View Active Vaults
          </Text>
        )}

        <DeployNewVaultButton />
      </Flex>

      {userVaults.length ? (
        <VStack spacing={4} align="stretch" mt={6}>
          {userVaults.map((vaultAccount, idx) => (
            <Box
              borderRadius="md"
              border="1px solid #cccccc"
              key={`${vaultAccount.vault}_${vaultAccount.vault.controller}_${idx}`}
              p={4}
            >
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
                    <Text display="inline">
                      {vaultAccount.vault.gracePeriod}
                    </Text>
                  </Box>
                </VStack>

                <VStack
                  spacing={3}
                  fontSize="12px"
                  maxWidth="50%"
                  align="stretch"
                >
                  <Flex alignItems="flex-end">
                    <FormControl mr={2}>
                      <FormLabel fontSize="12px">
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
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <Button type="button" size="sm" colorScheme="blue" px={6}>
                      Withdraw
                    </Button>
                  </Flex>

                  <Flex alignItems="flex-end">
                    <FormControl mr={2}>
                      <FormLabel fontSize="12px">
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
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <Button type="button" size="sm" colorScheme="blue" px={6}>
                      Repay
                    </Button>
                  </Flex>

                  <Flex alignItems="flex-end">
                    <FormControl mr={2}>
                      <FormLabel fontSize="12px" fontWeight="bold">
                        New Interest Rate
                      </FormLabel>
                      <NumberInput size="sm">
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <Button type="button" size="sm" colorScheme="blue" px={6}>
                      Adjust
                    </Button>
                  </Flex>
                </VStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : (
        <Box borderRadius="md" border="1px solid #cccccc" p={4} mt={4}>
          <Box fontWeight="bold" fontSize="bold">
            <Text display="inline" mr={2}>
              No vaults for Borrower {shortenedAddress}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
