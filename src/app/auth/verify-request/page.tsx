export default function VerifyRequestPage() {
  return (
    <div className="grid flex-1 place-items-center bg-gray-100">
      <main className="text-center">
        <h1 className="mb-6 text-4xl font-bold">Awaiting Confirmation</h1>
        <p className="text-lg leading-10 text-gray-500">
          We just emailed a magic link to your email
          <br />
          Click the link to log in or sign up.
        </p>
      </main>
    </div>
  );
}
