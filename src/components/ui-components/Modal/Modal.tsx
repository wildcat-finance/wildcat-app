import { Popover } from "@headlessui/react";

import { ModalProps } from "./interface";
import { Button } from "../Button";
import { Paper } from "../Paper";

export const Modal = ({
  buttonName,
  buttonColor,
  buttonClassName,
  children,
  visible,
}: ModalProps) => {
  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          <Button variant={buttonColor} className={buttonClassName}>
            {buttonName}
          </Button>
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
            <Paper className="bg-white border-none shadow-lg py-5">
              {children}
            </Paper>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
};
