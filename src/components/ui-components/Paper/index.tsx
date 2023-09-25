import cn from 'classnames'
import { CardProps } from './interface'

export const Paper = ({className, children}: CardProps) => {
  const cardClassName = cn(
      className,
      'rounded-md border border-border-black p-8'
  )
  return (
      <div className={cardClassName}>{children}</div>
  )
}