'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, UploadCloudIcon, SearchIcon, ImageIcon, CheckCircle2Icon } from 'lucide-react';

interface MediaAsset {
  id: string;
  url: string;
  format: string;
  created_at: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  // This would typically come from an API in a real implementation
  // For now we'll allow entering a direct URL to simulate the upload
}

export function MediaLibraryModal({ isOpen, onClose, onSelect }: MediaLibraryModalProps) {
  const [directUrl, setDirectUrl] = useState('');
  const [assets, setAssets] = useState<MediaAsset[]>([]); // In a real app, fetch from /api/media
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (directUrl.trim()) {
      onSelect(directUrl.trim());
      setDirectUrl('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl flex flex-col h-[80vh] max-h-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold text-white">Media Library (DAM)</h2>
              <p className="text-sm text-zinc-400 mt-1">Select an asset or upload a new one.</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400 hover:text-white"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 overflow-hidden">
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
              <form onSubmit={handleUrlSubmit} className="flex gap-2 w-1/2">
                <input
                  type="text"
                  placeholder="Or enter direct URL..."
                  value={directUrl}
                  onChange={(e) => setDirectUrl(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-brand/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!directUrl.trim()}
                  className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50 flex items-center gap-2 font-medium"
                >
                  <UploadCloudIcon size={18} />
                  Add
                </button>
              </form>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 border border-white/5 rounded-lg bg-black/50 p-4">
              {assets.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                  <ImageIcon size={48} className="mb-4 opacity-50" />
                  <p>No assets found in library.</p>
                  <p className="text-sm mt-1">Enter a direct URL above to use an external image.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => onSelect(asset.url)}
                      className="group relative aspect-square bg-zinc-900 rounded-lg overflow-hidden border border-white/5 cursor-pointer hover:border-brand/50 transition-colors"
                    >
                      <img
                        src={asset.url}
                        alt="Media Asset"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <CheckCircle2Icon className="text-brand drop-shadow-md" size={32} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
