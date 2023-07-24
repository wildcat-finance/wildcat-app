import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { LendVault } from "./LendVault";
import { useAllVaultsForUser } from "../hooks/useAllVaultsForUser";

export function Lend() {
  const { address } = useAccount();

  const { data: allVaults } = useAllVaultsForUser();

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        {address ? (
          <Text fontSize="lg" fontWeight="bold">
            Active Vaults
          </Text>
        ) : (
          <Text fontSize="lg" fontWeight="bold">
            Connect Wallet to View Active Vaults
          </Text>
        )}
      </Flex>

      {allVaults.length ? (
        <VStack spacing={4} align="stretch" mt={6}>
          {allVaults.map((vaultAccount, idx) => (
            <LendVault
              key={`${vaultAccount.vault}_${vaultAccount.vault.controller}_${idx}`}
              vaultAccount={vaultAccount}
            />
          ))}
        </VStack>
      ) : (
        <Box borderRadius="md" border="1px solid #cccccc" p={4} mt={4}>
          <Box fontWeight="bold" fontSize="bold">
            <Text display="inline" mr={2}>
              No vaults
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  );
}
