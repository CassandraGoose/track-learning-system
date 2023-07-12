import prisma from '@/lib/prisma';

import { GetStaticProps } from 'next/types';

export const getStaticProps: GetStaticProps = async () => {
  let find;
  try {
    find = await prisma.person.findUnique({
      where: {
        email: process.env.TEST_USER_EMAIL,
      },
    });
  } catch (e) {
    console.error(e);
  } finally {
    const user = JSON.stringify(find);
    return {
      props: { user },
      revalidate: 10,
    };
  }
};

export default function Home({}) {
  return (
    <>
      <pre>user: {}</pre>

      <main>
        <div>welcome!</div>
        <div className='block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
          <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
            Card title
          </h5>
          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
            Some quick example text to build on the card title and make up the
            bulk of the card content. card card
          </p>
          <button
            type='button'
            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'
            data-te-ripple-init
            data-te-ripple-color='light'>
            Button
          </button>
        </div>
      </main>
    </>
  );
}
