'use client';
import Image from 'next/image';
import Splash from '../public/temp_splash.png';
import Happiness from '../public/happiness.png';
import Community from '../public/community.png';
import Certification from '../public/certification.png';
import Splash2 from '../public/temp_splash2.png';
import Video from '../public/temp_video.png';
import { login } from '@/app/actions/actions';

export default function Page() {
  return (
    <section className="flex flex-col pb-20">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={Splash}
            className="w-10xl pr-16"
            alt="train illustration"
          />
          <div className="w-1/2">
            <h1 className="text-5xl font-bold" data-testid="splash-title">
              TRACK
            </h1>
            <p className="py-3" data-testid="splash-tag">
              Learn it. Prove it.
            </p>
            <div className="word-wrap max-w-[65%]">
              <p className="pb-6 pt-3">
                This application is currently under development and is not
                accepting new sign ups at this time. Try out Track as a sample
                user below:
              </p>
            </div>
            <form
              action={async (formData) => {
                formData.set('username', 'CassTheOG');
                login(formData)
              }}
            >
              <button className="btn btn-secondary text-bright" role="link">
                Try as Cass
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center border-b border-t border-secondary p-24 ">
        <div
          className="flex items-start justify-center"
          data-testid="splash-info1"
        >
          <div className="flex flex-1 flex-grow flex-col items-center">
            <Image
              src={Happiness}
              className="w-1/8 mb-8 h-auto"
              alt="happy person icon"
            />
            <p className="mb-4 text-center text-2xl">
              Track is a learning tool built for you, not for some corporate
              entity.
            </p>
          </div>
          <div className="mx-8 flex flex-1 flex-grow flex-col items-center">
            <Image
              src={Community}
              className="w-1/8 mb-8 h-auto"
              alt="icon of community"
            />
            <p className="mb-4 text-center text-2xl">
              Community-driven learning paths provide learning opportunities
              that can mimic college education, work training, and personal
              fulfillment.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center">
            <Image
              src={Certification}
              className="w-1/8 mb-8 h-auto"
              alt="icon of blue ribbon on a paper"
            />
            <p className="text-center text-2xl">
              Find pathways created by educators, curriculum designers,
              professionals, and hobbyists.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <Image
          src={Splash2}
          className="mb-12 h-auto w-1/4 self-center"
          alt="laptop displaying the use of the Track tool"
        />
        <div
          className="flex flex-col items-center text-center"
          data-testid="splash-info2"
        >
          <p className="mb-4 text-2xl">
            Track was designed to put you in the driver&apos;s seat of your
            learning, while also allowing you to proove your understaning and
            share your accomplishments with the world.
          </p>
          <p className="mb-4 text-2xl">
            As you complete your learning, you can add artifacts to back up your
            understanding and skills. Once you&apos;re ready, send the link to
            your portofolio for any given pathway. Potential employers,
            colleagues, and friends can verify you&apos;re learning by reveiwing
            your portfolio.
          </p>
          <p className="text-4xl">More Coming Soon!</p>
        </div>
      </div>
      <div className="flex hidden w-2/3 flex-col items-center justify-center space-y-12 self-center p-12">
        <p className="text-2xl">Learn More</p>
        <Image
          src={Video}
          className="w-100 h-auto"
          alt="laptop displaying the use of the Track tool"
          data-testid="splash-video"
        />
      </div>
    </section>
  );
}
