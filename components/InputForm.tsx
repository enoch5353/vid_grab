'use client';

import { useState } from 'react';

interface InputFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    try {
      new URL(url);
      onSubmit(url);
    } catch {
      setError('Invalid URL. Please enter a valid web address.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url-input" className="sr-only">
          Video URL
        </label>
        <input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          placeholder="Enter video URL (YouTube, TikTok, Instagram, etc.)"
          className={`w-full px-4 py-3 rounded-lg border-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 bg-white dark:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-400'
          }`}
          disabled={isLoading}
          aria-invalid={!!error}
          aria-describedby={error ? 'url-error' : undefined}
        />
        {error && (
          <p id="url-error" className="mt-2 text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !url.trim()}
        className={`w-full px-6 py-3 font-bold text-white rounded-lg transition ${
          isLoading || !url.trim()
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
        }`}
        aria-busy={isLoading}
      >
        {isLoading ? 'Fetching...' : 'Fetch Video Info'}
      </button>
    </form>
  );
}
