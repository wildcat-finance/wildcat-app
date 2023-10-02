import { RiWallet3Line } from 'react-icons/ri'
import {useCallback, useState} from "react";
import {useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork} from "wagmi";

const ConnectButton = () => {
    const [isOpen, setOpen] = useState(false);

    const { connectors, connect } = useConnect();
    const { address, isConnected } = useAccount();
    const { switchNetwork } = useSwitchNetwork();
    const { disconnect } = useDisconnect();
    const { chain } = useNetwork();

    const isWrongNetwork = chain?.id !== 11155111;

    const openModal = useCallback(() => {
        if (!isOpen) {
            setOpen(true);
        }
    }, [isOpen]);

    const closeModal = useCallback(() => {
        if (isOpen) {
            setOpen(false);
        }
    }, [isOpen]);

    const getButtonText = useCallback(() => {
        if (isConnected && isWrongNetwork) {
            return "Wrong Network";
        } else if (isConnected && address) {
            return `${address.slice(0, 2)}..${address.slice(-4, address.length)}`;
        } else {
            return "Connect";
        }
    }, [isConnected, address, isWrongNetwork]);

    return (
        <button className='bg-silver-100 rounded-sm px-2 py-1'>
          <div className='flex items-center gap-2'>
            <span className='text-black text-xs'>Connect</span>
            <RiWallet3Line className='w-5'/>
          </div>
        </button>
      )
}

export default ConnectButton
