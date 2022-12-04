'use client';

import { type Message } from '$types';

import useMessages from '$lib/hooks/useMessages';
import MessageBubble from './MessageBubble';

type MessageListProps = {
  initialMessages?: Message[];
};

export default function MessageList({ initialMessages }: MessageListProps) {
  const { data: messages } = useMessages({ initialData: initialMessages });

  return (
    <div className="mx-auto max-w-2xl space-y-5 px-5 pb-32 pt-5 xl:max-w-4xl">
      {messages?.map(m => (
        <div key={m.id}>
          <MessageBubble message={m} />
        </div>
      ))}
    </div>
  );
}
