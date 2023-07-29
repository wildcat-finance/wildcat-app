import { useState, useCallback } from "react";

export function useIsOpen() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = useCallback((): void => {
    if (!isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = useCallback((): void => {
    if (isOpen) {
      setOpen(false);
    }
  }, [isOpen]);

  const handleToggle = useCallback((): void => {
    setOpen(!isOpen);
  }, [isOpen]);

  return { isOpen, handleOpen, handleClose, handleToggle };
}
