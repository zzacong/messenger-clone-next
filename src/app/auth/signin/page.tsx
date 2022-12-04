import Image from 'next/image';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { getServerAuthSession } from '$server/common/get-server-auth-session';
import LoginButtons from './LoginButtons';

export default async function SignInPage() {
  const session = await getServerAuthSession();
  if (session) redirect('/');

  const providers = await getProviders();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6">
      <div>
        <Image
          src="/logo.svg"
          alt="Messenger logo"
          width={200}
          height={200}
          className="mx-2 rounded-full object-cover"
        />
      </div>

      <LoginButtons providers={providers} />
    </div>
  );
}
