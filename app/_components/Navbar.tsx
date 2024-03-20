'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/actions/actions';
import { User } from 'lucia';
import { useEffect, useState } from 'react';

export default function Navbar({ user }: { user: User | null}) {
  const currentPathname = usePathname();

  const isActive = (pathname: string) => {
    return currentPathname === pathname ? ' border-b border-black' : '';
  };

  const [showNavItem, setShowNavItem] = useState(false);

  useEffect(() => {
    setShowNavItem(!!user);
  }, [user])

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
          <li className={`${isActive('/dashboard')} ${showNavItem ? '' : 'hidden'}`}>
            <Link
              className="px-2"
              href="/dashboard"
              data-testid="navbar-dashboard-link"
            >
              Dashboard
            </Link>
          </li>
          <li className={isActive('/pathways')}>
            <Link className="px-2" href="/pathways" data-testid="navbar-pathways-link">
              Pathways
            </Link>
          </li>
          {/* <li className={isActive('/about')}>
            <Link
              className="pl-2 pr-4"
              href="/"
              data-testid="navbar-about-link"
            >
              About
            </Link>
          </li> */}
        </ul>
      </div>
      <div className={`${showNavItem ? '': 'hidden'} flex-none gap-2`}>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <p className="text-3xl" data-testid="navbar-user-button">
                &#9776;
              </p>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="border-black menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-md border bg-bright p-2 shadow"
          >
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <form action={logout}>
                <button className="btn btn-primary">Log out</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
