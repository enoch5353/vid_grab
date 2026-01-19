'use client';

import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { MdClose } from 'react-icons/md';
import { useTheme } from '@/lib/theme-context';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onClose}
          />
        </Transition.Child>

        {/* Modal Content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-y-0 right-0 w-full max-w-sm shadow-xl bg-white dark:bg-gray-900">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b dark:border-gray-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Close settings"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition"
                >
                  <MdClose size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Theme Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Theme
                  </h3>
                  <div className="space-y-3">
                    {['light', 'dark', 'cool'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t as any)}
                        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                          theme === t
                            ? 'bg-blue-500 text-white dark:bg-blue-600'
                            : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                        }`}
                        aria-pressed={theme === t}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="mt-8 pt-6 border-t dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    About
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    VidGrab v1.0
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Download videos from any platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
}
