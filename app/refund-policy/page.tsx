import PolicyLayout from '../components/PolicyLayout';

export default function RefundPolicy() {
  return (
    <PolicyLayout title="Refund Policy">
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Digital Product Refund Policy</h2>
          <p className="text-gray-300">
            Due to the nature of digital products, we have a strict no-refund policy once the digital content has been accessed. However, we understand that exceptional circumstances may arise, and we will consider refund requests on a case-by-case basis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility for Refund</h2>
          <p className="text-gray-300">
            You may be eligible for a refund if:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>The digital content is defective or not as described</li>
            <li>You have not accessed or downloaded the content</li>
            <li>There was an unauthorized purchase</li>
            <li>Technical issues prevent access to the content</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">3. Refund Process</h2>
          <p className="text-gray-300">
            To request a refund:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-300">
            <li>Contact our support team at support@thepolymathspath.com within 7 days of purchase</li>
            <li>Provide your order details and reason for the refund request</li>
            <li>Our team will review your request within 3-5 business days</li>
            <li>If approved, the refund will be processed through the original payment method</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Non-Refundable Items</h2>
          <p className="text-gray-300">
            The following are not eligible for refunds:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Digital content that has been accessed or downloaded</li>
            <li>Purchases made more than 7 days ago</li>
            <li>Change of mind or personal preference</li>
            <li>Failure to meet system requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">5. Technical Support</h2>
          <p className="text-gray-300">
            Before requesting a refund, please contact our technical support team for assistance with any access or technical issues. We are committed to helping you resolve any problems you may encounter.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">6. Processing Time</h2>
          <p className="text-gray-300">
            Approved refunds will be processed within 5-10 business days. The time it takes for the refund to appear in your account depends on your payment provider.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
          <p className="text-gray-300">
            For any questions regarding our refund policy, please contact us at:
          </p>
          <p className="text-purple-400 mt-2">
            support@thepolymathspath.com
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
} 