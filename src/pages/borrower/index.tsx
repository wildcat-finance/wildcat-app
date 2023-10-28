import { Routes, Route } from "react-router-dom"
import { useAccount } from "wagmi"

import { BORROWER_ROUTES } from "./routes"
import { Spinner } from "../../components/ui-components"
import ConnectYourWallet from "../ConnectYourWallet"
import { useBorrowerRouting } from "./hooks/useBorrowerRouting"

const BorrowerSection = () => {
  const { isConnected } = useAccount()
  const { isLoading } = useBorrowerRouting()

  if (!isConnected) {
    return <ConnectYourWallet />
  }

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  return (
    <Routes>
      {BORROWER_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
          index={route.index}
        />
      ))}
    </Routes>
  )
}

export default BorrowerSection
