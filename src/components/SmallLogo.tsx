import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../public/temp_logo.png';

export default function SmallLogo() {
  return (
    <Link className='flex items-center' href='/' data-cy="small-logo">
      <Image className='w-24 h-auto' src={Logo} alt='logo' />
    </Link>
  );
}
