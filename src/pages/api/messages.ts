import type { NextApiHandler } from 'next';
import { type Message, messageSchema } from '$types';

import { redis } from '$server/db/redis';

type Data = Message[];

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  // fetch from upstash redis
  const messageRaw = (await redis.hvals('messages')) as Message[];
  const messages = messageSchema
    .array()
    .parse(messageRaw.map(msg => msg).sort((a, b) => a.createdAt - b.createdAt));

  res.status(201).json(messages);
};

export default handler;
