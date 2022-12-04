import Image from 'next/image';
import { getProviders } from 'next-auth/react';
import LoginButtons from '$app/LoginButtons';

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
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
