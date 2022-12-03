import { messageSchema } from '$types';

export const fetchMessages = async () => {
  const data = await fetch('/api/messages').then(res => res.json());
  return messageSchema.array().parse(data);
};
