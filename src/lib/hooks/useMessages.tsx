'use client';

import { type Message } from '$types';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchMessages } from '$lib/fetch-messages';

type UseMessagesProps = Pick<UseQueryOptions<Message[]>, 'initialData'>;

export default function useMessages(props: UseMessagesProps) {
  const queryInfo = useQuery({
    queryKey: ['get-messages'],
    queryFn: fetchMessages,
    ...props,
  });

  queryInfo.data;

  return queryInfo;
}
