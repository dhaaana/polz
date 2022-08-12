import type { NextPage } from 'next';

import { trpc } from '@/lib/trpc';

import Navbar from '@/components/layout/Navbar';
import Helmet from '@/components/utilities/Helmet';

const Home: NextPage = () => {
  const hello = trpc.useQuery(['hello']);
  if (!hello.data || hello.data.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Helmet />
      <Navbar />
      <div className='p-10'>
        {hello.data.map(({ id, body }) => {
          return <p key={id}>{body}</p>;
        })}
      </div>
    </div>
  );
};

export default Home;
