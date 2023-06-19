import * as React from "react";
import {
  ChakraProvider,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  theme,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "./modules/wagmi/components";
import { TopBar } from "./modules/common/components";
import { Control, Borrow } from "./modules/interfaces/components";

const queryClient = new QueryClient();

export const App = () => (
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
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </WagmiProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
