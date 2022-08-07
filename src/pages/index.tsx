import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Dhana's Personal Next Js Starter</title>
        <meta name='description' content="Dhana's Personal Next Js Starter" />
      </Head>
      <div className='p-10'>
        <h1 className='text-center'>Dhana's Personal Next Js Starter</h1>
      </div>
    </div>
  );
};

export default Home;
