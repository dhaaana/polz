import Image from 'next/image';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';

export default function LandingPageHero() {
  return (
    <section>
      <div className='flex h-[30rem] border-t-2 border-b-2 border-black bg-white px-24'>
        <div className='flex w-3/5 flex-col justify-center gap-y-8'>
          <h1 className='text-7xl'>
            Create poll in <br /> no time
          </h1>
          <h2 className='text-xl font-normal'>
            Want to ask your friends where to go friday night or arrange a
            meeting with co-workers? Create a poll - and get answer in an
            instant.
          </h2>
          <div className='group relative h-12'>
            <div className='absolute inset-x-0 bottom-0 translate-y-3 rounded-md border-2 border-black bg-cgreen-700 py-4 group-hover:bg-cgreen-600'></div>
            <Link href='/create'>
              <a className='absolute inset-x-0 flex h-full items-center justify-center rounded-md border-2 border-black bg-cgreen-400 text-lg font-semibold text-white transition-transform duration-300 hover:bg-cgreen-300 active:translate-y-3'>
                Create Poll
              </a>
            </Link>
          </div>
        </div>
        <figure className='flex w-2/5 justify-center overflow-clip'>
          <Image
            src='/images/larry-1.svg'
            alt='polz-header'
            width={410}
            height='100%'
            objectFit='cover'
            objectPosition='top'
            className='border-2'
          />
        </figure>
      </div>
      <div className='border-b-2 border-black bg-cpurple-500 text-white'>
        <Marquee gradient={false} className='overflow-hidden'>
          <h3 className='whitespace-nowrap py-3 font-spacemono text-7xl font-normal'>
            TRUSTED BY OVER 500,000 USERS WORLDWIDE
          </h3>
        </Marquee>
      </div>
    </section>
  );
}
