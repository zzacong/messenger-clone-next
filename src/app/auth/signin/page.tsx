import { type NextApiRequest } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getCsrfToken, getProviders } from 'next-auth/react';

import { getServerAuthSession } from '$server/common/get-server-auth-session';

import LoginButtons from './LoginButtons';

export default async function SignInPage() {
  const session = await getServerAuthSession();
  if (session) redirect('/');

  const providers = await getProviders();

  const cookie = cookies()
    .getAll()
    .reduce((acc, c) => `${acc}; ${c.name}=${c.value}`, '');

  const csrfToken = await getCsrfToken({ req: { headers: { cookie } } as NextApiRequest });
  console.log('🚀 ~ file: page.tsx:22 ~ SignInPage ~ csrfToken', csrfToken);

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="mb-8">
        <Image
          src="/logo.svg"
          alt="Messenger logo"
          width={200}
          height={200}
          className="mx-2 rounded-full object-cover"
        />
      </div>

      <LoginButtons providers={providers} csrfToken={csrfToken} />
    </div>
  );
}
