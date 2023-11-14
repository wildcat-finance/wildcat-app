import { Link, useLocation } from "react-router-dom"
import { NavItemProps } from "./interface"

function NavItem({ link, name, linkName }: NavItemProps) {
  const { pathname } = useLocation()
  const isActive = pathname.includes(linkName)

  return (
    <Link
      to={link}
      className={`text-sm font-bold text-white ${isActive ? "underline" : ""}`}
    >
      {name}
    </Link>
  )
}

export default NavItem
