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
              className="rounded-lg bg-blue-500 px-8 py-3 font-bold text-white hover:bg-blue-700"
            >
              Sign in with {pr.name}
            </button>
          </div>
        ))}
    </div>
  );
}
