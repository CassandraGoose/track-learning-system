import NavLink from 'next/link';
import Image from 'next/image';
import SmallLogo from '../components/SmallLogo';
import Avatar from '../../public/temp_profile_image.png';
import { open_sans } from '../lib/fonts';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const isActive = (pathname:string) => {
    return router.pathname === pathname ? ' border-b-4 border-black font-bold' : '';
  }

  return (
    <nav className={`border-b-4 border-black ${open_sans.variable} font-open text-lg `}>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <SmallLogo />
        <div className='flex items-center order-2'>
          <button
            type='button'
            className='flex text-sm rounded-full'
            aria-expanded='false'
            data-dropdown-toggle='user-dropdown'
            data-dropdown-placement='bottom'>
            <span className='sr-only'>Open User Menu</span>
            <div className='w-24 h-auto flex justify-center'>
            <Image
              data-cy="navbar-user-avatar"
              className='w-1/2 h-auto rounded-full'
              src={Avatar}
              alt='user photo'
            />
            </div>
          </button>
        </div>
        <div
          className='items-center justify-between flex w-auto order-1 h-fit'
          id='navbar-user'>
          <ul className='flex font-medium p-4 md:p-0 borderrounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
            <li className={isActive('/dashboard')}>
              <NavLink
                className="py-2 pl-3 pr-4 rounded md:bg-transparent"
                href='/dashboard'
                data-cy="navbar-dashboard-link"
                >
                Dashboard
              </NavLink>
            </li>
            <li className={isActive('/pathways')}>
              <NavLink
                className=' py-2 pl-3 pr-4 rounded md:bg-transparent'
                href='/'
                data-cy="navbar-pathways-link">
                Pathways
              </NavLink>
            </li>
            <li className={isActive('/about')}>
              <NavLink
                className=' py-2 pl-3 pr-4 rounded md:bg-transparent'
                href='/'
                data-cy="navbar-about-link">
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
