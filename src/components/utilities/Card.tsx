import React from 'react';

import clsxm from '@/lib/clsxm';

type ICardProps<T extends React.ElementType> = {
  as?: React.ElementType;
  className?: string;
  hoverable?: boolean;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

export default function Card<T extends React.ElementType = 'div'>({
  as = 'div',
  className = '',
  hoverable = true,
  children,
  ...rest
}: ICardProps<T>) {
  const Tag = as;
  return (
    <div className='h-max rounded-md bg-black'>
      <Tag
        className={clsxm(
          'flex rounded-md border-2 border-black bg-white transition-transform duration-200',
          hoverable &&
            'hover:-translate-x-1 hover:-translate-y-1 active:translate-y-0 active:translate-x-0',
          (as === 'button' || as === 'a') && 'items-center justify-center',
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    </div>
  );
}
