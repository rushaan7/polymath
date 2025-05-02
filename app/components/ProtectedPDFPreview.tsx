'use client';

import { useState } from 'react';
import PDFViewer from './PDFViewer';

interface ProtectedPDFPreviewProps {
  pdfUrl: string;
  maxPreviewPages?: number;
}

export default function ProtectedPDFPreview({ 
  pdfUrl,
  maxPreviewPages = 29
}: ProtectedPDFPreviewProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPreviewOpen(true)}
        className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Preview Book
      </button>

      {isPreviewOpen && (
        <PDFViewer
          pdfUrl={pdfUrl}
          onCloseAction={() => setIsPreviewOpen(false)}
          isPreview={true}
          maxPreviewPages={maxPreviewPages}
        />
      )}
    </>
  );
} 