'use client';

import { useEffect, useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { InputForm } from '@/components/InputForm';
import { MetadataDisplay } from '@/components/MetadataDisplay';
import { FormatSelector } from '@/components/FormatSelector';
import { SettingsModal } from '@/components/SettingsModal';
import { ProgressBar } from '@/components/ProgressBar';
import { ErrorAlert, SuccessAlert } from '@/components/Alert';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://vidgrab-server.onrender.com';

interface Format {
  ext: string;
  quality?: string;
  size?: string;
  format_id?: string;
}

interface VideoMetadata {
  title: string;
  thumbnail: string;
  formats: Format[];
}

export default function Home() {
  // State management
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Dispatch progress events
  const dispatchProgress = (value: number) => {
    window.dispatchEvent(
      new CustomEvent('vidgrab:progress', { detail: value })
    );
  };

  const dispatchLoadStart = () => {
    window.dispatchEvent(new CustomEvent('vidgrab:loadstart'));
  };

  const dispatchLoadEnd = () => {
    window.dispatchEvent(new CustomEvent('vidgrab:loadend'));
  };

  // Fetch video metadata from backend
  const handleFetchInfo = async (url: string) => {
    setError('');
    setSuccess('');
    setMetadata(null);
    setSelectedFormat('');
    setCurrentUrl(url);
    setIsLoading(true);

    dispatchLoadStart();

    try {
      dispatchProgress(20);

      const response = await fetch(`${BACKEND_URL}/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      dispatchProgress(50);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Backend error: ${response.statusText}`);
      }

      const data: VideoMetadata = await response.json();

      dispatchProgress(80);

      if (!data.formats || data.formats.length === 0) {
        throw new Error('No formats available for this video');
      }

      setMetadata(data);
      // Auto-select first format
      setSelectedFormat(data.formats[0].format_id || `${data.formats[0].quality}-${data.formats[0].ext}`);
      setSuccess('Video info fetched successfully!');

      dispatchProgress(100);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch video info';
      setError(errorMsg);
      console.error('Error fetching info:', err);
    } finally {
      setIsLoading(false);
      dispatchLoadEnd();
    }
  };

  // Handle download
  const handleDownload = async () => {
    if (!selectedFormat || !currentUrl) {
      setError('Please select a format first');
      return;
    }

    setError('');
    setIsDownloading(true);
    dispatchLoadStart();

    try {
      dispatchProgress(10);

      const downloadUrl = `${BACKEND_URL}/download?url=${encodeURIComponent(currentUrl)}&format=${encodeURIComponent(selectedFormat)}`;

      dispatchProgress(50);

      // Trigger browser download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      link.click();

      dispatchProgress(100);
      setSuccess('Download started! Check your downloads folder.');

      // Reset after a short delay
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Download failed';
      setError(errorMsg);
      console.error('Error downloading:', err);
    } finally {
      setIsDownloading(false);
      dispatchLoadEnd();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <ProgressBar />

      {/* Header with Settings */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              VidGrab
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Download videos from anywhere
            </p>
          </div>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
            aria-label="Open settings"
          >
            <MdSettings size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 sm:py-12">
        {/* Alerts */}
        {error && (
          <div className="mb-6">
            <ErrorAlert message={error} onDismiss={() => setError('')} />
          </div>
        )}
        {success && (
          <div className="mb-6">
            <SuccessAlert message={success} onDismiss={() => setSuccess('')} />
          </div>
        )}

        {/* Input Form */}
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm mb-8">
          <InputForm onSubmit={handleFetchInfo} isLoading={isLoading} />
        </div>

        {/* Metadata Display or Empty State */}
        {metadata ? (
          <div className="space-y-8">
            {/* Metadata Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <MetadataDisplay
                title={metadata.title}
                thumbnail={metadata.thumbnail}
                formats={metadata.formats}
                isLoading={false}
              />
            </div>

            {/* Format Selector and Download */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm">
              <FormatSelector
                formats={metadata.formats}
                selectedFormat={selectedFormat}
                onFormatChange={setSelectedFormat}
                onDownload={handleDownload}
                isDownloading={isDownloading}
              />
            </div>
          </div>
        ) : !isLoading ? (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Enter a video URL above to get started
            </p>
          </div>
        ) : null}
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>VidGrab v1.0 • Download videos from any platform</p>
          <p className="mt-2">
            Powered by{' '}
            <a
              href="https://vidgrab-server.onrender.com"
              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition"
            >
              VidGrab Server
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
