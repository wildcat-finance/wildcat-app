import { IconButton, Tooltip } from "@chakra-ui/react";
import { VaultAccount } from "@wildcatfi/wildcat-sdk";
import { useAddToken } from "../hooks/useAddToken";
import Metamask from "../../../images/MetaMask_Fox.svg";

interface Props {
  vaultAccount: VaultAccount;
}

export function AddTokenButton({ vaultAccount }: Props) {
  const { canAddToken, handleAddToken, isAddingToken } = useAddToken();

  return canAddToken ? (
    <Tooltip label="Add to Metamask">
      <IconButton
        ml={5}
        aria-label="Add Token to Metamask"
        icon={<img src={Metamask} alt="Add token to Metamask" />}
        size="xs"
        isRound={true}
        background="transparent"
        onClick={() =>
          handleAddToken({
            address: vaultAccount.vault.vaultToken.address,
            name: vaultAccount.vault.vaultToken.name,
            symbol: vaultAccount.vault.vaultToken.symbol,
            decimals: vaultAccount.vault.vaultToken.decimals,
          })
        }
        isLoading={isAddingToken}
      />
    </Tooltip>
  ) : null;
}
