'use client';

import { type Message } from '$types';

import useMessages from '$lib/hooks/useMessages';
import MessageBubble from './MessageBubble';
import usePusher from '$lib/hooks/usePusher';
import { endOfMessagesRef } from '$lib/scroll-to-bottom';

type MessageListProps = {
  initialMessages?: Message[];
};

export default function MessageList({ initialMessages }: MessageListProps) {
  const { data: messages } = useMessages({ initialData: initialMessages });

  usePusher();

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-5 pb-32 pt-5 xl:max-w-4xl">
      {messages?.map(m => (
        <div key={m.id}>
          <MessageBubble message={m} />
        </div>
      ))}
      <div aria-hidden="true" className="mb-2" ref={endOfMessagesRef}></div>
    </div>
  );
}
