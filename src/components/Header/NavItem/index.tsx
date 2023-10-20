import { Link } from "react-router-dom"
import { NavItemProps } from "./interface"

function NavItem({ link, name }: NavItemProps) {
  return (
    <Link to={link} className="text-sm text-white underline font-bold">
      {name}
    </Link>
  )
}

export default NavItem
