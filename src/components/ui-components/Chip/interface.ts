export type ChipColorVariants =
  | "default"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "tint-9"

export type ChipProps = {
  children?: React.ReactNode
  className?: string
  color?: ChipColorVariants
}
