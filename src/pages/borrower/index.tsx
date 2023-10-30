import { Routes, Route } from "react-router-dom"

import { BORROWER_ROUTES } from "./routes"
import { Spinner } from "../../components/ui-components"
import { useBorrowerRouting } from "./hooks/useBorrowerRouting"
import { useWalletConnect } from "./hooks/useWalletConnect"
import { useCurrentNetwork } from "../../hooks/useCurrentNetwork"

const BorrowerSection = () => {
  const { isConnected } = useWalletConnect()
  const { isLoading } = useBorrowerRouting()
  const { isWrongNetwork } = useCurrentNetwork()

  if (!isConnected || isWrongNetwork) {
    return <div />
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
