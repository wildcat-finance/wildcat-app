import { useNavigate } from 'react-router-dom';

import arrowBack from '../../../components/ui-components/icons/arrow_back_ios.svg'
import { Button, FormItem, Input, Paper } from '../../../components/ui-components';
import { ServiceAgreementCard } from '../../../components/ServiceAgreementCard';

const VaultDetails = () => {
  const navigate = useNavigate();

  const handleClickMyVaults = () => {
    navigate('/borrower/my-vaults')
}

  return (
    <div>
      <button className='flex items-center gap-x-2 mb-8' onClick={handleClickMyVaults}>
          <img src={arrowBack} alt="Back" />
          <p className='text-xs font-normal underline'>My Vaults</p>
      </button>
      <div className="text-green text-2xl font-bold font-black mb-8 w-2/3">
      Blossom Dai Stablecoin
      </div>
      <Paper className='flex flex-col gap-y-6 border-0 px-6 py-5 mb-8 bg-tint-10 border-tint-8 rounded-3xl'>
          <div>
            <div className='w-full flex justify-between items-center'>
              <div>Borrow</div>
              <div className='flex gap-x-3.5 w-full max-w-lg'>
                <Input className='w-full' placeholder='00,000.00'/>
                <Button variant={'green'} className='w-64'>Borrow</Button>
              </div>
            </div>
            <div className='text-xxs text-right mt-1.5 mr-48'>
              <span className='font-semibold'>Borrow up to </span>
              2,750 DAI
            </div>
          </div>
          <div>
            <div className='w-full flex justify-between items-center'>
              <div>Repay</div>
              <div className='flex items-center gap-x-3.5 w-full max-w-lg'>
                <Input className='w-full' placeholder='00,000.00'/>
                  <div className='flex flex-col gap-y-1.5'>
                    <Button variant={'green'} className='w-44'>Repay</Button>
                    <Button variant={'green'} className='w-44 px-2 whitespace-nowrap'>Repay to minimum reserve ratio</Button>
                  </div>
              </div>
            </div>
            <div className='text-xxs text-right mt-1.5 mr-48'>
              <span className='font-semibold'>Repay up to </span>
              9,000 DAI
            </div>
          </div>
          <div>
            <div className='w-full flex justify-between items-center'>
              <div>Annual interest rate (%)</div>
              <div className='flex gap-x-3.5 w-full max-w-lg'>
                <Input className='w-full' placeholder='10.00'/>
                <Button variant={'green'} className='w-64'>Adjust</Button>
              </div>
            </div>
            <div className='text-xxs text-right mt-1.5 mr-48'>
              <span className='font-semibold'>Current </span>
              10%
            </div>
          </div>
      </Paper>
      <div className='text-base font-bold'>Vault Controller / Some title</div>
      <div className='flex gap-x-7 mb-8'>
        <FormItem
        className='mt-5 w-72'
        label='Vault type'
        tooltip='test'>
          <Input className='w-72' />
        </FormItem>
        <FormItem
        className='mt-5 w-72'
        label='Vault contract address'
        tooltip='test'>
          <Input className='w-72' />
        </FormItem>
      </div>
      <div className='text-base font-bold'>Details</div>
      <div className='mt-5 mb-8'>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Annual Interest Rate</div>
          <div className="inline text-black text-xs">10%</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Maximum Capacity</div>
          <div className="inline text-black text-xs">50,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Deposits</div>
          <div className="inline text-black text-xs">25,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Amount Borrowed</div>
          <div className="inline text-black text-xs">16,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Current Reserves</div>
          <div className="inline text-black text-xs">9,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Current Reserve Ratio</div>
          <div className="inline text-black text-xs">144%</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Reqired Reserves</div>
          <div className="inline text-black text-xs">6,250 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Minimum Reserve Ratio</div>
          <div className="inline text-black text-xs">25%</div>
        </div>
      </div>
      <div className='flex w-full justify-between content-center'>
        <div className='text-base font-bold'>Lenders</div>
        <Button variant={'blue'}>Onboard Lender</Button>
      </div>
      <div className='mt-5 mb-8'>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Annual Interest Rate</div>
          <div className="inline text-black text-xs">10%</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Maximum Capacity</div>
          <div className="inline text-black text-xs">50,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Deposits</div>
          <div className="inline text-black text-xs">25,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Amount Borrowed</div>
          <div className="inline text-black text-xs">16,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Current Reserves</div>
          <div className="inline text-black text-xs">9,000 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Current Reserve Ratio</div>
          <div className="inline text-black text-xs">144%</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-9">
          <div className="inline text-black text-xs font-bold">Reqired Reserves</div>
          <div className="inline text-black text-xs">6,250 DAI</div>
        </div>
        <div className="w-full flex justify-between items-center flex-row px-3 h-9 leading-8 bg-tint-10">
          <div className="inline text-black text-xs font-bold">Minimum Reserve Ratio</div>
          <div className="inline text-black text-xs">25%</div>
        </div>
      </div>
      <div className='text-base font-bold'>Vault interaction history</div>
      <Paper className='border-tint-10 mt-5 mb-8 bg-white h-48'>

      </Paper>
      <div className='flex justify-between items-center'>
        <ServiceAgreementCard
                  title='Vault Master Loan Agreement'
                  description='You signed the blsmDAI Master Loan Agreement on 17-Sept-2023'
              />
        <Button variant={'brown'}>Terminate Vault</Button>
      </div>

      <ServiceAgreementCard
                className="mt-10"
                title='Wildcat Service Agreement'
                description='You agreed to the Wildcat Service Agreement on 12-Sept-2023'
            />
    </div>
  )
}

export default VaultDetails