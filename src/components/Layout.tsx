import Navbar from './Navbar';
import { Children } from '../lib/interface';

export default function Layout({ children }: Children) {
  return (
    <>
      <Navbar />
        <main>{children}</main>
    </>
  )
}