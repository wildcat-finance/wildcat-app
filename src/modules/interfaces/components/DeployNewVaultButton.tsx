import React, { useCallback } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useIsOpen } from "../../common/hooks";
import { useController } from "../hooks/useController";

interface NewVaultValues {
  asset?: string;
  namePrefix?: string;
  symbolPrefix?: string;
  borrower?: string;
  controller?: string;
  maxTotalSupply?: number;
  annualInterestBips?: number;
  penaltyFeeBips?: number;
  gracePeriod?: number;
  liquidityCoverageRatio?: number;
  interestFeeBips?: number;
  feeRecipient?: string;
}

export function DeployNewVaultButton() {
  const controller = useController();

  const { isOpen, handleOpen, handleClose } = useIsOpen();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      asset: undefined,
      namePrefix: undefined,
      symbolPrefix: undefined,
      borrower: undefined,
      controller: undefined,
      maxTotalSupply: 0,
      annualInterestBips: 0,
      penaltyFeeBips: 0,
      gracePeriod: 0,
      liquidityCoverageRatio: 0,
      interestFeeBips: 0,
      feeRecipient: undefined,
    } as NewVaultValues,
  });

  const onSubmit = useCallback(
    (data: any) => {
      const factoryInterface = controller?.contractFactory?.createInterface();
      console.log(factoryInterface);
    },
    [controller]
  );

  return (
    <Box>
      <Button type="button" onClick={handleOpen} colorScheme="blue">
        Deploy New Vault
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="sm"
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontWeight="bold">New Vault</Text>
          </ModalHeader>
          <ModalBody>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <Box as="fieldset" disabled={formState.isSubmitting}>
                <FormControl
                  isInvalid={typeof formState.errors.asset !== "undefined"}
                >
                  <FormLabel htmlFor="asset">Underlying Asset</FormLabel>
                  <Input
                    placeholder="address"
                    {...register("asset", {
                      required: true,
                      minLength: {
                        value: 42,
                        message: "Address is not formatted correctly",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {formState.errors.asset && formState.errors.asset.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={2}
                  isInvalid={typeof formState.errors.namePrefix !== "undefined"}
                >
                  <FormLabel htmlFor="namePrefix">
                    Issued Vault Token Name Prefix
                  </FormLabel>
                  <Input
                    placeholder="Token"
                    {...register("namePrefix", {
                      required: true,
                      minLength: {
                        value: 4,
                        message: "Name prefix must be at least 4 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {formState.errors.namePrefix &&
                      formState.errors.namePrefix.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={2}
                  isInvalid={
                    typeof formState.errors.symbolPrefix !== "undefined"
                  }
                >
                  <FormLabel htmlFor="symbolPrefix">
                    Issued Vault Token Symbol Prefix
                  </FormLabel>
                  <Input
                    placeholder="XYZ"
                    {...register("symbolPrefix", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "Symbol prefix must be at least 3 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {formState.errors.symbolPrefix &&
                      formState.errors.symbolPrefix.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel htmlFor="maxTotalSupply">
                    Maximum Amount to Borrow
                  </FormLabel>
                  <Input {...register("maxTotalSupply")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel htmlFor="annualInterestBips">
                    Annual Interest Rate (APR)
                  </FormLabel>
                  <Input {...register("annualInterestBips")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel htmlFor="penaltyFeeBips">
                    Penalty Fee Rate
                  </FormLabel>
                  <Input {...register("penaltyFeeBips")} />
                </FormControl>

                <FormControl
                  mt={2}
                  isInvalid={typeof formState.errors.controller !== "undefined"}
                >
                  <FormLabel htmlFor="controller">
                    Lender Contoller (Whitelister)
                  </FormLabel>
                  <Input
                    placeholder="address"
                    {...register("controller", {
                      required: true,
                      minLength: {
                        value: 42,
                        message: "Address not formatted correctly",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {formState.errors.controller &&
                      formState.errors.controller.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel htmlFor="liquidityCoverageRatio">
                    Liquidity Coverage Ratio
                  </FormLabel>
                  <Input {...register("liquidityCoverageRatio")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel htmlFor="gracePeriod">Grace Period</FormLabel>
                  <Input {...register("gracePeriod")} />
                </FormControl>

                <Button type="submit" colorScheme="blue" mt={4} w="100%">
                  Submit
                </Button>
              </Box>
            </form>
          </ModalBody>

          <ModalFooter borderTop="1px solid #cccccc" mt={4}>
            <Button type="button" w="100%">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
