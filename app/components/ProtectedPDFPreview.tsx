'use client';

import { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer';

interface ProtectedPDFPreviewProps {
  onCloseAction: () => void;
  isPreview?: boolean;
}

export default function ProtectedPDFPreview({ onCloseAction, isPreview = true }: ProtectedPDFPreviewProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Set the correct PDF path
    setPdfUrl('/books/9798899290961_interior.pdf');
  }, []);

  if (!pdfUrl) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50">
      <PDFViewer 
        pdfUrl={pdfUrl} 
        onCloseAction={onCloseAction} 
        isPreview={isPreview}
        maxPreviewPages={29}
      />
    </div>
  );
} 