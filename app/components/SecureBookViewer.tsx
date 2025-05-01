'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProtectedPDFViewer from './ProtectedPDFViewer';
import { config } from '../config';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact?: string;
    method?: string;
  };
  theme: {
    color: string;
    hide_topbar?: boolean;
    backdrop_color?: string;
  };
  modal?: {
    ondismiss: () => void;
    escape?: boolean;
    backdropclose?: boolean;
    handleback?: boolean;
    confirm_close?: boolean;
    animation?: boolean;
  };
  image?: string;
  notes?: Record<string, string>;
  readonly?: {
    email?: boolean;
    contact?: boolean;
  };
  callback_url?: string;
  retry?: {
    enabled: boolean;
    max_count: number;
  };
  timeout?: number;
  method?: {
    netbanking?: boolean;
    card?: boolean;
    wallet?: boolean;
    upi?: boolean;
    emi?: boolean;
  };
  config?: {
    display: {
      blocks: {
        banks?: {
          name: string;
          instruments: Array<{
            method: string;
            flows: string[];
          }>;
        };
        wallets?: {
          name: string;
          instruments: Array<{
            method: string;
            flows: string[];
          }>;
        };
        upi?: {
          name: string;
          instruments: Array<{
            method: string;
            flows: string[];
          }>;
        };
      };
      sequence: string[];
      preferences: {
        show_default_blocks: boolean;
      };
    };
  };
  onPaymentSuccess?: (response: RazorpayResponse) => void;
  onPaymentError?: (error: Error) => void;
  onPaymentClose?: () => void;
  onPaymentRetry?: () => void;
  onPaymentTimeout?: () => void;
  onPaymentCancel?: () => void;
  onPaymentMethodChange?: (method: string) => void;
  onPaymentMethodSelected?: (method: string) => void;
  onPaymentMethodDeselected?: (method: string) => void;
  onPaymentMethodError?: (error: Error) => void;
  onPaymentMethodTimeout?: () => void;
  onPaymentMethodCancel?: () => void;
  onPaymentMethodClose?: () => void;
  onPaymentMethodRetry?: () => void;
  onPaymentMethodSuccess?: (response: RazorpayResponse) => void;
  onPaymentMethodOpen?: () => void;
}

interface RazorpayInstance {
  new(options: RazorpayOptions): {
    open: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: RazorpayInstance;
  }
}

interface SecureBookViewerProps {
  price: number;
  currency: string;
}

export default function SecureBookViewer({ price, currency }: SecureBookViewerProps) {
  const [isClient, setIsClient] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded');
    };
    script.onerror = (error) => {
      console.error('Error loading Razorpay script:', error);
      setError('Failed to load payment system. Please try again later.');
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = () => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      setError('Payment system not available. Please try again later.');
      return;
    }

    if (!config.razorpay.keyId) {
      setError('Payment configuration error. Please contact support.');
      return;
    }

    const options = {
      key: config.razorpay.keyId,
      amount: price * 100, // Amount in smallest currency unit
      currency: currency,
      name: config.book.title,
      description: 'Access to Digital Edition',
      handler: function (response: RazorpayResponse) {
        console.log('Payment successful:', response);
        // Here you would typically verify the payment with your backend
        // For demo purposes, we'll just set the state
        setPaymentVerified(true);
        setShowPreview(true);
      },
      prefill: {
        name: '',
        email: '',
      },
      theme: {
        color: '#6366f1',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment modal dismissed');
        },
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Error initializing Razorpay:', err);
      setError('Failed to initialize payment. Please try again later.');
    }
  };

  if (!isClient) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {error ? (
        <div className="text-center text-red-500 mb-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-4 text-indigo-500 hover:text-indigo-400"
          >
            Try Again
          </button>
        </div>
      ) : null}
      
      {!showPreview ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            className="btn-primary"
            disabled={!!error}
          >
            Purchase Now ({currency} {price})
          </motion.button>
        </motion.div>
      ) : (
        <div className="mt-8">
          {paymentVerified ? (
            <ProtectedPDFViewer pdfUrl={config.pdfUrl} />
          ) : (
            <div className="text-center text-red-500">
              Payment verification failed. Please contact support.
            </div>
          )}
        </div>
      )}
    </div>
  );
} 