import PolicyLayout from '../components/PolicyLayout';

export default function TermsOfService() {
  return (
    <PolicyLayout title="Terms of Service">
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300">
            By accessing and using The Polymath's Path website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Digital Content License</h2>
          <p className="text-gray-300">
            When you purchase digital content from The Polymath's Path:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>You receive a personal, non-exclusive, non-transferable license to access the content</li>
            <li>You may not share, distribute, or resell the content</li>
            <li>You may not modify, adapt, or create derivative works</li>
            <li>You may not use the content for commercial purposes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
          <p className="text-gray-300">
            To access certain features, you may need to create an account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and complete information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Payment Terms</h2>
          <p className="text-gray-300">
            All payments are processed through Razorpay. By making a purchase, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Provide accurate payment information</li>
            <li>Pay all fees and charges associated with your purchase</li>
            <li>Authorize us to charge your payment method for the total amount</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
          <p className="text-gray-300">
            All content on The Polymath's Path website, including but not limited to text, graphics, logos, and digital books, is the property of The Polymath's Path and is protected by intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
          <p className="text-gray-300">
            The Polymath's Path shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
          <p className="text-gray-300">
            We reserve the right to modify these terms at any time. We will notify users of any material changes through our website or email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
          <p className="text-gray-300">
            For any questions regarding these Terms of Service, please contact us at:
          </p>
          <p className="text-purple-400 mt-2">
            r.kwalker01@gmail.com
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
} 