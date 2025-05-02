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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-xl">
        <button
          onClick={onCloseAction}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <iframe
          src={`${pdfUrl}#page=1${isPreview ? `&page=${maxPreviewPages}` : ''}`}
          className="w-full h-full rounded-lg"
          title="PDF Viewer"
        />
      </div>
    </div>
  );
} 