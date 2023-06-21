import React, { useCallback, useState } from "react";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

export function ConnectButton() {
  const [isOpen, setOpen] = useState(false);

  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const isWrongNetwork = chain?.id !== 11155111;

  const openModal = useCallback(() => {
    if (!isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  const closeModal = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    }
  }, [isOpen]);

  const getButtonText = useCallback(() => {
    if (isConnected && isWrongNetwork) {
      return "Wrong Network";
    } else if (isConnected && address) {
      return `${address.slice(0, 2)}..${address.slice(-4, address.length)}`;
    } else {
      return "Connect";
    }
  }, [isConnected, address, isWrongNetwork]);

  return (
    <>
      <Button
        type="button"
        onClick={openModal}
        colorScheme={isWrongNetwork ? "red" : "blue"}
      >
        {getButtonText()}
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} size="xs">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader>
            <Text textAlign="center" fontWeight="bold" size="lg">
              {isConnected ? "Account" : " Select Wallet"}
            </Text>
          </ModalHeader>

          <ModalBody>
            {isWrongNetwork ? (
              <Button
                type="button"
                onClick={() => switchNetwork?.(11155111)}
                w="100%"
                colorScheme="blue"
              >
                Switch to Sepolia
              </Button>
            ) : null}
            {isConnected ? (
              <>
                <Text textAlign="center" size="sm">
                  {address}
                </Text>

                <Button
                  type="button"
                  colorScheme="red"
                  w="100%"
                  onClick={() => disconnect()}
                  mt={2}
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <>
                {connectors.map((connector) => (
                  <Button
                    key={connector.id}
                    type="button"
                    onClick={() => connect({ connector })}
                    mt={2}
                    w="100%"
                  >
                    {connector.name}
                  </Button>
                ))}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button type="button" onClick={closeModal} w="100%">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
