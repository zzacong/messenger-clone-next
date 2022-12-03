'use client';

export default function LogoutButton() {
  return (
    <button
      onClick={() => {
        console.log('log out');
      }}
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    >
      Sign out
    </button>
  );
}
