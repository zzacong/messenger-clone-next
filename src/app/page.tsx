import { getMessages } from '$server/common/get-messages';

import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default async function HomePage() {
  const messages = await getMessages();
  // mock loading UI
  await new Promise(res => setTimeout(res, 1000));

  return (
    <>
      <main className="">
        <MessageList initialMessages={messages} />
        <ChatInput />
      </main>
    </>
  );
}
