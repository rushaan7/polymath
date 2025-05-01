'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { bookConfig, Coupons } from '../config/book';
import Image from 'next/image';
import ProtectedPDFPreview from './ProtectedPDFPreview';
import PriceDisplay from './PriceDisplay';
import { usePurchaseStore } from '../lib/purchase';
import { config } from '../config';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export default function Purchase() {
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const { hasPurchased, setPurchase } = usePurchaseStore();

  useEffect(() => {
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

  const handleCouponApply = () => {
    if (!coupon) {
      setError('Please enter a coupon code');
      return;
    }

    const couponCode = coupon.toUpperCase();
    const coupons = bookConfig.coupons as Coupons;
    if (coupons[couponCode] && coupons[couponCode].valid) {
      setAppliedCoupon(couponCode);
      setDiscount(coupons[couponCode].discount);
      setError(null);
    } else {
      setError('Invalid coupon code');
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const handlePurchase = () => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      setError('Payment system not available. Please try again later.');
      return;
    }

    if (!config.razorpay.keyId) {
      setError('Payment configuration error. Please contact support.');
      return;
    }

    // If coupon gives 100% discount, skip payment
    if (discount === 100) {
      setPurchase('FREE_COUPON');
      setShowPreview(true);
      return;
    }

    const finalPrice = bookConfig.price.digital * (1 - discount / 100);
    const options = {
      key: config.razorpay.keyId,
      amount: finalPrice * 100, // Amount in smallest currency unit
      currency: bookConfig.currency,
      name: bookConfig.title,
      description: 'Access to Digital Edition',
      handler: function (response: RazorpayResponse) {
        console.log('Payment successful:', response);
        setPurchase(response.razorpay_order_id);
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

  const finalPrice = bookConfig.price.digital * (1 - discount / 100);

  return (
    <section id="purchase" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-playfair">
            Get Your Copy Today
          </h2>
          <p className="text-xl text-gray-300">
            Start your journey to becoming a modern Renaissance person
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-slate-800/50 p-8 rounded-2xl backdrop-blur-sm"
          >
            <PriceDisplay
              current={finalPrice}
              original={bookConfig.price.paperback}
              currency={bookConfig.currency}
              className="text-center md:text-left"
            />

            {discount > 0 && (
              <div className="text-green-500 text-center">
                {discount}% discount applied with coupon {appliedCoupon}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCouponApply}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Apply
              </motion.button>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
                onClick={() => setShowPreview(true)}
              >
                Preview Book
              </motion.button>

              {error && (
                <div className="text-red-500 text-center">
                  {error}
                  <button
                    onClick={() => setError(null)}
                    className="ml-2 text-indigo-500 hover:text-indigo-400"
                  >
                    Try Again
                  </button>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full"
                onClick={hasPurchased ? () => setShowPreview(true) : handlePurchase}
                disabled={!!error}
              >
                {hasPurchased ? 'Read The Polymath\'s Path' : discount === 100 ? 'Get Free Access' : 'Purchase Now'}
              </motion.button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Complete digital copy of the book</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Lifetime access to future updates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Exclusive access to bonus materials</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-purple-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">30-day money-back guarantee</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Secure Payment</h3>
              <p className="text-sm text-gray-400 mb-4">
                Your payment is processed securely through our trusted payment gateway. We never store your payment information.
              </p>
              <div className="flex items-center space-x-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <span className="text-sm text-gray-400">SSL Encrypted</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl" />
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={bookConfig.coverImage}
                alt="The Polymath's Path Book Cover"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>

        {showPreview && (
          <ProtectedPDFPreview 
            onCloseAction={() => setShowPreview(false)} 
            isPreview={!hasPurchased}
          />
        )}
      </div>
    </section>
  );
} 