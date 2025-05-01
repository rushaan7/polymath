'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ProtectedPDFViewerProps {
  pdfUrl: string;
}

export default function ProtectedPDFViewer({ pdfUrl }: ProtectedPDFViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Prevent right-click and other interactions
    const preventInteraction = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const events = [
      'contextmenu',
      'selectstart',
      'dragstart',
      'copy',
      'cut',
      'paste',
      'keydown',
      'keyup',
      'keypress',
    ];

    events.forEach(event => {
      iframe.addEventListener(event, preventInteraction);
    });

    // Add protection layer
    const protectionLayer = document.createElement('div');
    protectionLayer.style.position = 'absolute';
    protectionLayer.style.top = '0';
    protectionLayer.style.left = '0';
    protectionLayer.style.width = '100%';
    protectionLayer.style.height = '100%';
    protectionLayer.style.zIndex = '1000';
    protectionLayer.style.userSelect = 'none';
    protectionLayer.style.pointerEvents = 'none';
    
    iframe.parentElement?.appendChild(protectionLayer);

    // Handle iframe load events
    iframe.onload = () => {
      setIsLoading(false);
      setIsLoaded(true);
    };

    iframe.onerror = () => {
      setError('Failed to load PDF. Please try again later.');
      setIsLoading(false);
    };

    // Check if PDF exists
    fetch(pdfUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('PDF not found');
        }
      })
      .catch(() => {
        setError('PDF file not found. Please contact support.');
        setIsLoading(false);
      });

    return () => {
      events.forEach(event => {
        iframe.removeEventListener(event, preventInteraction);
      });
      protectionLayer.remove();
    };
  }, [pdfUrl]);

  if (error) {
    return (
      <div className="w-full h-[800px] bg-slate-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[800px] bg-slate-800 rounded-lg overflow-hidden prevent-select"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        className="w-full h-full"
        style={{
          pointerEvents: 'none',
          border: 'none',
          opacity: isLoading ? 0 : 1,
        }}
        sandbox="allow-scripts allow-same-origin"
        title="Protected PDF Viewer"
        loading="eager"
      />
      {!isLoading && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <div className="animate-pulse text-gray-400">Loading PDF...</div>
        </div>
      )}
      <div className="absolute inset-0 bg-transparent" />
    </motion.div>
  );
} 