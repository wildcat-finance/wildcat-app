import cn from "classnames"
import { CardProps } from "./interface"
import { DownloadIcon } from "../ui-components/icons"

import { Button } from "../ui-components"

export function ServiceAgreementCard({
  className,
  children,
  title,
  description,
}: CardProps) {
  const cardClassName = cn(
    className,
    "bg-white p-3 flex flex-col justify-center items-start gap-5 max-w-fit rounded-3xl",
  )

  return (
    <div className={cardClassName}>
      {children}
      <p className="font-bold">{title}</p>

      <div className="flex gap-5 justify-center items-center">
        <span className="font-light text-xxs">{description}</span>
        <Button variant="white-brown" icon={<DownloadIcon />}>
          Download
        </Button>
      </div>
    </div>
  )
}
