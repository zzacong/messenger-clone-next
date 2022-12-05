'use client';

import { type getProviders, signIn } from 'next-auth/react';

type LoginButtonsProps = {
  providers: Awaited<ReturnType<typeof getProviders>>;
  csrfToken?: string;
};

export default function LoginButtons({ providers, csrfToken }: LoginButtonsProps) {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-6">
      {providers &&
        Object.values(providers).map(pr =>
          pr.id === 'email' ? (
            <form
              key={pr.id}
              method="post"
              action="/api/auth/signin/email"
              className="w-full space-y-2"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="block w-full rounded border border-gray-500 px-4 py-2 hover:border-gray-700"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-700 px-8 py-3 font-bold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                Sign in with {pr.name}
              </button>
            </form>
          ) : (
            <div key={pr.id} className="w-full">
              <button
                onClick={() => signIn(pr.id, { callbackUrl: '/' })}
                className="w-full rounded-lg bg-blue-500 px-8 py-3 font-bold text-white hover:bg-blue-600"
              >
                Sign in with {pr.name}
              </button>
            </div>
          )
        )}
    </div>
  );
}
