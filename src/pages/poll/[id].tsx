import { useRouter } from 'next/router';
import React from 'react';

import { trpc } from '@/lib/trpc';

import Navbar from '@/components/layout/Navbar';
import MainPoll from '@/components/pages/poll/MainPoll';

export default function PollPage() {
  const { query } = useRouter();
  const [votedOption, setVotedOption] = React.useState<string>('');

  const queryClient = trpc.useContext();
  const { data, status, error } = trpc.useQuery([
    'poll.by-id',
    { id: query.id as string },
  ]);
  const { mutate } = trpc.useMutation('vote.add', {
    async onSuccess() {
      console.log('udah');
      await queryClient.invalidateQueries(['poll.by-id']);
    },
  });

  const voteHandler = () => {
    console.log(votedOption);
    mutate({ optionId: votedOption });
  };

  return (
    <div>
      <Navbar />
      <main className='border-y-2 border-black bg-white'>
        {status === 'loading' ? (
          <div className='py-10'>Loading...</div>
        ) : status === 'error' ? (
          <div className='py-10'>{error.message}</div>
        ) : data ? (
          <MainPoll
            data={data}
            votedOption={votedOption}
            setVotedOption={setVotedOption}
            voteHandler={voteHandler}
          />
        ) : (
          <div className='py-10'>Poll not found</div>
        )}
      </main>
    </div>
  );
}
