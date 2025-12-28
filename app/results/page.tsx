"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GradingResult, GrammarExercise } from '@/types'
import { Check, X, Download, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import { generateAndDownloadPDF } from '@/lib/pdf-generator'

export default function ResultsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [result, setResult] = useState<GradingResult | null>(null)
  const [exercise, setExercise] = useState<GrammarExercise | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    // Get result and exercise from session storage
    const savedResult = sessionStorage.getItem('grading_result')
    const savedExercise = sessionStorage.getItem('current_exercise')

    if (savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      // No result found, redirect to home
      router.push('/')
    }

    if (savedExercise) {
      setExercise(JSON.parse(savedExercise))
    }
  }, [router])

  const handleDownloadPDF = async () => {
    if (!result || !exercise) {
      toast({
        title: 'Error',
        description: 'No exercise data available to generate PDF',
        variant: 'destructive',
      })
      return
    }

    setIsGeneratingPDF(true)

    try {
      generateAndDownloadPDF('results', exercise, result)

      toast({
        title: 'Success',
        description: 'PDF downloaded successfully!',
      })
    } catch (error) {
      console.error('PDF generation error:', error)
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (!result) {
    return (
      <div className="container-custom py-12 text-center">
        <p className="text-xl">Loading results...</p>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      {/* Score Summary */}
      <div className="text-center mb-12">
        <div className="inline-block card max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 text-gradient">Test Results</h1>

          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <div className="text-5xl font-bold text-gradient mb-2">
                {result.score}
              </div>
              <div className="text-gray-400">Score</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-gradient mb-2">
                {result.grade}
              </div>
              <div className="text-gray-400">Grade</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-gradient mb-2">
                {result.percentage}%
              </div>
              <div className="text-gray-400">Percentage</div>
            </div>
          </div>

          <div className="text-xl mb-6">
            Correct Answers: {result.correctAnswers} / {result.totalQuestions}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="gap-2">
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
            </Button>
            <Link href="/levels">
              <Button variant="outline" className="gap-2">
                <Home className="w-4 h-4" />
                New Exercise
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Question-by-Question Review */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Question Review</h2>

        <div className="space-y-6">
          {result.questionResults.map((qResult, index) => (
            <div
              key={qResult.questionId}
              className={`${
                qResult.isCorrect ? 'correct-answer' : 'incorrect-answer'
              } text-gray-900`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 mt-1">
                  {qResult.isCorrect ? (
                    <div className="bg-[#28a745] text-white rounded-full p-1">
                      <Check className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="bg-[#dc3545] text-white rounded-full p-1">
                      <X className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">
                    Question {index + 1}
                  </h3>
                  <p className="mb-3">{qResult.question}</p>

                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Your Answer: </span>
                      <span
                        className={qResult.isCorrect ? 'text-green-700' : 'text-red-700'}
                      >
                        {qResult.userAnswer}
                      </span>
                    </div>
                    {!qResult.isCorrect && (
                      <div>
                        <span className="font-semibold">Correct Answer: </span>
                        <span className="text-green-700">{qResult.correctAnswer}</span>
                      </div>
                    )}
                  </div>

                  {!qResult.isCorrect && (
                    <div className="explanation-box text-gray-900 mt-3">
                      <div className="font-semibold mb-1">Explanation:</div>
                      <p>{qResult.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="text-center mt-12">
        <Link href="/levels">
          <Button size="lg" className="btn-primary">
            Try Another Exercise
          </Button>
        </Link>
      </div>
    </div>
  )
}
