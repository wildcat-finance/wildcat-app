import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

export function TopBar() {
  return (
    <Box w="100%" borderBottom="2px solid #cccccc" boxShadow="md">
      <Flex
        maxWidth="1440px"
        m="auto"
        h="60px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text size="lg" fontFamily="mono" fontWeight="bold">Wildcat</Text>
      </Flex>
    </Box>
  );
}
