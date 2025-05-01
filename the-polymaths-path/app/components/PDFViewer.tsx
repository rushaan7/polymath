'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { motion, AnimatePresence } from 'framer-motion';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PDFViewerProps {
  pdfUrl: string;
  onCloseAction: () => void;
}

export default function PDFViewer({ pdfUrl, onCloseAction }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePrevious = () => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true);
      setDirection(-1);
      setCurrentPage(prev => prev - 2);
    }
  };

  const handleNext = () => {
    if (currentPage < (numPages || 0) - 1 && !isFlipping) {
      setIsFlipping(true);
      setDirection(1);
      setCurrentPage(prev => prev + 2);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onCloseAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, numPages, isFlipping, onCloseAction]);

  const pageVariants = {
    initial: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      transformOrigin: direction > 0 ? 'left' : 'right',
    }),
    animate: {
      rotateY: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      transformOrigin: direction > 0 ? 'right' : 'left',
      transition: {
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
      },
    }),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage <= 1 || isFlipping}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage >= (numPages || 0) - 1 || isFlipping}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            -
          </button>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            +
          </button>
        </div>
        <button
          onClick={onCloseAction}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-4xl h-[80vh] bg-white shadow-2xl rounded-lg overflow-hidden perspective-1000"
        style={{ perspective: '1000px' }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-center">Loading PDF...</div>}
          error={<div className="text-center text-red-500">Error loading PDF</div>}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 flex"
              onAnimationComplete={() => setIsFlipping(false)}
            >
              <div className="w-1/2 h-full overflow-hidden border-r border-gray-200">
                <Page
                  pageNumber={currentPage}
                  scale={scale}
                  className="!w-full !h-full"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
              <div className="w-1/2 h-full overflow-hidden">
                <Page
                  pageNumber={currentPage + 1}
                  scale={scale}
                  className="!w-full !h-full"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </Document>
      </div>
    </div>
  );
} 