import { TopBar } from "../../modules/common/components";
import { ConnectButton } from "../../modules/common/components/ConnectButton";
import { ReactComponent as WildcartLogo } from '../../images/wildcat-logo-white.svg';

import * as React from "react";

export const Header = () => {
    return (
        <div className="h-20 bg-black px-8 py-4 flex items-center justify-between bg-">
            <WildcartLogo className="h-full" />
            <ConnectButton />
        </div>
    )
}