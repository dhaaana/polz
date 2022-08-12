import type { NextPage } from 'next';

import Navbar from '@/components/layout/Navbar';
import Helmet from '@/components/utilities/Helmet';

const Home: NextPage = () => {
  return (
    <div>
      <Helmet />
      <Navbar />
      <div className='p-10'>
        <h1 className='text-center font-bold'>
          Dhana&apos; Personal Next Js Starter
        </h1>
      </div>
    </div>
  );
};

export default Home;
