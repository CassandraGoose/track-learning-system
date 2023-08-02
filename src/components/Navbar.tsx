import Link from 'next/link';
import Image from 'next/image';
import SmallLogo from '../components/SmallLogo';
import Avatar from '../../public/temp_profile_image.png';

export default function Navbar() {
  return (
    <nav>
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
            <Image
              data-cy="navbar-user-avatar"
              className='w-8 h-8 rounded-full'
              src={Avatar}
              alt='user photo'
            />
          </button>
        </div>
        <div
          className='items-center justify-between flex w-auto order-1'
          id='navbar-user'>
          <ul className='flex font-medium p-4 md:p-0 borderrounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
            <li>
              <Link
                className=' py-2 pl-3 pr-4 rounded md:bg-transparent'
                href='/dashboard'
                data-cy="navbar-dashboard-link">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className=' py-2 pl-3 pr-4 rounded md:bg-transparent'
                href='/'
                data-cy="navbar-pathways-link">
                Pathways
              </Link>
            </li>
            <li>
              <Link
                className=' py-2 pl-3 pr-4 rounded md:bg-transparent'
                href='/'
                data-cy="navbar-about-link">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
