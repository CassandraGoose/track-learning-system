import Link from 'next/link';
import Image from 'next/image';
import Splash from '../../public/temp_splash.png';
import Happiness from '../../public/happiness.png';
import Community from '../../public/community.png';
import Certification from '../../public/certification.png';
import Splash2 from '../../public/temp_splash2.png';
import Video from '../../public/temp_video.png';

export default function Page() {
  return (
    <section className='flex flex-col'>
      <div className='hero min-h-screen'>
        <div className='hero-content flex-col lg:flex-row'>
          <Image
            src={Splash}
            className='w-10xl pr-16'
            alt='train illustration'
          />
          <div>
            <h1 className='text-5xl font-bold' data-testid="splash-title">TRACK</h1>
            <p className='py-6' data-testid="splash-tag">Learn it. Prove it.</p>
            <button className='btn btn-secondary text-bright' role="link">
              <Link href='/pathways'>Get Started</Link>
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center p-24 border-t border-b border-secondary'>
        <div className='flex justify-center items-start' data-testid='splash-info1'>
          <div className='flex flex-col items-center flex-1 flex-grow'>
            <Image
              src={Happiness}
              className='w-1/8 h-auto mb-8'
              alt='happy person icon'
            />
            <p className='text-2xl mb-4 text-center'>
              Track is a learning tool built for you, not for some corporate
              entity.
            </p>
          </div>
          <div className='flex flex-col items-center flex-1 flex-grow mx-8'>
            <Image
              src={Community}
              className='w-1/8 h-auto mb-8'
              alt='icon of community'
            />
            <p className='text-2xl mb-4 text-center'>
              Community-driven learning paths provide learning opportunities
              that can mimic college education, work training, and personal
              fulfillment.
            </p>
          </div>
          <div className='flex flex-col items-center flex-1'>
            <Image
              src={Certification}
              className='w-1/8 h-auto mb-8'
              alt='icon of blue ribbon on a paper'
            />
            <p className='text-2xl text-center'>
              Find pathways created by educators, curriculum designers,
              professionals, and hobbyists.
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-center h-screen'>
        <Image
          src={Splash2}
          className='w-1/4 h-auto self-center mb-12'
          alt='laptop displaying the use of the Track tool'
        />
        <div
          className='flex flex-col items-center text-center'
          data-testid='splash-info2'>
          <p className='text-2xl mb-4'>
            Track was designed to put you in the driver&apos;s seat of your
            learning, while also allowing you to proove your understaning and
            share your accomplishments with the world.
          </p>
          <p className='text-2xl mb-4'>
            As you complete your learning, you can add artifacts to back up your
            understanding and skills. Once you&apos;re ready, send the link to
            your portofolio for any given pathway. Potential employers,
            colleagues, and friends can verify you&apos;re learning by reveiwing
            your portfolio.
          </p>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center p-12 space-y-12 w-2/3 self-center'>
        <p className='text-2xl'>Learn More</p>
        <Image
          src={Video}
          className='w-100 h-auto'
          alt='laptop displaying the use of the Track tool'
          data-testid='splash-video'
        />
      </div>
    </section>
  );
}