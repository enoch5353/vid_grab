'use client';

import { useState } from 'react';
import { MdDownload } from 'react-icons/md';

interface Format {
  ext: string;
  quality?: string;
  size?: string;
  format_id?: string;
}

interface FormatSelectorProps {
  formats: Format[];
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  onDownload: () => void;
  isDownloading: boolean;
}

export function FormatSelector({
  formats,
  selectedFormat,
  onFormatChange,
  onDownload,
  isDownloading,
}: FormatSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedFormatData = formats.find(
    (f) => f.format_id === selectedFormat
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 cool:text-white">
          Select Format
        </label>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-haspopup="listbox"
            aria-expanded={showDropdown}
          >
            {selectedFormatData
              ? `${selectedFormatData.quality || 'Best'} - ${selectedFormatData.ext.toUpperCase()} ${
                  selectedFormatData.size ? `(${selectedFormatData.size})` : ''
                }`
              : 'Select a format...'}
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
              {formats.map((format, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onFormatChange(format.format_id || `${format.quality}-${format.ext}`);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-blue-100 dark:hover:bg-blue-900 transition ${
                    selectedFormat === (format.format_id || `${format.quality}-${format.ext}`)
                      ? 'bg-blue-500 text-white dark:bg-blue-600'
                      : 'text-gray-900 dark:text-white'
                  }`}
                  role="option"
                  aria-selected={selectedFormat === (format.format_id || `${format.quality}-${format.ext}`)}
                >
                  <div className="font-medium">
                    {format.quality || 'Best'} - {format.ext.toUpperCase()}
                  </div>
                  {format.size && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {format.size}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={onDownload}
        disabled={isDownloading || !selectedFormat}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-bold text-white rounded-lg transition ${
          isDownloading || !selectedFormat
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
        }`}
        aria-busy={isDownloading}
      >
        <MdDownload size={20} />
        {isDownloading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  );
}
