import clsx from 'clsx';
import React from 'react';

type ICardProps<T extends React.ElementType> = {
  as?: React.ElementType;
  cardWidth?: number | string;
  cardHeight?: number | string;
  className?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<T>;

export default function Card<T extends React.ElementType = 'div'>({
  cardWidth = '100%',
  cardHeight = '100%',
  as = 'div',
  className = '',
  children,
  ...rest
}: ICardProps<T>) {
  const Tag = as;
  return (
    <div
      className='group relative'
      style={{ height: cardHeight, width: cardWidth }}
    >
      <div className='absolute h-full w-full rounded-md bg-black'></div>
      <Tag
        className={clsx(
          'absolute h-full w-full rounded-md border-2 border-black bg-white transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-y-0 active:translate-x-0',
          className
        )}
        {...rest}
      >
        {children}
      </Tag>
    </div>
  );
}
