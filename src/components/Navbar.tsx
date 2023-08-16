import Link from 'next/link';
import Image from 'next/image';
import Avatar from '../../public/temp_profile_image.png';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname
      ? ' border-b border-black'
      : '';
  };

  return (
    <nav className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl' data-cy="home-link">TRACK</a>
      </div>
      <div>
        <ul className='flex p-4 md:p-0 borderrounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
          <li className={isActive('/dashboard')}>
            <Link
              className="px-2"
              href='/dashboard'
              data-cy='navbar-dashboard-link'>
              Dashboard
            </Link>
          </li>
          <li className={isActive('/pathways')}>
            <Link
              className="px-2"

              href='/'
              data-cy='navbar-pathways-link'>
              Pathways
            </Link>
          </li>
          <li className={isActive('/about')}>
            <Link
              className="pl-2 pr-4"

              href='/'
              data-cy='navbar-about-link'>
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <Image src={Avatar} alt='default avatar blank face' data-cy="navbar-user-avatar" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <a className='justify-between'>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
