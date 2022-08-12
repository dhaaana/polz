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

import { Modal } from '../utilities/Modal';

function SignInModal(): JSX.Element {
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
      <button
        className='rounded-md bg-lime-300 px-5 py-2 hover:bg-lime-200'
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Sign In
      </button>

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
                  <span>
                    <svg
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
                        <path
                          fill='#4285F4'
                          d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
                        />
                        <path
                          fill='#34A853'
                          d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
                        />
                        <path
                          fill='#FBBC05'
                          d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
                        />
                        <path
                          fill='#EA4335'
                          d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
                        />
                      </g>
                    </svg>
                  </span>{' '}
                  Sign in with {provider.name}
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
  const { data: session, status } = useSession();
  return (
    <nav className='flex h-16 items-center justify-between px-4 shadow'>
      <div></div>
      {status === 'unauthenticated' ? (
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <SignInModal />
      ) : status === 'loading' ? (
        <p>Loading..</p>
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
    </nav>
  );
}
