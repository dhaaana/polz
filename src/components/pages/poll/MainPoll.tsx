import { RadioGroup } from '@headlessui/react';
import Marquee from 'react-fast-marquee';

import clsxm from '@/lib/clsxm';
import { InferQueryOutput } from '@/lib/trpc';

import PollSection from './PollSection';
import ResultSection from './ResultSection';

type MainPollData = InferQueryOutput<'poll.by-id'>;

export type OptionsData = Pick<MainPollData['poll'], 'options'>;

export interface IMainPoll {
  data: MainPollData;
  votedOption: string;
  setVotedOption: React.Dispatch<React.SetStateAction<string>>;
  voteHandler: () => void;
}

export default function MainPoll({
  data,
  votedOption,
  setVotedOption,
  voteHandler,
}: IMainPoll) {
  const {
    poll: { options, body, isPublic },
    isOwner,
    isVoted,
  } = data;

  return (
    <section className='pt-10'>
      <article className='flex flex-col items-center pt-10 pb-5'>
        <h1 className='font-normal'>{body}</h1>
        {isOwner || (isPublic && isVoted) ? (
          <ResultSection options={options} />
        ) : isVoted ? (
          <div>Thank you for Voting</div>
        ) : (
          <PollSection
            options={options}
            votedOption={votedOption}
            setVotedOption={setVotedOption}
          />
        )}
      </article>
      <div className='flex border-t-2 border-black bg-black'>
        <Marquee gradient={false}>
          <div
            className={clsxm(
              'bg-pattern h-full w-full overflow-hidden',
              (isOwner || isVoted) && 'bg-cpurple-300'
            )}
          >
            {isOwner ? (
              <h3 className='whitespace-nowrap p-3 font-spacemono text-7xl font-normal text-white'>
                THIS IS YOUR POLL
              </h3>
            ) : isVoted ? (
              <h3 className='whitespace-nowrap p-3 font-spacemono text-7xl font-normal text-white'>
                YOU ALREADY VOTED
              </h3>
            ) : (
              ''
            )}
          </div>
        </Marquee>
        <button
          type='button'
          className={clsxm(
            'w-[10%] border-l-2 border-black bg-white py-6 hover:bg-pink-300',
            (isOwner || isVoted) && 'hidden'
          )}
          onClick={() => voteHandler()}
        >
          Submit
        </button>
      </div>
    </section>
  );
}
