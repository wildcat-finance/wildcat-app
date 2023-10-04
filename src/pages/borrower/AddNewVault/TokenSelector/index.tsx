import { useState } from "react";

import { Combobox } from "../../../../components/ui-components";
import { useTokensList } from "../../../../hooks/useTokensList";
import { TokenMeta } from "../../../../types/tokens";
import { TokenSelectorProps } from "./interface";

function tokensToOptions(tokens: TokenMeta[]) {
    return tokens.map((token) => ({
        id: token.address,
        label: token.name,
        value: token.address,
    }))
}

export const TokenSelector = ({ className}: TokenSelectorProps ) => {
    const [selectedTokenAddress, setSelectedTokenAddress] = useState<string | null>(null)
    const { filterByName, filteredTokens } = useTokensList()

    const options = tokensToOptions(filteredTokens);


    return (
        <div className={className}>
            <Combobox
                onSelect={setSelectedTokenAddress}
                onSearch={filterByName}
                value={selectedTokenAddress}
                options={options}
            />
        </div>
    )
}