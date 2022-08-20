import { OptionsData } from './MainPoll';

export default function ResultSection({ options }: OptionsData) {
  const totalVotes = options.reduce((accumulator, object) => {
    return accumulator + object._count.votes;
  }, 0);

  return (
    <div className='my-3 w-full'>
      <h3 className='text-center font-normal'>Result:</h3>
      {totalVotes}
      <div className='flex h-60 justify-around'>
        {options.map(({ id, body, _count }) => {
          const barPercentage =
            (totalVotes === 0 ? 1 / 1 : _count.votes / totalVotes) * 100 + '%';
          return (
            <div key={id} className='w-20'>
              <div className='flex h-[90%] flex-col justify-end'>
                <p className='text-center'>
                  {barPercentage} ({_count.votes})
                </p>

                <div
                  style={{ height: barPercentage }}
                  className='w-full border-1.5 border-black bg-cpurple-300'
                ></div>
              </div>
              <p className='h-[10%] text-center'>{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
