export type ChipColorVariants = "default" | "gray" | "red" | "yellow" | "green"

export type ChipProps = {
  children?: React.ReactNode
  className?: string
  color?: ChipColorVariants
}
