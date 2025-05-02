'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PDFViewerProps {
  pdfUrl: string;
  onCloseAction: () => void;
  isPreview?: boolean;
  maxPreviewPages?: number;
}

export default function PDFViewer({ 
  pdfUrl, 
  onCloseAction, 
  isPreview = false, 
  maxPreviewPages = 29 
}: PDFViewerProps) {
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50">
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute top-0 left-0 right-0 p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium bg-slate-700/50 px-4 py-2 rounded-lg">
                  {isPreview ? 'Preview Mode' : 'Full Book'}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="p-2 text-white hover:text-red-400 transition-colors"
                  onClick={onCloseAction}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className="absolute inset-0 flex items-center justify-center p-4"
        style={{ marginTop: showControls ? '4rem' : '0' }}
      >
        <div className="relative w-full max-w-6xl h-[calc(100vh-8rem)] bg-slate-800 shadow-2xl rounded-lg overflow-hidden">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            className="w-full h-full"
            title="PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
} 