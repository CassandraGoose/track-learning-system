'use client';

import Link from 'next/link';
import Image from 'next/image';
import Avatar from '../../public/temp_profile_image.png';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const currentPathname = usePathname();

  const isActive = (pathname: string) => {
    return currentPathname === pathname ? ' border-b border-black' : '';
  };

  return (
    <nav className="border-black navbar border-b" data-testid="navbar">
      <div className="flex-1">
        <Link
          href="/"
          className="btn btn-ghost text-xl normal-case"
          data-testid="home-link"
        >
          TRACK
        </Link>
      </div>
      <div>
        <ul className="borderrounded-lg flex p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
          <li className={isActive('/dashboard')}>
            <Link
              className="px-2"
              href="/dashboard"
              data-testid="navbar-dashboard-link"
            >
              Dashboard
            </Link>
          </li>
          <li className={isActive('/pathways')}>
            <Link className="px-2" href="/" data-testid="navbar-pathways-link">
              Pathways
            </Link>
          </li>
          <li className={isActive('/about')}>
            <Link
              className="pl-2 pr-4"
              href="/"
              data-testid="navbar-about-link"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <Image
                src={Avatar}
                alt="default avatar blank face"
                data-testid="navbar-user-avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box p-2 shadow"
          >
            <li>
              <Link href="/profile">Profile</Link>
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
