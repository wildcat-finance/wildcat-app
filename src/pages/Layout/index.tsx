import { Outlet } from "react-router-dom"

import { Header } from "../../components/Header"
import { MobilePage } from "./MobilePage"
import { Footer } from "../../components/Footer"

const Layout = () => {
  const isMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ]

    return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem))
  }

  return (
    <div>
      <Header />

      <div className="p-10 w-full max-w-5xl mx-auto">
        {!isMobile() ? <Outlet /> : <MobilePage />}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
