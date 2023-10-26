import { Routes, Route } from "react-router-dom"

import { BORROWER_ROUTES } from "./routes"

const BorrowerSection = () => {
  const a = 1
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
