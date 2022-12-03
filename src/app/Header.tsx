import Image from 'next/image';
import Link from 'next/link';

import LogoutButton from './LogoutButton';

const session = true;

export default function Header() {
  if (session) {
    return (
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            className="mx-2 rounded-full object-contain"
            height={10}
            width={50}
            src="https://avatars.dicebear.com/api/human/042fba3e3d184206.svg"
            alt="Profile picture"
          />

          <div>
            <p>
              <span className="block text-blue-400">Logged in as:</span>
              <span className="block text-lg font-bold">Zac Ong</span>
            </p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center bg-white p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Messenger logo" height={10} width={50} />
          <h1 className="font-mono text-blue-400">Messenger Clone</h1>
        </div>

        <Link
          href="/auth/signin"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
