'use client';

import { type getProviders, signIn } from 'next-auth/react';

type LoginButtonsProps = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

export default function LoginButtons({ providers }: LoginButtonsProps) {
  return (
    <div className="flex justify-center">
      {providers &&
        Object.values(providers).map(pr => (
          <div key={pr.id}>
            <button
              onClick={() => signIn(pr.id, { callbackUrl: '/' })}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Sign in with {pr.name}
            </button>
          </div>
        ))}
    </div>
  );
}
