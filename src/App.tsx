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

import './styles/index.css';

import { WagmiProvider } from "./modules/wagmi/components";
import { Borrow, Lend } from "./modules/interfaces/components";
import { useAllVaultsForUser } from "./modules/interfaces/hooks/useAllVaultsForUser";
import { Header } from './components/Header'
import { DeployNewVaultButton } from './modules/interfaces/components/NewVault'

const queryClient = new QueryClient();

function Main() {
  const { isConnected } = useAccount();

  const { data: allVaults } = useAllVaultsForUser();
  return (
    <Box p={4} className="bg-sand">
      {/*<DeployNewVaultButton />*/}
      {/*<Box*/}
      {/*  maxWidth="1440px"*/}
      {/*  m="auto"*/}
      {/*  w="100%"*/}
      {/*  border="2px solid #cccccc"*/}
      {/*  borderRadius="md"*/}
      {/*  p={2}*/}
      {/*>*/}
      {/*  {isConnected ? (*/}
      {/*    <Tabs variant="enclosed">*/}
      {/*      <TabList>*/}
      {/*        <Tab>Borrowers</Tab>*/}
      {/*        <Tab>Lenders</Tab>*/}
      {/*      </TabList>*/}

      {/*      <TabPanels>*/}
      {/*        <TabPanel>*/}
      {/*          <Borrow allVaults={allVaults} />*/}
      {/*        </TabPanel>*/}
      {/*        <TabPanel>*/}
      {/*          <Lend allVaults={allVaults} />*/}
      {/*        </TabPanel>*/}
      {/*      </TabPanels>*/}
      {/*    </Tabs>*/}
      {/*  ) : (*/}
      {/*    <Text textAlign="center" fontWeight="bold" py={12}>*/}
      {/*      Please connect wallet on Sepolia test network*/}
      {/*    </Text>*/}
      {/*  )}*/}
      {/*</Box>*/}

      {/*<UI />*/}
    </Box>
  );
}

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <Header />
          <Main />
        </WagmiProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};
