'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl mb-8">Something went wrong!</h2>
      <p className="text-slate-400 mb-8 text-center max-w-md">
        An unexpected error occurred. Please try again later.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 