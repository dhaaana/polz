import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useFieldArray, useForm } from 'react-hook-form';

import { trpc } from '@/lib/trpc';

import Navbar from '@/components/layout/Navbar';
import Card from '@/components/utilities/Card';
import Helmet from '@/components/utilities/Helmet';

import { pollSchema, pollSchemaType } from '@/server/schema';

type IPollFormData = Omit<pollSchemaType, 'poll.expiresAt'>;

const Home: NextPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPollFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(pollSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const queryClient = trpc.useContext();
  const { data, isError, error, isLoading } = trpc.useQuery(['get-all-poll']);
  const { mutate } = trpc.useMutation('create-poll', {
    async onSuccess() {
      await queryClient.invalidateQueries(['get-all-poll']);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const payload = {
      poll: { ...data.poll, expiresAt: new Date(date).toISOString() },
      options: data.options,
    };
    mutate(payload);
  });

  return (
    <div>
      <Helmet />
      <Navbar />
      <main className='h-20'>
        <Card>
          <div className='space-y-2 p-10'>
            <h1>All Polls</h1>
            <form className='space-y-2 p-3 shadow-lg' onSubmit={onSubmit}>
              <p>Question</p>
              <input
                {...register('poll.body')}
                type='text'
                className='border-2 border-black'
              />
              <p>{errors.poll?.body && errors.poll.body?.message}</p>
              <p>Options</p>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className='flex gap-x-2'>
                    <input
                      {...register(`options.${index}.body`)}
                      className='border-2 border-black'
                    />
                    <button
                      type='button'
                      className='rounded bg-red-300 p-2'
                      onClick={() => remove(index)}
                    >
                      Delete
                    </button>
                  </div>
                  <p>
                    {errors.options && errors.options[index]?.body?.message}
                  </p>
                </div>
              ))}
              <div>
                {Array.isArray(errors.options)
                  ? errors.options.map(({ message }, i) => (
                      <p key={i}>{message}</p>
                    ))
                  : errors.options?.message}
              </div>
              <button
                type='button'
                onClick={() => append({ body: '' })}
                className='rounded bg-green-300 p-2'
              >
                append
              </button>
              <button type='submit'>Submit</button>
            </form>
            <section className='flex flex-col gap-y-2'>
              {isLoading ? (
                <p>Loading..</p>
              ) : isError ? (
                <p>{error.message}</p>
              ) : data && data.length !== 0 ? (
                data.map(({ id, body }) => {
                  return (
                    <Link key={id} href={`/poll/${id}`}>
                      <a>{body}</a>
                    </Link>
                  );
                })
              ) : (
                <p>No Question Yet</p>
              )}
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Home;
