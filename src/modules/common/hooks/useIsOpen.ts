import { useState, useCallback } from "react";

export function useIsOpen() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    if (!isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    }
  }, [isOpen]);

  return { isOpen, handleOpen, handleClose };
}
