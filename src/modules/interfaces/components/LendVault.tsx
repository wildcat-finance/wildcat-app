import {
  Box,
  Flex,
  Text,
  VStack
} from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";
import { VaultInfoSidebar } from "./VaultDisplay";
import { DepositForm } from "./forms/DepositForm";
import { WithdrawForm } from "./forms/WithdrawForm";
import { AddTokenButton } from "./AddTokenButton";

interface Props {
  vaultAccount: VaultAccount;
}

export function LendVault({ vaultAccount }: Props) {
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
        <AddTokenButton vaultAccount={vaultAccount} />
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
