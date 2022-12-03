import type { NextApiHandler } from 'next';
import type { Message } from '$types';

import { redis } from '$server/db/redis';

type Data = {
  message: Message;
};

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { message } = req.body;
  const newMessage = { ...message, createdAt: Date.now() };

  // push to upstash redis
  await redis.hset('messages', { [message.id]: JSON.stringify(newMessage) });
  res.status(201).json({ message: newMessage });
};

export default handler;
