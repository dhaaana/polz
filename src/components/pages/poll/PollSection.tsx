import { RadioGroup } from '@headlessui/react';

import clsxm from '@/lib/clsxm';

import Card from '@/components/utilities/Card';

import { IMainPoll, OptionsData } from './MainPoll';

interface IPollSection extends Omit<IMainPoll, 'data' | 'voteHandler'> {
  options: OptionsData['options'];
}

export default function PollSection({
  options,
  votedOption,
  setVotedOption,
}: IPollSection) {
  return (
    <RadioGroup value={votedOption} onChange={setVotedOption}>
      <div className='my-7 flex justify-center gap-x-5'>
        {options.map(({ id, body }) => (
          <RadioGroup.Option key={id} value={id} className='cursor-pointer'>
            {({ checked }) => (
              <Card<'button'>
                className={clsxm(
                  'w-32 bg-cpurple-50 py-6 font-semibold text-white',
                  checked && 'bg-purple-100 text-cpurple-300'
                )}
                as='button'
              >
                <div className='flex items-center'>
                  {checked && (
                    <span className='mr-2'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  )}
                  {body}
                </div>
              </Card>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
