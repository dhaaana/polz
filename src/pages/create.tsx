import { zodResolver } from '@hookform/resolvers/zod';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { useFieldArray, useForm } from 'react-hook-form';

import clsxm from '@/lib/clsxm';
import { trpc } from '@/lib/trpc';

import Navbar from '@/components/layout/Navbar';
import Card from '@/components/utilities/Card';
import Helmet from '@/components/utilities/Helmet';

import TrashIcon from '@/assets/svg/TrashIcon';
import { pollSchema, pollSchemaType } from '@/schema/app.schema';

type IPollFormData = Omit<pollSchemaType, 'poll.expiresAt'>;

const Home: NextPage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPollFormData>({
    defaultValues: {
      poll: {
        body: '',
      },
      options: [{ body: '' }],
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: zodResolver(pollSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const queryClient = trpc.useContext();
  const [isSubmitLoading, setIsSubmitLoading] = React.useState<boolean>(false);
  const { data, isError, error, isLoading } = trpc.useQuery(['poll.all']);
  const { mutate } = trpc.useMutation('poll.create', {
    async onSuccess(data) {
      setIsSubmitLoading(false);
      router.push(`/poll/${data.id}`);
    },
  });

  const onSubmit = handleSubmit((data) => {
    setIsSubmitLoading(true);
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const payload = {
      poll: { ...data.poll, expiresAt: new Date(date) },
      options: data.options,
    };
    mutate(payload);
  });

  return (
    <div>
      <Helmet />
      <Navbar />
      <main className='flex items-center justify-center gap-x-5 px-20'>
        <form onSubmit={onSubmit}>
          <Card
            hoverable={false}
            className='flex flex-col rounded-t-md rounded-b-none border-x-2 border-b-0 border-t-2 border-black bg-white'
          >
            <div className='border-b-2 border-black py-1'>
              <Marquee gradient={false} speed={30} className='overflow-hidden'>
                <h1 className='text-center text-5xl font-light'>CREATE POLL</h1>
              </Marquee>
            </div>
            <div className='space-y-2 px-5 py-3'>
              <label htmlFor='question' className='label'>
                Question
              </label>
              <div
                className={clsxm(
                  'rounded bg-cpurple-200',
                  errors.poll?.body && 'bg-corange-200'
                )}
              >
                <input
                  {...register('poll.body')}
                  type='text'
                  className='input'
                />
              </div>
              <p className='error-msg'>
                {errors.poll?.body && errors.poll.body?.message}
              </p>
              <label htmlFor='options' className='label'>
                Options
              </label>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className='mb-1 flex h-11 gap-x-2'>
                    <div
                      className={clsxm(
                        'h-full w-full rounded bg-cpurple-200',
                        errors.options &&
                          errors.options[index] &&
                          'bg-corange-200'
                      )}
                    >
                      <input
                        {...register(`options.${index}.body`)}
                        className='input h-full'
                      />
                    </div>
                    <Card<'button'>
                      type='button'
                      as='button'
                      className='h-11 border bg-corange-300 text-white'
                      onClick={() => remove(index)}
                    >
                      <span className='mx-2 h-3/4 w-3/4'>
                        <TrashIcon />
                      </span>
                    </Card>
                  </div>
                  <p className='error-msg'>
                    {errors.options &&
                      errors.options[index] &&
                      errors.options[index]?.body?.message}
                  </p>
                </div>
              ))}
              <Card<'button'>
                type='button'
                as='button'
                className='w-full border bg-cgreen-300 py-2 font-semibold text-white'
                onClick={() => append({ body: '' })}
              >
                Add Option
              </Card>

              <div>
                {errors.options &&
                  (!Array.isArray(errors.options) ? (
                    <p className='error-msg mb-2'>{errors.options.message}</p>
                  ) : (
                    Array.isArray(errors.options) && (
                      <p className='error-msg mb-2'>
                        {errors.options.find((item) => item).message}
                      </p>
                    )
                  ))}
              </div>
            </div>
          </Card>
          <div className='flex w-full rounded-b-md bg-black'>
            <Link href={isSubmitLoading ? '' : '/'}>
              <a
                className='w-1/2 rounded-bl-md border-t-2 border-b-2 border-r border-l-2 border-black bg-white py-5 text-center transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-pink-300 active:translate-x-0 active:translate-y-0'
                type='button'
              >
                Back
              </a>
            </Link>
            <button
              className='w-1/2 rounded-br-md border-t-2 border-b-2 border-l border-r-2 border-black bg-white py-5 transition-transform hover:-translate-x-1 hover:-translate-y-1 hover:bg-pink-300 active:translate-x-0 active:translate-y-0'
              type='submit'
              disabled={isSubmitLoading}
            >
              {isSubmitLoading ? 'Creating..' : 'Create'}
            </button>
          </div>
        </form>
        {/* <div className='flex flex-col items-center rounded-md border-2 border-black bg-white py-8'>
          <h1>Create Poll</h1>
          <form className='w-1/2 space-y-2' onSubmit={onSubmit}>
            <label htmlFor='question' className='label'>
              Question
            </label>
            <input
              {...register('poll.body')}
              type='text'
              name='question'
              id='question'
              className='input input-error'
            />
            <p className='error-msg'>
              {errors.poll?.body && errors.poll.body?.message}
            </p>
            <label htmlFor='options' className='label'>
              Options
            </label>
            <div className='space-y-2 rounded-md border border-gray-500 p-4'>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <div className='flex gap-x-2'>
                    <input
                      {...register(`options.${index}.body`)}
                      className='input'
                    />
                    <div className='w-[15%] items-stretch'>
                      <Card<'button'>
                        type='button'
                        as='button'
                        className='border bg-corange-300 text-white'
                        hoverable
                      >
                        <span className='h-3/4 w-3/4'>
                          <Trash />
                        </span>
                      </Card>
                    </div>
                  </div>
                  <p className='error-msg'>
                    {errors.options && errors.options[index]?.body?.message}
                  </p>
                </div>
              ))}
              <div className='h-12 w-full'>
                <Card<'button'>
                  type='button'
                  as='button'
                  className='border bg-cgreen-300 font-semibold text-white'
                  hoverable
                >
                  Add Option
                </Card>
              </div>
            </div>
            <div>
              {Array.isArray(errors.options)
                ? errors.options.map(({ message }, i) => (
                    <p key={i}>{message}</p>
                  ))
                : errors.options?.message}
            </div>
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
        </div> */}
      </main>
    </div>
  );
};

export default Home;
