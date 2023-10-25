import { Button, ButtonProps } from "react-aria-components"

export function RoundButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="w-9 h-9 outline-none cursor-pointer bg-transparent text-gray-600 border-0 rounded-full flex items-center justify-center"
    />
  )
}
