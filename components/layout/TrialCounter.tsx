"use client"

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function TrialCounter() {
  const [trialStatus, setTrialStatus] = useState({
    grammarRemaining: 3,
    vocabularyRemaining: 3,
    hasActiveSubscription: false,
    isLoading: true,
  })

  useEffect(() => {
    // Fetch trial status from API
    const fetchTrialStatus = async () => {
      try {
        const response = await fetch('/api/trial/status')
        if (response.ok) {
          const data = await response.json()
          setTrialStatus({
            ...data,
            isLoading: false,
          })
        } else {
          // Default to local storage for anonymous users
          const grammar = parseInt(localStorage.getItem('trial_grammar') || '3')
          const vocabulary = parseInt(localStorage.getItem('trial_vocabulary') || '3')
          setTrialStatus({
            grammarRemaining: grammar,
            vocabularyRemaining: vocabulary,
            hasActiveSubscription: false,
            isLoading: false,
          })
        }
      } catch (error) {
        // Fallback to localStorage
        const grammar = parseInt(localStorage.getItem('trial_grammar') || '3')
        const vocabulary = parseInt(localStorage.getItem('trial_vocabulary') || '3')
        setTrialStatus({
          grammarRemaining: grammar,
          vocabularyRemaining: vocabulary,
          hasActiveSubscription: false,
          isLoading: false,
        })
      }
    }

    fetchTrialStatus()
  }, [])

  if (trialStatus.isLoading) {
    return null
  }

  if (trialStatus.hasActiveSubscription) {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/20 border border-green-500/50 text-green-400">
        <Sparkles className="w-5 h-5" />
        <span className="font-semibold">Premium Member - Unlimited Access</span>
      </div>
    )
  }

  const totalRemaining = trialStatus.grammarRemaining + trialStatus.vocabularyRemaining

  if (totalRemaining === 0) {
    return (
      <div className="inline-flex flex-col items-center gap-2">
        <div className="px-6 py-3 rounded-full gradient-pink text-white font-semibold">
          Free Trial Exhausted
        </div>
        <Link
          href="/subscribe"
          className="text-sm text-purple-400 hover:text-purple-300 underline"
        >
          Subscribe for Unlimited Access →
        </Link>
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="px-6 py-3 rounded-full gradient-pink text-white font-semibold">
        Free Trial: {trialStatus.grammarRemaining} Grammar + {trialStatus.vocabularyRemaining} Vocabulary Remaining
      </div>
      {totalRemaining <= 2 && (
        <Link
          href="/subscribe"
          className="text-sm text-purple-400 hover:text-purple-300 underline animate-pulse"
        >
          Subscribe now for unlimited access →
        </Link>
      )}
    </div>
  )
}
