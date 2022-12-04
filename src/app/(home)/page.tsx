import { getMessages } from '$server/common/get-messages';

import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default async function HomePage() {
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
