import { Outlet } from "react-router-dom"

import { Header } from "../../components/Header"

const Layout = () => (
  <div>
    <Header />

    <div className="p-10 w-full max-w-5xl mx-auto">
      <Outlet />
    </div>
  </div>
)

export default Layout
