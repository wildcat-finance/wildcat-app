import React, { useMemo } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { DeployNewVaultButton } from "./DeployNewVaultButton";
import { useAllVaultsForUser } from "../../interfaces/hooks/useAllVaultsForUser";

export function Borrow() {
  const { address } = useAccount();

  const { data: userVaults } = useAllVaultsForUser();
  console.log(userVaults);

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
                  {vaultAccount.vaultBalance.token.name}
                </Text>
                <Text display="inline" as="mark">
                  {vaultAccount.vaultBalance.token.symbol}
                </Text>
              </Box>

              <Flex mt={2}>
                <VStack
                  spacing={1}
                  fontSize="12px"
                  maxWidth="50%"
                  align="stretch"
                >
                  <Box>
                    <Text display="inline" mr={1} fontWeight="bold">
                      Interest Rate:
                    </Text>
                    <Text display="inline">
                      {vaultAccount.vault.annualInterestBips}
                    </Text>
                  </Box>

                  <Box>
                    <Text display="inline" mr={1} fontWeight="bold">
                      Maximum Capacity:
                    </Text>
                    <Text display="inline">69</Text>
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
                      Grace Period:
                    </Text>
                    <Text display="inline">
                      {vaultAccount.vault.gracePeriod}
                    </Text>
                  </Box>
                </VStack>
              </Flex>
            </Box>
          ))}
        </VStack>
      ) : null}
    </Box>
  );
}
