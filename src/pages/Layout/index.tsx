import { Outlet } from "react-router-dom"

import { useMedia } from "react-use"
import { Header } from "../../components/Header"
import { MobilePage } from "./MobilePage"

const Layout = () => {
  const isDesktop = useMedia("(min-width: 768px)")

  return (
    <div>
      <Header />

      <div className="p-10 w-full max-w-5xl mx-auto">
        {isDesktop ? <Outlet /> : <MobilePage />}
      </div>
    </div>
  )
}

export default Layout
