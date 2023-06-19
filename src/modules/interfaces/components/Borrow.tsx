import React, { useMemo } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { DeployNewVaultButton } from "./DeployNewVaultButton";

export function Borrow() {
  const { address } = useAccount();

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
    </Box>
  );
}
