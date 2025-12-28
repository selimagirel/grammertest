import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-gradient">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: December 28, 2024</p>

        <div className="card space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
            <p className="text-gray-300">
              EnglishMaster ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our English learning platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">
              2.1 Personal Information
            </h3>
            <p className="text-gray-300 mb-2">
              When you register for an account, we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Email address (required)</li>
              <li>Name (optional)</li>
              <li>Password (encrypted)</li>
              <li>Preferred language</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">2.2 Usage Information</h3>
            <p className="text-gray-300 mb-2">We automatically collect:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Exercise history and performance</li>
              <li>Trial usage data</li>
              <li>Browser type and version</li>
              <li>IP address and device information</li>
              <li>Session data and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">2.3 Payment Information</h3>
            <p className="text-gray-300">
              We use third-party payment processors (iyzico, Stripe) and do not store your
              full credit card details on our servers. We only keep transaction records and
              payment status.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-2">We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Provide and maintain our services</li>
              <li>Generate personalized exercises using AI</li>
              <li>Process your transactions and subscriptions</li>
              <li>Send you service-related emails</li>
              <li>Improve our platform and user experience</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              4. Third-Party Services and AI
            </h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Anthropic Claude AI</h3>
            <p className="text-gray-300">
              We use Anthropic's Claude AI to generate exercises. Your exercise requests
              (level, topic preferences) are sent to Anthropic's API. Anthropic's privacy
              policy applies to this data processing. We do not send personally identifiable
              information to the AI service.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Payment Processors</h3>
            <p className="text-gray-300">
              We use iyzico (for Turkey) and Stripe (international) for payment processing.
              These services have their own privacy policies and we encourage you to review
              them.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.3 Email Service</h3>
            <p className="text-gray-300">
              We use email service providers (Resend) to send transactional emails. Your
              email address is shared with this service solely for sending you important
              updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Data Storage and Security</h2>
            <p className="text-gray-300 mb-2">
              We implement appropriate security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Passwords are encrypted using bcrypt</li>
              <li>Data is transmitted over HTTPS</li>
              <li>Database access is restricted and monitored</li>
              <li>Regular security audits and updates</li>
            </ul>
            <p className="text-gray-300 mt-2">
              Your data is stored in secure data centers. However, no method of transmission
              over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. Your Rights (GDPR & KVKK)</h2>
            <p className="text-gray-300 mb-2">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-gray-300 mt-2">
              To exercise these rights, contact us at privacy@englishmaster.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Cookies</h2>
            <p className="text-gray-300">
              We use essential cookies to maintain your session and authentication. We also
              use localStorage to track trial usage for anonymous users. You can disable
              cookies in your browser, but this may affect functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. Children's Privacy</h2>
            <p className="text-gray-300">
              Our service is not directed to children under 13. We do not knowingly collect
              personal information from children under 13. If you believe we have collected
              such information, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the "Last
              updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">10. Contact Us</h2>
            <p className="text-gray-300 mb-2">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-1 text-gray-300 ml-4">
              <li>Email: privacy@englishmaster.com</li>
              <li>Website: www.englishmaster.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">11. Legal Basis for Processing</h2>
            <p className="text-gray-300 mb-2">
              Under GDPR and KVKK, we process your personal data based on:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>
                <strong>Contract:</strong> To provide services you've requested
              </li>
              <li>
                <strong>Consent:</strong> Where you've given explicit permission
              </li>
              <li>
                <strong>Legitimate Interest:</strong> To improve our services and prevent
                fraud
              </li>
              <li>
                <strong>Legal Obligation:</strong> To comply with laws and regulations
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
