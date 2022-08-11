import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';

import Helmet from '@/components/Helmet';

function Component() {
  const { data: session, status } = useSession();

  return (
    <div className='my-10 flex justify-center'>
      {status === 'unauthenticated' ? (
        <a
          href='/api/auth/signin'
          className='rounded-md bg-lime-300 px-5 py-2 hover:bg-lime-200'
        >
          Sign In
        </a>
      ) : status === 'loading' ? (
        <p>Loading..</p>
      ) : (
        <div className='flex flex-col items-center gap-y-2'>
          <p>Signed in as {session?.user?.email}</p>
          <button
            onClick={() => signOut()}
            className='rounded-md bg-lime-300 px-5 py-2 hover:bg-lime-200'
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

const Home: NextPage = () => {
  return (
    <div>
      <Helmet />
      <div className='p-10'>
        <h1 className='text-center font-bold'>
          Dhana&apos; Personal Next Js Starter
        </h1>
        <Component />
      </div>
    </div>
  );
};

export default Home;
