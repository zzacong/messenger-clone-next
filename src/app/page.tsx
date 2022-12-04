import { getMessages } from '$server/common/get-messages';

import ChatInput from './ChatInput';
import MessageList from './MessageList';

export default async function HomePage() {
  const messages = await getMessages();

  return (
    <>
      <main className="">
        <MessageList initialMessages={messages} />
        <ChatInput />
      </main>
    </>
  );
}
