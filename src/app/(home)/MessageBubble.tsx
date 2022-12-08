'use client';

import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import Image from 'next/image';
import TimeAgo from 'react-timeago';

import { type Message } from '$types';

type MessageBubbleProps = { message: Message };

export default function MessageBubble({ message: m }: MessageBubbleProps) {
  const { data: session } = useSession();
  const isMe = session?.user?.email === m.email;

  return (
    <div className={clsx('flex w-fit gap-2', isMe && 'ml-auto')}>
      <div className={clsx('grid flex-shrink-0 place-items-center', isMe && 'order-2')}>
        <Image
          src={m.profilePic}
          height={10}
          width={50}
          alt="Profile picture"
          className="rounded-full"
        />
      </div>

      <div>
        <p
          className={clsx(
            'px-1 pb-1 text-xs',
            isMe ? 'text-right text-blue-400' : 'text-left text-red-400'
          )}
        >
          {m.username}
        </p>

        <div className="flex items-center">
          <div
            className={clsx(
              'w-fit rounded-lg px-3 py-2 text-white',
              isMe ? 'order-2 bg-blue-400' : 'bg-red-400'
            )}
          >
            <p className="">{m.message}</p>
          </div>

          <p className={clsx('px-2 text-xs italic text-gray-400', isMe && 'text-right')}>
            <TimeAgo date={new Date(m.createdAt)} />
          </p>
        </div>
      </div>
    </div>
  );
}
