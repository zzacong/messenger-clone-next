import { type Message } from '$types';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { pusherClient } from '$lib/pusher';

export default function usePusher() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = pusherClient.subscribe('messages-channel');
    const optimisticUpdates = async (newMessage: Message) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['get-messages'] });
      // Snapshot the previous value
      const previousMessages = queryClient.getQueryData<Message[]>(['get-messages']);
      // if I send the message, no need to update cache
      if (previousMessages?.find(msg => msg.id === newMessage.id)) return;
      // Optimistically update to the new value
      queryClient.setQueryData<Message[]>(['get-messages'], old =>
        old ? [...old, newMessage] : [newMessage]
      );
      queryClient.invalidateQueries({ queryKey: ['get-messages'] });
    };
    channel.bind('new-message', optimisticUpdates);

    return () => {
      // channel.unbind('new-message', optimisticUpdates);
      channel.unbind_all();
      pusherClient.unsubscribe('messages-channel');
    };
  }, [queryClient]);
}
