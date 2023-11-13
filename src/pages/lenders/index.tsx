import { Routes, Route } from "react-router-dom"

import { LENDERS_ROUTES } from "./routes"
import { Spinner } from "../../components/ui-components"
import { useCurrentNetwork } from "../../hooks/useCurrentNetwork"
import { useWalletConnect } from "../borrower/hooks/useWalletConnect"
import { useLenderRouting } from "./hooks/useLenderRoutes"

const LendersSection = () => {
  const { isConnected } = useWalletConnect()
  const { isLoading } = useLenderRouting()
  const { isWrongNetwork } = useCurrentNetwork()

  if (!isConnected || isWrongNetwork) {
    return <div />
  }

  if (isLoading) {
    return <Spinner isLoading={isLoading} />
  }

  return (
    <Routes>
      {LENDERS_ROUTES.map((route) => (
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

export default LendersSection
