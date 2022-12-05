'use client';

import { type Message, messageSchema } from '$types';

import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import cuid from 'cuid';
import { useSession } from 'next-auth/react';
import { generateImageUrl } from '$lib/random-image-url';
import { endOfMessagesRef, scrollToBottom } from '$lib/scroll-to-bottom';

const sendMessageToUpstash = async (message: Message) => {
  const res = await fetch('/api/addMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...message }),
  });
  const data = await res.json();
  return messageSchema.parse(data);
};

export default function ChatInput() {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();

  // optimistic updates
  const sendMessageMut = useMutation({
    mutationFn: sendMessageToUpstash,
    // When mutate is called:
    onMutate: async newMessage => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['get-messages'] });
      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<Message[]>(['get-messages']);
      // Optimistically update to the new value
      queryClient.setQueryData<Message[]>(['get-messages'], old =>
        old ? [...old, newMessage] : [newMessage]
      );
      scrollToBottom(endOfMessagesRef);
      // Return a context object with the snapshotted value
      return { previousMessages };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newMessage, ctx) => {
      queryClient.setQueryData(['get-messages'], ctx?.previousMessages);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['get-messages'] });
      scrollToBottom(endOfMessagesRef);
    },
  });

  const onSubmit: React.FormEventHandler = useCallback(
    async e => {
      e.preventDefault();
      if (!input || !session?.user) return;
      const messageToSend = input;
      setInput('');

      const message: Message = {
        id: cuid(),
        message: messageToSend,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        username: session.user.name!,
        profilePic: session.user.image ?? generateImageUrl(),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        email: session.user.email!,
        createdAt: Date.now(),
      };
      sendMessageMut.mutate(message);
    },
    [input, sendMessageMut, session?.user]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-x-0 bottom-0 z-50 flex space-x-2 border-t border-gray-100 bg-white px-10 py-5"
    >
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter message here..."
        disabled={!session}
        className="flex-1 rounded border-gray-300 px-5 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!input}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
