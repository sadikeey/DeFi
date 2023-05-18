import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'

const menuItems = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Explore',
    to: '/explore',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='relative z-50 w-full border-b-[1px] bg-white px-4'>
      <nav className='relative mx-auto flex min-h-[9vh] w-full items-center justify-between xl:max-w-[60vw]'>
        <Logo className='text-3xl xl:text-5xl' />
        <div
          className={`z-40 absolute xl:static h-screen xl:h-full w-[70vw] xl:w-full top-[9vh] bg-white p-8 pt-16 xl:p-2 border-l-[1px] border-t-[1px] xl:border-none transition-all ease-in-out delay-100 ${
            isMenuOpen ? 'right-[-4vw]' : 'right-[-100vw]'
          }`}
        >
          <ul
            onClick={() => setIsMenuOpen(false)}
            className='flex flex-col justify-center gap-8 font-medium xl:flex-row xl:items-center'
          >
            {menuItems.map(({ name, to }) => (
              <li
                className='rounded border-b-2 px-2 py-1 hover:bg-green-100 xl:border-none'
                key={name}
              >
                <Link to={to}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            to='/signup'
            className='text-normal hidden rounded rounded-br-2xl rounded-tl-2xl bg-green-700 px-16 py-3 font-semibold text-white hover:bg-green-600 hover:text-white xl:block'
          >
            Login
          </Link>
        </div>
        <div id='toggle-menu'>
          <button
            type='button'
            className='text-normal rounded rounded-br-2xl rounded-tl-2xl bg-green-700 px-4 py-3 text-2xl font-semibold text-white hover:bg-green-600 hover:text-white xl:hidden'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <MdClose /> : <HiMenuAlt3 />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default NavBar
