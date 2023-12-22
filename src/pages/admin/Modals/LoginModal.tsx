import { Modal } from "../../../components/ui-components"

export interface LoginModalProps {
  isOpen: boolean
  // onClose: () => void
  isLoading: boolean
  onSubmit: () => void
}

export const LoginModal = ({
  isOpen,
  isLoading,
  onSubmit,
}: LoginModalProps) => (
  <Modal
    isOpen={isOpen}
    // onClose={onClose}
    isLoading={isLoading}
    onClick={onSubmit}
    firstBtnText="Confirm"
  >
    <div>
      <div className="text-base font-bold px-8 w-100 text-center">
        Log in to admin portal
      </div>
    </div>
  </Modal>
)
