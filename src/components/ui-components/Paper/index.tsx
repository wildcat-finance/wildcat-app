import cn from 'classnames'
import { CardProps } from './interface'

export const Paper = ({className, children}: CardProps) => {
  const cardClassName = cn(
      className,
      'rounded-md border border-border-black'
  )
  return (
      <div className={cardClassName}>{children}</div>
  )
}