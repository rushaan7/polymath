import PolicyLayout from '../components/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-400 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
          <p className="text-gray-300">
            At The Polymath's Path, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium text-white mb-2">2.1 Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Name and contact information</li>
            <li>Payment information (processed securely through Razorpay)</li>
            <li>Purchase history</li>
            <li>Email communications</li>
          </ul>

          <h3 className="text-xl font-medium text-white mt-4 mb-2">2.2 Usage Data</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>IP address and browser type</li>
            <li>Pages visited and time spent</li>
            <li>Device information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>To process your purchases and provide access to digital content</li>
            <li>To communicate with you about your account and purchases</li>
            <li>To improve our website and services</li>
            <li>To send marketing communications (with your consent)</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
          <p className="text-gray-300">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
          <p className="text-gray-300">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-purple-400 mt-2">
            support@thepolymathspath.com
          </p>
        </section>
      </div>
    </PolicyLayout>
  );
} 