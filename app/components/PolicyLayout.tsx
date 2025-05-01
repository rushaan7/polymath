'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PolicyLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function PolicyLayout({ children, title }: PolicyLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white font-playfair">{title}</h1>
            <Link 
              href="/"
              className="text-purple-500 hover:text-purple-400 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            {children}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center text-sm">
            <Link 
              href="/privacy-policy" 
              className={`${pathname === '/privacy-policy' ? 'text-purple-500' : 'text-gray-400 hover:text-gray-300'} transition-colors`}
            >
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/terms-of-service" 
              className={`${pathname === '/terms-of-service' ? 'text-purple-500' : 'text-gray-400 hover:text-gray-300'} transition-colors`}
            >
              Terms of Service
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              href="/refund-policy" 
              className={`${pathname === '/refund-policy' ? 'text-purple-500' : 'text-gray-400 hover:text-gray-300'} transition-colors`}
            >
              Refund Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 