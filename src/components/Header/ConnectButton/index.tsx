import { RiWallet3Line } from 'react-icons/ri'

const ConnectButton = () => {
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
