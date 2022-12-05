import { createRef } from 'react';

export const scrollToBottom = (endOfMessagesRef: React.RefObject<HTMLDivElement>) => {
  endOfMessagesRef?.current?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
};

export const endOfMessagesRef = createRef<HTMLDivElement>();
