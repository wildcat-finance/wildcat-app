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
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useIsOpen } from "../../common/hooks";

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
  const { isOpen, handleOpen, handleClose } = useIsOpen();

  const { register, handleSubmit, formState } = useForm({
    values: {
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

  const onSubmit = useCallback((data: any) => console.log(data), []);

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
            <Box as="form" method="post" onSubmit={handleSubmit(onSubmit)}>
              <Box as="fieldset" disabled={formState.isSubmitting}>
                <FormControl>
                  <FormLabel>Underlying Asset</FormLabel>
                  <Input placeholder="address" {...register("asset")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Issued Vault Token Name Prefix</FormLabel>
                  <Input placeholder="Token" {...register("namePrefix")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Issued Vault Token Symbol Prefix</FormLabel>
                  <Input placeholder="XYZ" {...register("symbolPrefix")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Maximum Amount to Borrow</FormLabel>
                  <Input {...register("maxTotalSupply")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Annual Interest Rate (APR)</FormLabel>
                  <Input {...register("annualInterestBips")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Penalty Fee Rate</FormLabel>
                  <Input {...register("penaltyFeeBips")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Lender Contoller (Whitelister)</FormLabel>
                  <Input placeholder="address" {...register("controller")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Liquidity Coverage Ratio</FormLabel>
                  <Input {...register("liquidityCoverageRatio")} />
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel>Grace Period</FormLabel>
                  <Input {...register("gracePeriod")} />
                </FormControl>

                <Button type="submit" colorScheme="blue" mt={4} w="100%">
                  Submit
                </Button>
              </Box>
            </Box>
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
