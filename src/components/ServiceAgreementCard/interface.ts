import { ReactNode } from "react"

export interface CardProps {
  className?: string
  children?: ReactNode
  title?: string
  description?: string
  fileLink?: string
}
