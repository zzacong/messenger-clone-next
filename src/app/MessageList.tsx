'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchMessages } from '$lib/fetch-messages';
import MessageBubble from './MessageBubble';

export default function MessageList() {
  const { data: messages } = useQuery({
    queryKey: ['get-messages'],
    queryFn: fetchMessages,
  });

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
