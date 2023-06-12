import React from "react";
import { Box, Stack, Text, Input } from "@chakra-ui/react";

export function Control() {
  return (
    <Box py={4} w="100%">
      <Stack spacing={2}>
        <Text size="sm" fontWeight="bold">
          Controller Address
        </Text>
        <Input disabled value="address" />
      </Stack>
    </Box>
  );
}
