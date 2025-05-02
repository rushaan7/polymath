export const config = {
  razorpay: {
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    isConfigured: Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
  },
  book: {
    title: "The Polymath's Path",
    author: 'Rushan Khan',
    price: {
      digital: 499,
      paperback: 699,
    },
    currency: 'INR',
    paperbackUrl: 'https://notionpress.com/in/read/the-polymath-s-path/paperback',
  },
  pdfUrl: process.env.NEXT_PUBLIC_PDF_URL || '/books/9798899290961_interior.pdf',
}; 