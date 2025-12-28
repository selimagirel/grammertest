import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-gradient">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: December 28, 2024</p>

        <div className="card space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing or using EnglishMaster ("the Service"), you agree to be bound by
              these Terms of Service ("Terms"). If you disagree with any part of these
              terms, you may not access the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">2. Description of Service</h2>
            <p className="text-gray-300">
              EnglishMaster is an AI-powered English learning platform that provides
              personalized grammar tests, vocabulary exercises, and reading materials for
              CEFR levels A1-B2. The Service uses artificial intelligence to generate
              customized learning content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">3. User Accounts</h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">3.1 Account Creation</h3>
            <p className="text-gray-300 mb-2">To use certain features, you must:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Be at least 13 years of age</li>
              <li>Maintain the security of your password</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">3.2 Account Termination</h3>
            <p className="text-gray-300">
              We reserve the right to suspend or terminate your account if you violate these
              Terms or engage in fraudulent, abusive, or illegal activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">4. Free Trial and Subscriptions</h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.1 Free Trial</h3>
            <p className="text-gray-300">
              New users receive 3 free grammar tests and 3 free vocabulary exercises. Trial
              limits are tracked per user/device and cannot be reset or transferred.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.2 Paid Subscriptions</h3>
            <p className="text-gray-300 mb-2">
              We offer monthly ($10/month) and yearly ($80/year) subscription plans that
              provide:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Unlimited exercise generation</li>
              <li>All CEFR levels and exercise types</li>
              <li>PDF downloads</li>
              <li>Exercise history</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.3 Billing and Renewal</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>
                Subscriptions automatically renew unless cancelled 24 hours before the
                renewal date
              </li>
              <li>Prices are subject to change with 30 days notice</li>
              <li>No refunds for partial subscription periods</li>
              <li>Payment is processed through iyzico or Stripe</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2">4.4 Cancellation</h3>
            <p className="text-gray-300">
              You may cancel your subscription at any time. Cancellation takes effect at the
              end of your current billing period. You will retain access until that date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">5. Refund Policy</h2>
            <p className="text-gray-300 mb-2">
              We offer a 7-day money-back guarantee for first-time subscribers:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Request a refund within 7 days of your first subscription</li>
              <li>Contact us at support@englishmaster.com</li>
              <li>Refunds are processed within 5-10 business days</li>
              <li>This guarantee applies once per user</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">6. User Conduct</h2>
            <p className="text-gray-300 mb-2">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to bypass trial limitations or payment systems</li>
              <li>Share your account credentials with others</li>
              <li>Scrape, copy, or redistribute our AI-generated content</li>
              <li>
                Reverse engineer, decompile, or disassemble any part of the Service
              </li>
              <li>Use automated tools to access the Service</li>
              <li>Interfere with the Service's operation or security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">7. Intellectual Property</h2>

            <h3 className="text-xl font-semibold mt-4 mb-2">7.1 Our Content</h3>
            <p className="text-gray-300">
              All content, features, and functionality (including but not limited to text,
              graphics, logos, and software) are owned by EnglishMaster and protected by
              copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">
              7.2 AI-Generated Content
            </h3>
            <p className="text-gray-300">
              Exercises generated for you may be downloaded and used for personal learning
              purposes only. Commercial redistribution is prohibited without written
              permission.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">7.3 User Data</h3>
            <p className="text-gray-300">
              You retain ownership of any data you provide. By using the Service, you grant
              us a license to use this data to provide and improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">8. AI-Generated Content Disclaimer</h2>
            <p className="text-gray-300">
              Our Service uses AI (Claude by Anthropic) to generate educational content. While
              we strive for accuracy:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
              <li>AI-generated content may occasionally contain errors</li>
              <li>Content should be used as a learning tool, not as definitive reference</li>
              <li>We do not guarantee 100% accuracy of all exercises</li>
              <li>Users should verify critical information with authoritative sources</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-300">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ENGLISHMASTER SHALL NOT BE LIABLE FOR
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY
              LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY
              LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">10. Disclaimer of Warranties</h2>
            <p className="text-gray-300">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY
              KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">11. Indemnification</h2>
            <p className="text-gray-300">
              You agree to indemnify and hold EnglishMaster harmless from any claims,
              damages, losses, liabilities, and expenses arising from your use of the
              Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">12. Changes to Terms</h2>
            <p className="text-gray-300">
              We reserve the right to modify these Terms at any time. We will notify users
              of material changes via email or through the Service. Continued use after
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">13. Governing Law</h2>
            <p className="text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of
              Turkey, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">14. Contact Information</h2>
            <p className="text-gray-300 mb-2">
              For questions about these Terms, contact us:
            </p>
            <ul className="space-y-1 text-gray-300 ml-4">
              <li>Email: support@englishmaster.com</li>
              <li>Website: www.englishmaster.com</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">15. Severability</h2>
            <p className="text-gray-300">
              If any provision of these Terms is found to be unenforceable or invalid, that
              provision will be limited or eliminated to the minimum extent necessary so
              that these Terms will otherwise remain in full force and effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
