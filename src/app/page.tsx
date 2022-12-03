import { redis } from '$server/db/redis';

import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default async function HomePage() {
  const member = await redis.srandmember<string>('nextjs13');

  return (
    <>
      <main className="">
        <MessageList />
        <ChatInput />
        {member}
      </main>
    </>
  );
}
