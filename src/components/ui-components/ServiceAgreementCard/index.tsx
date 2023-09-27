import cn from 'classnames'
import { CardProps } from './interface'
import sim_card_download from '../../../images/icons/sim_card_download.svg';

import { Button } from '../../ui-components/Button/index';

export const ServiceAgreementCard = ({ className, children, title, description, fileLink }: CardProps) => {
    const cardClassName = cn(
        className,
        'bg-white p-3 flex flex-col justify-center items-start gap-5 max-w-fit rounded-3xl'
    )
    return (
        <div className={cardClassName}>{children}
            <p>{title}</p>
            <div className='flex gap-5 justify-center items-center'>
                <span>{description}</span>
                <Button className="items-center flex py-1.5 px-5 gap-x-2.5" variant='white-brown'>
                    <span className='text-xs text-center'>Download</span>
                    <img src={sim_card_download} alt="sim_card_download"></img>
                </Button>
            </div>
        </div>
    )
}
