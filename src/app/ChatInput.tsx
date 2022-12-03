'use client';

import { type Message, messageSchema } from '$types';

import { useCallback, useState } from 'react';
import cuid from 'cuid';
import { useMutation } from '@tanstack/react-query';

const sendMessageToUpstash = async (message: Message) => {
  const res = await fetch('/api/addMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  const data = await res.json();
  return messageSchema.parse(data);
};

export default function ChatInput() {
  const [input, setInput] = useState('');
  const sendMessageMut = useMutation({ mutationFn: sendMessageToUpstash });

  const onSubmit: React.FormEventHandler = useCallback(
    async e => {
      e.preventDefault();
      if (!input) return;
      const messageToSend = input;
      setInput('');

      const message: Message = {
        id: cuid(),
        message: messageToSend,
        username: 'Zac Ong',
        profilePic: 'https://avatars.dicebear.com/api/human/0418f62592cecc02.svg',
        email: 'zacong@example.com',
        createdAt: Date.now(),
      };
      const data = await sendMessageMut.mutateAsync(message);
      console.log('🚀 ~ file: ChatInput.tsx:38 ~ ChatInput ~ data', data);
    },
    [input, sendMessageMut]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-x-0 bottom-0 z-50 flex space-x-2 border-t border-gray-100 px-10 py-5"
    >
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter message here..."
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
