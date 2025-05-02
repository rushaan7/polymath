'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { motion, AnimatePresence } from 'framer-motion';

// Set up the worker using the web version
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [scale, setScale] = useState(1);
  const [direction, setDirection] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePrevious = useCallback(() => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true);
      setDirection(-1);
      setCurrentPage(prev => prev - 2);
      // Reset scroll position when changing pages
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  }, [currentPage, isFlipping]);

  const handleNext = useCallback(() => {
    const maxPage = isPreview ? maxPreviewPages : (numPages || 0);
    if (currentPage < maxPage - 1 && !isFlipping) {
      setIsFlipping(true);
      setDirection(1);
      setCurrentPage(prev => prev + 2);
      // Reset scroll position when changing pages
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  }, [currentPage, isFlipping, isPreview, maxPreviewPages, numPages]);

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
      } else if (e.key === 'h') {
        setShowControls(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, handleNext, handlePrevious, isFlipping, numPages, onCloseAction]);

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
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 hover:bg-purple-600 transition-colors flex items-center gap-2"
                  disabled={currentPage <= 1 || isFlipping}
                  onClick={handlePrevious}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <span className="text-white font-medium bg-slate-700/50 px-4 py-2 rounded-lg">
                  Page {currentPage} of {isPreview ? maxPreviewPages : numPages}
                  {isPreview && <span className="text-purple-400 ml-2">(Preview)</span>}
                </span>
                <button
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50 hover:bg-purple-600 transition-colors flex items-center gap-2"
                  disabled={currentPage >= (isPreview ? maxPreviewPages : (numPages || 0)) - 1 || isFlipping}
                  onClick={handleNext}
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1 rounded-lg">
                  <button
                    className="p-1 text-white hover:text-purple-400 transition-colors"
                    onClick={handleZoomOut}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-white font-medium min-w-[3rem] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    className="p-1 text-white hover:text-purple-400 transition-colors"
                    onClick={handleZoomIn}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

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
        <div className="relative w-full max-w-6xl h-[calc(100vh-8rem)] bg-slate-800 shadow-2xl rounded-lg overflow-hidden perspective-1000">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            }
            error={
              <div className="absolute inset-0 flex items-center justify-center text-red-500">
                Error loading PDF
              </div>
            }
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                animate="animate"
                className="absolute inset-0 flex"
                custom={direction}
                exit="exit"
                initial="initial"
                key={currentPage}
                onAnimationComplete={() => setIsFlipping(false)}
                variants={pageVariants}
              >
                <div 
                  ref={contentRef}
                  className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
                >
                  <div className="flex w-full">
                    <div className="w-1/2 p-4 border-r border-slate-700">
                      <Page
                        className="!w-full"
                        pageNumber={currentPage}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        scale={scale}
                      />
                    </div>
                    <div className="w-1/2 p-4">
                      <Page
                        className="!w-full"
                        pageNumber={currentPage + 1}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        scale={scale}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Document>
        </div>
      </div>
    </div>
  );
} 