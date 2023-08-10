import Link from 'next/link';
import Image from 'next/image';
import Splash from '../../public/temp_splash.png';
import Mock from '../../public/temp_mock.png';
import Splash2 from '../../public/temp_splash2.png';
import Video from '../../public/temp_video.png';
import { open_sans, pt_sans } from '../lib/fonts';

export default function Home({}) {
  return (
    <>
      <section className='mx-12 flex flex-col space-y-12'>
        <div className='flex justify-between h-screen'>
          <div className='flex flex-col w-full self-center text-center'>
            <h1
              className={`text-8xl ${open_sans.variable} font-open font-bold`}
              data-cy='splash-title'>
              Track
            </h1>
            <div
              className={`${pt_sans.variable} font-pt flex flex-col space-y-12`}>
              <h2 className='text-4xl' data-cy='splash-tag'>
                Learn and prove it.
              </h2>
              <Link href='/dashboard'>
                <button
                  type='button'
                  className='bg-purple p-2 text-white text-lg border-4 border-black rounded'
                  data-cy='get-started'>
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <Image
            src={Splash}
            className='h-full w-auto'
            alt='Artwork of happy train conductor driving a train full of learning materials.'
          />
        </div>
        <div className='flex items-center p-12 border-black border-4 text-white bg-purple rounded'>
          <Image
            src={Mock}
            className='w-1/2 h-auto'
            alt='laptop displaying the use of the Track tool'
            data-cy='splash-mock1'
          />
          <div className='flex flex-col' data-cy='splash-info1'>
            <p className='text-2xl mb-4'>
              Track is a learning tool built for you, not for some corporate
              entity.
            </p>
            <p className='text-2xl mb-4'>
              Community-driven learning paths provide learning opportunities
              that can mimic college education, work training, and personal
              fulfillment.
            </p>
            <p className='text-2xl'>
              Find pathways created by educators, curriculum designers,
              professionals, and hobbyists.
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-center h-screen'>
          <Image
            src={Splash2}
            className='w-1/4 h-auto self-center mb-12'
            alt='laptop displaying the use of the Track tool'
            data-cy='splash-mock2'
          />
          <div
            className='flex flex-col items-center text-center'
            data-cy='splash-info-2'>
            <p className='text-2xl mb-4'>
              Track was designed to put you in the driver&apos;s seat of your
              learning, while also allowing you to proove your understaning and
              share your accomplishments with the world.
            </p>
            <p className='text-2xl mb-4'>
              As you complete your learning, you can add artifacts to back up
              your understanding and skills. Once you&apos;re ready, send the link to
              your portofolio for any given pathway. Potential employers,
              colleagues, and friends can verify you&apos;re learning by reveiwing
              your portfolio.
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center bg-purple border-4 border-black rounded p-12 space-y-12 w-2/3 self-center'>
          <p className='text-2xl text-white'>Learn More</p>
          <Image
            src={Video}
            className='w-100 h-auto border-4 border-black rounded'
            alt='laptop displaying the use of the Track tool'
            data-cy='splash-video'
          />
        </div>
      </section>
    </>
  );
}
