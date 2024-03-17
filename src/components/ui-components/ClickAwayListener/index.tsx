import React, { useRef, useEffect } from "react"

export type UseOnClickAwayProps = {
  ref: React.MutableRefObject<HTMLElement | null>
  onClickAway: () => void
}

function useOnClickAway({ ref, onClickAway }: UseOnClickAwayProps) {
  useEffect(() => {
    function handleClickAnywhere(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClickAway()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickAnywhere)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickAnywhere)
    }
  }, [ref])
}

export type ClickAwayListenerProps = {
  onClickAway: () => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "ref">

/**
 * Component that listens for click events outside of its children
 * Variation of a Stack Overflow answer by Ben Bud
 * https://stackoverflow.com/a/42234988
 */
export function ClickAwayListener({
  children,
  onClickAway,
  ...props
}: ClickAwayListenerProps) {
  const wrapperRef = useRef(null)
  useOnClickAway({ ref: wrapperRef, onClickAway })
  return (
    <div style={{ display: "contents" }} ref={wrapperRef} {...props}>
      {children}
    </div>
  )
}
