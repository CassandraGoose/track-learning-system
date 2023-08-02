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
      </main>
    </>
  );
}
