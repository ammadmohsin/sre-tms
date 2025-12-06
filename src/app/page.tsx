'use client';

import { useState } from 'react';
import { trpc } from '~/utils/trpc';

export default function Home() {
  const [name, setName] = useState('');

  const helloQuery = trpc.test.hello.useQuery();
  const greetQuery = trpc.test.greet.useQuery(name, {
    enabled: name.length > 0,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            tRPC Test Page
          </h1>

          <div className="flex flex-col gap-4">
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-medium mb-2">Hello Query:</h2>
              {helloQuery.isLoading ? (
                <p>Loading...</p>
              ) : helloQuery.error ? (
                <p className="text-red-500">Error: {helloQuery.error.message}</p>
              ) : (
                <p className="text-green-600">{helloQuery.data?.message}</p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-medium mb-2">Greet Query:</h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="px-3 py-2 border rounded mb-2 w-full"
              />
              {greetQuery.isLoading ? (
                <p>Loading...</p>
              ) : greetQuery.error ? (
                <p className="text-red-500">Error: {greetQuery.error.message}</p>
              ) : greetQuery.data ? (
                <p className="text-green-600">{greetQuery.data.message}</p>
              ) : (
                <p className="text-gray-500">Enter a name to see greeting</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
