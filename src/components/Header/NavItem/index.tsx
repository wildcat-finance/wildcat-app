import { NavItemProps } from './interface'

const NavItem = ({ link, name }: NavItemProps) => {
  return (
    <a
      href={link}
      className='text-sm text-white underline font-bold'
    >
      {name}
    </a>
  )
}

export default NavItem