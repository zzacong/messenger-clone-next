import { type NextApiHandler } from 'next';

import { type Message } from '$types';
import { getMessages } from '$server/common/get-messages';
import { getServerAuthSession } from '$server/common/get-server-auth-session';

type Data = Message[];

const handler: NextApiHandler<Data> = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).end();

  const messages = await getMessages();
  res.status(200).json(messages);
};

export default handler;
