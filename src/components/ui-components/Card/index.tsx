import cn from 'classnames'
import { CardProps } from './interface'

const Card = ({className, children}: CardProps) => {
  const cardClassName = cn(
    className,
    'rounded-md border border-border-black p-8'
)
  return (
    <div className={cardClassName}>{children}</div>
  )
}

export default Card