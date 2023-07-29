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
import { VaultInfoSidebar } from "./VaultDisplay";
import { BorrowForm } from "./forms/BorrowForm";
import { AddTokenButton } from "./AddTokenButton";
import { RepayForm } from "./forms/RepayForm";
import { AdjustInterestRateForm } from "./forms/AdjustInterestRateForm";

interface Props {
  vaultAccount: VaultAccount;
}

export function BorrowVault({ vaultAccount }: Props) {
  const queryClient = useQueryClient();

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
        <AddTokenButton vaultAccount={vaultAccount} />
      </Box>

      <Flex mt={2}>
        <VaultInfoSidebar vaultAccount={vaultAccount} />

        <VStack spacing={3} fontSize="12px" maxWidth="50%" align="stretch">
          <Box>
            <BorrowForm vaultAccount={vaultAccount} />
          </Box>

          <RepayForm vaultAccount={vaultAccount} />
          <AdjustInterestRateForm vaultAccount={vaultAccount} />
          {/* <Box> */}
          {/*     <form
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
            </form> */}
          {/* </Box> */}
        </VStack>
      </Flex>
    </Box>
  );
}
