import { type Message, messageSchema } from '$types';
import { redis } from '$server/db/redis';

export const getMessages = async () => {
  // fetch from upstash redis
  const messageRaw = (await redis.hvals('messages')) as Message[];
  const messages = messageSchema
    .array()
    .parse(messageRaw.map(msg => msg).sort((a, b) => a.createdAt - b.createdAt));
  return messages;
};
