import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import prisma from '@/lib/prisma';

import { GetStaticProps } from 'next/types';

export const getStaticProps: GetStaticProps = async () => {
  //note to future self. 
  // this is the code that is causing the next build to fail in 
  // githuv actions only. 
  // process.env.blah blah matches up when logged. can confirm bc github blurs it out 
  // with asterisks. 
  // getStatic props works if you just put in a standard fetch instead. 
  // what am i doing wrong? 
  // is it possibly that the neon database branch isnt' working? i confirmed that it has tables and the expected data. 
  // have confirmed everything works fine with no errors locally.
  // let find;
  // try {
  //   find = await prisma.person.findUnique({
  //     where: {
  //       email: process.env.TEST_USER_EMAIL,
  //     },
  //   });
  // } catch(e) {
  //   console.error(e);
  // } finally {
  //   const user = JSON.stringify(find);
  //   return {
  //     props: { user },
  //     revalidate: 10,
  //   };
  // }
  console.log('first')
  const findUsers = await prisma.person.findMany()
  console.log('second')
  const thing = JSON.stringify(findUsers);
  console.log(thing);
  return {
    props: {thing},
    revalidate: 10,
  }
};

export default function Home({ }) {
  return (
    <>
    <pre>
      user: {}
    </pre>
      <Head>
        <title>Base App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>welcome!</div>
        <div className='block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
          <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50'>
            Card title
          </h5>
          <p className='mb-4 text-base text-neutral-600 dark:text-neutral-200'>
            Some quick example text to build on the card title and make up the
            bulk of the card content.
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
