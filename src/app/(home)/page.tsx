import { getMessages } from '$server/common/get-messages';
import { getServerAuthSession } from '$server/common/get-server-auth-session';
import { redirect } from 'next/navigation';

import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) redirect('/auth/signin');

  const messages = await getMessages();
  // mock loading UI
  await new Promise(res => setTimeout(res, 2000));

  return (
    <main>
      <MessageList initialMessages={messages} />
      <ChatInput />
    </main>
  );
}
