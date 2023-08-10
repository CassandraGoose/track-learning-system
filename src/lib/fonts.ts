import { Open_Sans, PT_Sans } from '@next/font/google';

export const pt_sans = PT_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-pt'
});

export const open_sans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open',
});
