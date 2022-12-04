import { type NextApiHandler } from 'next';
import { type Message } from '$types';

import { getMessages } from '$server/common/get-messages';

type Data = Message[];

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  const messages = await getMessages();
  res.status(200).json(messages);
};

export default handler;
