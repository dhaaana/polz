import { BuiltInProviderType } from 'next-auth/providers';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import React from 'react';

import Card from '../utilities/Card';
import { Modal } from '../utilities/Modal';

function SignInModal(): JSX.Element {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [providers, setProviders] =
    React.useState<
      Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    >();

  React.useEffect(() => {
    const getAuthProviders = async () => {
      const providers = await getProviders();
      if (providers) setProviders(providers);
    };
    setIsLoading(true);
    getAuthProviders();
    setIsLoading(false);
  }, []);
  return (
    <>
      {status === 'unauthenticated' || status === 'loading' ? (
        <Card<'button'>
          as='button'
          className='bg-cpurple-100 px-6 py-1.5 font-semibold text-white'
          disabled={status === 'loading'}
        >
          Sign In
        </Card>
      ) : (
        <div className='flex items-center gap-x-2'>
          <p>{session?.user?.email}</p>
          <button
            onClick={() => signOut()}
            className='rounded-md bg-lime-300 px-5 py-2 hover:bg-lime-200'
          >
            Sign Out
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <header className='flex items-center'>
          <Modal.Title as='h3'>Sign In</Modal.Title>
          <button
            className='ml-auto inline-flex aspect-square w-10 items-center justify-center p-0'
            onClick={() => setIsOpen(false)}
            type='button'
          >
            X
          </button>
        </header>

        <main className='mt-4'>
          {isLoading ? (
            <p>Loading..</p>
          ) : !providers ? (
            <p>Errors</p>
          ) : (
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  className='flex w-full justify-center gap-x-3 rounded border-2 border-black p-3 shadow-md'
                  onClick={() => signIn(provider.id)}
                >
                  <span></span> Sign in with {provider.name}
                </button>
              </div>
            ))
          )}
        </main>
        <footer className='mt-4 flex justify-end gap-4'></footer>
      </Modal>
    </>
  );
}

export default function Navbar() {
  return (
    <nav className='flex px-10'>
      <div className='absolute top-5 rounded-[50%] border-2 border-black bg-pink-200 py-5 px-10'>
        <h1 className='font-spacemono text-4xl'>POLZ</h1>
      </div>
      <div className='flex flex-grow justify-end py-3 px-2'>
        <SignInModal />
      </div>
    </nav>
  );
}
