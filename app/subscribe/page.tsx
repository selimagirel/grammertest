"use client"

import { useState } from 'react'
import { Check, Sparkles, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    price: '$10',
    period: '/month',
    description: 'Perfect for trying out the platform',
    features: [
      'Unlimited Grammar Tests',
      'Unlimited Vocabulary Exercises',
      'Unlimited Reading Paragraphs',
      'All CEFR Levels (A1-B2)',
      'Instant Grading & Feedback',
      'PDF Downloads',
      'Exercise History',
      'Cancel Anytime',
    ],
    highlighted: false,
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    price: '$80',
    period: '/year',
    savings: 'Save $40 (33% off)',
    description: 'Best value for serious learners',
    features: [
      'Everything in Monthly Plan',
      'Save $40 per year',
      'Priority Support',
      'Early Access to New Features',
      'Exclusive Study Materials',
      'Progress Reports',
      'Achievement Badges',
      'Cancel Anytime',
    ],
    highlighted: true,
  },
]

export default function SubscribePage() {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true)

    // TODO: Implement actual payment integration
    setTimeout(() => {
      toast({
        title: 'Coming Soon',
        description: 'Payment integration is being set up. Please check back later!',
      })
      setIsProcessing(false)
    }, 1000)
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gradient">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Get unlimited access to AI-powered English exercises at all levels. Cancel
          anytime, no questions asked.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`card ${
              plan.highlighted ? 'border-2 border-purple-500 relative' : ''
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="gradient-pink text-white text-sm font-bold py-1 px-6 rounded-full">
                  BEST VALUE
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              {plan.savings && (
                <div className="text-green-400 text-sm font-semibold mb-2">
                  {plan.savings}
                </div>
              )}
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.period}</span>
              </div>
              <p className="text-gray-400">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSubscribe(plan.id)}
              disabled={isProcessing}
              className={`w-full ${
                plan.highlighted ? 'btn-primary' : ''
              }`}
              size="lg"
              variant={plan.highlighted ? 'default' : 'outline'}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {isProcessing ? 'Processing...' : `Subscribe ${plan.name}`}
            </Button>
          </div>
        ))}
      </div>

      {/* Free Trial Info */}
      <div className="card max-w-3xl mx-auto mb-12">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="gradient-pink p-3 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Try Before You Subscribe</h3>
            <p className="text-gray-400 mb-4">
              Every new user gets 3 free grammar tests and 3 free vocabulary exercises.
              No credit card required!
            </p>
            <Link href="/levels">
              <Button variant="outline">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-400">
              Yes! You can cancel your subscription at any time. You'll continue to have
              access until the end of your current billing period.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-gray-400">
              We accept all major credit cards through iyzico (for Turkey) and Stripe
              (international). Your payment information is securely processed and never
              stored on our servers.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-gray-400">
              We offer a 7-day money-back guarantee. If you're not satisfied within the
              first 7 days, contact us for a full refund.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">
              Can I switch between plans?
            </h3>
            <p className="text-gray-400">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be
              reflected in your next billing cycle.
            </p>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-2">
              Is there a student discount?
            </h3>
            <p className="text-gray-400">
              Student discounts are coming soon! Contact us with your student ID for
              early access to our student pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
