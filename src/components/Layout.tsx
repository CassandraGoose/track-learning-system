import Navbar from './Navbar';
import SiteFooter from './SiteFooter';
import { Children } from '../lib/interface';

export default function Layout({ children }: Children) {
  return (
    <>
      <Navbar />
        <main>{children}</main>
      <SiteFooter />
    </>
  )
}