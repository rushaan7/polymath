'use client';

import { useState } from 'react';
import PDFViewer from './PDFViewer';

interface ProtectedPDFViewerProps {
  pdfUrl: string;
}

export default function ProtectedPDFViewer({ pdfUrl }: ProtectedPDFViewerProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(true);

  if (!isViewerOpen) {
    return null;
  }

  return (
    <PDFViewer
      pdfUrl={pdfUrl}
      onCloseAction={() => setIsViewerOpen(false)}
      isPreview={false}
    />
  );
} 