'use client';

import { useCallback } from 'react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div
      className="px-4 py-3 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 rounded animate-fade-in"
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-red-700 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100 transition"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

interface SuccessAlertProps {
  message: string;
  onDismiss: () => void;
}

export function SuccessAlert({ message, onDismiss }: SuccessAlertProps) {
  return (
    <div
      className="px-4 py-3 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 rounded animate-fade-in"
      role="status"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold">Success</p>
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-100 transition"
          aria-label="Dismiss success"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
