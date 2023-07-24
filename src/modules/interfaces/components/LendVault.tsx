import React, { useCallback, useMemo } from "react";
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
import { useAccount } from "wagmi";
import { VaultInfoSidebar } from "./VaultDisplay";
import { DepositForm } from "./forms/DepositForm";
import { WithdrawForm } from "./forms/WithdrawForm";

interface Props {
  vaultAccount: VaultAccount;
}

export function LendVault({ vaultAccount }: Props) {
  // @todo handle withdrawal
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
        <VaultInfoSidebar vaultAccount={vaultAccount} />
        <VStack spacing={3} fontSize="12px" maxWidth="50%" align="stretch">
          <DepositForm vaultAccount={vaultAccount} />
          <WithdrawForm vaultAccount={vaultAccount} />
        </VStack>
      </Flex>
    </Box>
  );
}
