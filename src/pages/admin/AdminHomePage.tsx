import { Spinner, Typography } from "../../components/ui-components"
import { useEthersSigner } from "../../modules/hooks"
import { BorrowerInvitesTable } from "./BorrowerInvitesTable"
import { InviteBorrowerModal } from "./InviteBorrowerModal"
import { LoginModal } from "./Modals/LoginModal"
import { useBorrowerInvites } from "./hooks/useBorrowerInvites"
import { useLoginToApi } from "./hooks/useLoginToApi"
import { useRegisterBorrower } from "./hooks/useRegisterBorrower"
import { useApiTokenStore } from "./hooks/useTokenStore"

export const AdminHomePage = () => {
  const { apiToken } = useApiTokenStore()
  const { isLoading: isSigning, mutate: login } = useLoginToApi()
  const { data: borrowerInvites, isLoading } = useBorrowerInvites()
  const { registerBorrower, isRegistering } = useRegisterBorrower()

  const signer = useEthersSigner()

  return (
    <div>
      <Typography variant="h1">Admin Portal</Typography>
      <LoginModal
        onSubmit={login}
        isLoading={isSigning}
        isOpen={!apiToken || !(apiToken === "x")}
      />
      {apiToken && <p>Logged in!</p>}
      {borrowerInvites && (
        <>
          <div className="text-base font-bold px-8">Borrower Invites</div>
          <div className="w-full border border-tint-10 my-3" />
          <BorrowerInvitesTable
            isRegistering={isRegistering}
            register={(address: string) => {
              registerBorrower(address)
            }}
            borrowerInvites={borrowerInvites}
          />
        </>
      )}
      <Spinner isLoading={isLoading} fixedDisable className="w-5 h-5 mt-2" />

      <div className="flex flex-row justify-center gap-y-2 mt-4 w-full">
        <InviteBorrowerModal />
      </div>
    </div>
  )
}
