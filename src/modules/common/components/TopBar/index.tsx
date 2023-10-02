import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ConnectButton } from "../ConnectButton";

export function TopBar() {
  return (
    <Box w="100%" borderBottom="2px solid #cccccc">
      <Flex
        maxWidth="1440px"
        m="auto"
        h="60px"
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="2xl" fontFamily="mono" fontWeight="bold">
          Wildcat
        </Text>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
    </Box>
  );
}
