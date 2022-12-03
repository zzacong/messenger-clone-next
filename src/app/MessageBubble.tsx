import { type Message } from '$types';
import Image from 'next/image';

type MessageBubbleProps = { message: Message };

export default function MessageBubble({ message: m }: MessageBubbleProps) {
  return (
    <div className="flex w-fit">
      <div className="flex-shrink-0">
        <Image src={m.profilePic} height={10} width={50} alt="Profile picture" />
      </div>

      <div>
        <p className="px-1 pb-1 text-xs">{m.username}</p>

        <div className="flex items-center">
          <div className="w-fit rounded-lg bg-red-300 px-3 py-2 text-white">
            <p className="">{m.message}</p>
          </div>
          <p className="px-2 text-xs italic text-gray-400">
            {new Date(m.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
