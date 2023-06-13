import React from "react";
import { Box, Stack, Text, Input } from "@chakra-ui/react";
import { useController } from "../hooks";

export function Control() {
  const controller = useController();

  return (
    <Box py={4} w="100%">
      <Stack spacing={2}>
        <Text size="sm" fontWeight="bold">
          Controller Address
        </Text>
        <Input isReadOnly placeholder={controller?.address} />
      </Stack>
    </Box>
  );
}
