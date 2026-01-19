'use client';

interface Format {
  ext: string;
  quality?: string;
  size?: string;
  format_id?: string;
}

interface MetadataDisplayProps {
  title: string;
  thumbnail: string;
  formats: Format[];
  isLoading: boolean;
}

export function MetadataDisplay({
  title,
  thumbnail,
  formats,
  isLoading,
}: MetadataDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white break-words">
          {title}
        </h2>
      </div>

      {/* Thumbnail */}
      {thumbnail && (
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt={title}
              className="w-full max-w-md h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Available Formats */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Available Formats ({formats.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {formats.map((format, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {format.quality || 'Best'} - {format.ext.toUpperCase()}
              </div>
              {format.size && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {format.size}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
