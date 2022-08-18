import { RadioGroup } from '@headlessui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { trpc } from '@/lib/trpc';

export default function PollPage() {
  const { query } = useRouter();
  const [votedOption, setVotedOption] = React.useState<string>('');

  const queryClient = trpc.useContext();
  const { data, status, error } = trpc.useQuery([
    'poll.by-id',
    { id: query.id as string },
  ]);
  const { mutate } = trpc.useMutation('vote-on-poll', {
    async onSuccess() {
      await queryClient.invalidateQueries(['get-poll-by-id']);
    },
  });

  const voteHandler = () => {
    mutate({ optionId: votedOption });
  };

  return (
    <div className='flex flex-col items-center py-10'>
      {status === 'loading' ? (
        'Loading'
      ) : status === 'error' ? (
        error.message
      ) : (
        <article className='flex flex-col items-center'>
          <h3>{data?.poll.body}</h3>
          {data?.isOwner || (data?.poll.isPublic && data.isVoted) ? (
            <div>You can see this shit</div>
          ) : data?.isVoted ? (
            <div>You already voted</div>
          ) : (
            <>
              <RadioGroup value={votedOption} onChange={setVotedOption}>
                <div className='my-7 flex justify-center gap-x-5'>
                  {data?.poll.options.map((option) => (
                    <RadioGroup.Option
                      key={option.id}
                      value={option.id}
                      className='cursor-pointer'
                    >
                      {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>
                          {option.body}
                        </span>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              <button type='button' onClick={() => voteHandler()}>
                Submit
              </button>
            </>
          )}
        </article>
      )}
    </div>
  );
}
