import * as React from "react";
import {
  ChakraProvider,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  theme,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { WagmiProvider } from "./modules/wagmi/components";
import { TopBar } from "./modules/common/components";
import { Control, Borrow, Lend } from "./modules/interfaces/components";

const queryClient = new QueryClient();

export const App = () => {
  const { isConnected } = useAccount();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <TopBar />
          <Box p={4}>
            <Box
              maxWidth="1440px"
              m="auto"
              w="100%"
              border="2px solid #cccccc"
              borderRadius="md"
              p={2}
            >
              {isConnected ? (
                <Tabs variant="enclosed">
                  <TabList>
                    <Tab>Control</Tab>
                    <Tab>Borrowers</Tab>
                    <Tab>Lenders</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Control />
                    </TabPanel>
                    <TabPanel>
                      <Borrow />
                    </TabPanel>
                    <TabPanel>
                      <Lend />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              ) : (
                <Text textAlign="center" fontWeight="bold" py={12}>
                  Please connect wallet on Sepolia test network
                </Text>
              )}
            </Box>
          </Box>
        </WagmiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
